'use client';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { toast } from 'react-hot-toast';

export default function EventForm() {
  const { user } = useAuth();
  const socket = useSocket();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'General',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Creating event...');
    
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, creator: user._id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      const newEvent = await res.json();
      
      // Notify all clients via socket
      socket.emit('event-created', newEvent);
      
      // Clear form and show success
      setFormData({ 
        title: '', 
        description: '', 
        date: '', 
        location: '', 
        category: 'General', 
        image: '' 
      });
      
      toast.success('Event created successfully!');
    } catch (error) {
      console.error('Event creation failed:', error);
      toast.error(error.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
        
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="General">General</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
        </select>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </div>
    </form>
  );
}