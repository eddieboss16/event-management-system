import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Star, ChevronRight, Menu, X, Bell, User } from 'lucide-react';

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // null for not logged in, object for logged in user

  // Sample data - in real app this would come from API
  const featuredEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-09-15",
      time: "09:00 AM",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      price: "$299",
      attendees: 1250,
      rating: 4.8,
      category: "Technology"
    },
    {
      id: 2,
      title: "Music Festival Summer",
      date: "2024-08-20",
      time: "06:00 PM",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      price: "$89",
      attendees: 5000,
      rating: 4.9,
      category: "Music"
    },
    {
      id: 3,
      title: "Business Workshop",
      date: "2024-09-05",
      time: "10:00 AM",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop",
      price: "$149",
      attendees: 300,
      rating: 4.7,
      category: "Business"
    },
    {
      id: 4,
      title: "Food & Wine Expo",
      date: "2024-09-28",
      time: "12:00 PM",
      location: "Napa Valley, CA",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
      price: "$75",
      attendees: 800,
      rating: 4.6,
      category: "Food"
    }
  ];

  const eventCategories = [
    { name: "Conferences", icon: "🎯", count: 245 },
    { name: "Workshops", icon: "🛠️", count: 189 },
    { name: "Music", icon: "🎵", count: 156 },
    { name: "Sports", icon: "⚽", count: 203 },
    { name: "Food & Drink", icon: "🍽️", count: 134 },
    { name: "Arts", icon: "🎨", count: 98 },
    { name: "Business", icon: "💼", count: 167 },
    { name: "Health", icon: "🏥", count: 112 }
  ];

  const stats = [
    { number: "10K+", label: "Events Created" },
    { number: "500K+", label: "Tickets Sold" },
    { number: "50K+", label: "Happy Organizers" },
    { number: "1M+", label: "Event Attendees" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">EventHub</div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Browse Events</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Create Event</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
            </div>

            {/* User Menu or Login */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Bell size={20} />
                  </button>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-gray-700">John Doe</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button className="text-gray-700 hover:text-blue-600 font-medium">Log In</button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Browse Events</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Create Event</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">How It Works</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Pricing</a>
              <div className="border-t pt-2 mt-2">
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Log In</a>
                <a href="#" className="block px-3 py-2 text-blue-600 font-medium">Sign Up</a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find and create unforgettable experiences in your city
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 text-gray-700 rounded focus:outline-none"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Location..."
                  className="w-full pl-10 pr-4 py-2 text-gray-700 rounded focus:outline-none"
                />
              </div>
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 text-gray-700 rounded focus:outline-none"
                />
              </div>
              <button className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {eventCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.count} events</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
            <button className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{event.category}</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{event.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      {event.date} • {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={14} className="mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{event.price}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Event?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of organizers who trust EventHub for their events
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Event
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">EventHub</div>
              <p className="text-gray-300">
                The world's leading event management platform for creating unforgettable experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Organizers</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-blue-400">Create Event</a></li>
                <li><a href="#" className="hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Attendees</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-blue-400">Browse Events</a></li>
                <li><a href="#" className="hover:text-blue-400">My Tickets</a></li>
                <li><a href="#" className="hover:text-blue-400">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;