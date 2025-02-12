'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    fetchEvents();
    
    if (socket) {
      socket.on('event-created', (newEvent) => {
        setEvents(prev => [...prev, newEvent]);
      });
      
      socket.on('attendee-updated', (updatedEvent) => {
        setEvents(prev => prev.map(event => event._id === updatedEvent._id ? updatedEvent : event));
      });
    }

    return () => {
      if (socket) {
        socket.off('event-created');
        socket.off('attendee-updated');
      }
    };
  }, [socket]);

  useEffect(() => {
    filterEvents();
  }, [selectedCategory, selectedDate, events]);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setEvents(data);
      setCategories([...new Set(data.map(event => event.category))]);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    if (selectedDate) {
      filtered = filtered.filter(event => new Date(event.date).toISOString().split('T')[0] === selectedDate);
    }
    setFilteredEvents(filtered);
  };

  const handleJoinEvent = async (eventId) => {
    if (!user) return;

    try {
      const res = await fetch(`/api/events/${eventId}/attend`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      });

      if (res.ok) {
        const updatedEvent = await res.json();
        socket.emit('attendee-updated', updatedEvent);
      }
    } catch (error) {
      console.error('Failed to join event:', error);
    }
  };

  const handleShowAttendees = (attendeesList) => {
    setAttendees(attendeesList);
    setShowPopup(true);
  };
  console.log("Attendees state:", attendees);

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">📍 {event.location}</p>
            <p className="text-sm text-gray-500">Category: {event.category}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-600 cursor-pointer" onClick={() => handleShowAttendees(event.attendees)}>Attendees: {event.attendees?.length || 0}</span>
              <button
                onClick={() => handleJoinEvent(event._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Attendees Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Attendees</h2>
            <ul>
  {attendees?.filter(attendee => attendee && attendee.name).map((attendee, index) => (
    <li key={index} className="border-b py-2">{attendee.name}</li>
  ))}
</ul>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
