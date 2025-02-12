import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import connectDB from '../../../lib/db';

export async function POST(req) {
  const { name, email, password, action } = await req.json();
  await connectDB();

  try {
    // Registration logic
    if (action === 'register') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'User exists' }, { status: 400 });
      }
      const user = new User({ name, email, password });
      await user.save();
    }

    // Login logic
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Set HTTP-only cookie
    const response = NextResponse.json({ user: { id: user._id, name: user.name, email: user.email } });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}