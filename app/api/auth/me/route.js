import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User';
import connectDB from '../../../../lib/db';

export async function GET(req) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}