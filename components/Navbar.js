'use client';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Event Platform
        </Link>
        
        <div className="flex gap-4">
          {/* Show Dashboard and Events links only if user is logged in */}
          {user && (
            <>
              <Link
                href="/dashboard"
                className="text-white hover:text-gray-300"
              >
                Create Event
              </Link>
              <Link
                href="/dashboard/events"
                className="text-white hover:text-gray-300"
              >
                Events
              </Link>
            </>
          )}

          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="text-white hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}