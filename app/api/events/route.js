import { NextResponse } from 'next/server';
import Event from '../../../models/Event';
import connectDB from '../../../lib/db';

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().populate('creator');
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    await connectDB();
    
    const event = new Event(data);
    await event.save();

    // Broadcast via WebSocket
    if (global.io) {
      global.io.emit('event-created', event);
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 400 }
    );
  }
}