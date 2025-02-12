'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <Image
          src="/images/image1.jpg" // Replace with your image
          alt="Event Background"
          fill
          className="object-cover opacity-50"
          priority
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Ultimate Event Management Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Create, manage, and attend events seamlessly. Join thousands of users in organizing unforgettable experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/calendericon.png" // Replace with your icon
                  alt="Calendar Icon"
                  width={80}
                  height={80}
                  className="opacity-90"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Easy Event Creation</h3>
              <p className="text-gray-300">
                Create and manage events effortlessly with our intuitive tools.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/networkicon.png" // Replace with your icon
                  alt="Network Icon"
                  width={80}
                  height={80}
                  className="opacity-90"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Real-Time Updates</h3>
              <p className="text-gray-300">
                Stay updated with real-time notifications and attendee lists.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/communityicon.png" // Replace with your icon
                  alt="Community Icon"
                  width={80}
                  height={80}
                  className="opacity-90"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Join a Thriving Community</h3>
              <p className="text-gray-300">
                Connect with like-minded individuals and grow your network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-20 bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/image.png" // Replace with your image
            alt="CTA Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Your Next Event?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of users and start organizing unforgettable experiences today.
          </p>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}