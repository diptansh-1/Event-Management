import { NextResponse } from 'next/server';
import Event from '../../../../../models/Event';
import connectDB from '../../../../../lib/db';

export async function PUT(req, context) {
  try {
    // Properly await the context params
    const { id } = await context.params;
    
    const { userId } = await req.json();
    await connectDB();

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    // Broadcast update via WebSocket
    if (global.io) {
      global.io.emit('attendee-updated', event);
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error updating attendees:', error);
    return NextResponse.json(
      { error: 'Failed to update attendees' },
      { status: 500 }
    );
  }
}