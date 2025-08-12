import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Star, Clock, Share2, Heart, 
  ChevronLeft, ChevronRight, User, Shield, Wifi, Coffee, 
  Car, Camera, Music, Utensils, ArrowLeft, CheckCircle,
  Tag, Globe, Phone, Mail, Facebook, Twitter, Instagram
} from 'lucide-react';

const EventDetailPage = () => {
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Sample event data - would come from API/props in real app
  const event = {
    id: 1,
    title: "Tech Conference 2024: The Future of AI",
    subtitle: "Join industry leaders in exploring cutting-edge AI technologies",
    date: "2024-09-15",
    endDate: "2024-09-17",
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    location: "Moscone Center, San Francisco, CA",
    address: "747 Howard St, San Francisco, CA 94103",
    category: "Technology",
    rating: 4.8,
    reviewCount: 342,
    attendees: 1250,
    maxCapacity: 2000,
    organizer: {
      name: "TechEvents Global",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      events: 45,
      followers: 15200
    },
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop"
    ],
    description: `Join us for the most anticipated technology conference of 2024! This three-day event brings together industry leaders, innovators, and tech enthusiasts to explore the cutting-edge developments in artificial intelligence, machine learning, and emerging technologies.

    Our carefully curated program features keynote presentations from Fortune 500 CEOs, hands-on workshops led by industry experts, and networking opportunities with like-minded professionals from around the globe.

    Key highlights include:
    • Exclusive keynotes from tech industry leaders
    • 50+ breakout sessions and workshops
    • Innovation showcase featuring 100+ startups
    • Premium networking events and receptions
    • Access to latest AI tools and technologies
    • Professional development opportunities

    Whether you're a seasoned professional, startup founder, or technology enthusiast, this event offers unparalleled insights into the future of artificial intelligence and its impact on various industries.`,
    
    agenda: [
      { time: "09:00 AM", title: "Registration & Welcome Coffee", type: "networking" },
      { time: "10:00 AM", title: "Keynote: The Future of AI", speaker: "Dr. Sarah Chen", type: "keynote" },
      { time: "11:15 AM", title: "AI in Healthcare Panel", type: "panel" },
      { time: "12:30 PM", title: "Networking Lunch", type: "networking" },
      { time: "02:00 PM", title: "Hands-on: Building AI Models", type: "workshop" },
      { time: "03:30 PM", title: "Startup Pitch Competition", type: "competition" },
      { time: "05:00 PM", title: "Closing Reception", type: "networking" }
    ],

    ticketTypes: [
      {
        id: 1,
        name: "Early Bird",
        price: 199,
        originalPrice: 299,
        description: "Perfect for individual attendees",
        features: ["Conference Access", "Welcome Kit", "Lunch Included", "Certificate"],
        available: 150,
        total: 500
      },
      {
        id: 2,
        name: "Standard",
        price: 299,
        description: "Full conference experience",
        features: ["Conference Access", "Welcome Kit", "All Meals", "Certificate", "Networking Events"],
        available: 300,
        total: 800
      },
      {
        id: 3,
        name: "VIP",
        price: 599,
        description: "Premium experience with exclusive access",
        features: ["Front Row Seating", "VIP Lounge Access", "Meet & Greet", "Premium Kit", "All Meals", "Certificate"],
        available: 25,
        total: 100
      }
    ],

    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Coffee, label: "Coffee Bar" },
      { icon: Car, label: "Parking Available" },
      { icon: Camera, label: "Photography" },
      { icon: Music, label: "Live Entertainment" },
      { icon: Utensils, label: "Catering" }
    ],

    speakers: [
      {
        name: "Dr. Sarah Chen",
        title: "Chief AI Officer, TechCorp",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        bio: "Leading AI researcher with 15+ years in machine learning"
      },
      {
        name: "Michael Rodriguez",
        title: "Founder, AI Innovations",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bio: "Serial entrepreneur in the AI space"
      },
      {
        name: "Dr. Emily Watson",
        title: "Professor, Stanford AI Lab",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        bio: "Academic leader in neural networks research"
      }
    ]
  };

  const relatedEvents = [
    {
      id: 2,
      title: "Data Science Summit",
      date: "2024-10-12",
      location: "Seattle, WA",
      price: "$249",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Machine Learning Workshop",
      date: "2024-11-08",
      location: "Austin, TX",
      price: "$149",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop"
    }
  ];

  const handleTicketSelect = (ticketType) => {
    setSelectedTicketType(ticketType);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const calculateTotal = () => {
    return selectedTicketType ? selectedTicketType.price * quantity : 0;
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600">
                <ArrowLeft size={24} />
              </button>
              <div className="text-2xl font-bold text-blue-600">EventHub</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full ${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={event.images[activeImageIndex]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="flex mt-4 space-x-2">
                {event.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-16 rounded-lg overflow-hidden ${
                      index === activeImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span>{event.rating}</span>
                    <span className="ml-1">({event.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{event.subtitle}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar size={20} className="mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">{event.date} - {event.endDate}</div>
                      <div className="text-sm text-gray-500">{event.startTime} - {event.endTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin size={20} className="mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      <div className="text-sm text-gray-500">{event.address}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">{event.organizer.name}</span>
                      {event.organizer.verified && (
                        <Shield size={16} className="ml-2 text-blue-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {event.organizer.events} events • {event.organizer.followers} followers
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {event.amenities.map((amenity, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <amenity.icon size={24} className="text-blue-600 mb-2" />
                      <span className="text-sm text-gray-600">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">About This Event</h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {showFullDescription 
                    ? event.description 
                    : event.description.slice(0, 300) + '...'
                  }
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 hover:text-blue-700 mt-2 font-medium"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </button>
              </div>

              {/* Agenda */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Event Agenda</h3>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium min-w-max">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        {item.speaker && (
                          <p className="text-sm text-gray-600">by {item.speaker}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.type === 'keynote' ? 'bg-purple-100 text-purple-800' :
                        item.type === 'workshop' ? 'bg-green-100 text-green-800' :
                        item.type === 'networking' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Featured Speakers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3"
                      />
                      <h4 className="font-medium text-gray-800">{speaker.name}</h4>
                      <p className="text-sm text-blue-600 mb-2">{speaker.title}</p>
                      <p className="text-xs text-gray-600">{speaker.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Selection */}
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Select Tickets</h3>
              
              <div className="space-y-4 mb-6">
                {event.ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => handleTicketSelect(ticket)}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTicketType?.id === ticket.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">{ticket.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          ${ticket.price}
                        </div>
                        {ticket.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${ticket.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {ticket.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle size={14} className="text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {ticket.available} of {ticket.total} available
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ width: `${(ticket.available / ticket.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTicketType && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700">Quantity</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${calculateTotal()}
                    </span>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Get Tickets
                  </button>
                  
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    Free cancellation until 24 hours before event
                  </div>
                </div>
              )}
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Event Organizer</h3>
              <div className="flex items-center mb-4">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">{event.organizer.name}</span>
                    {event.organizer.verified && (
                      <Shield size={16} className="ml-2 text-blue-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.organizer.events} events hosted
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.organizer.followers} followers
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Follow
                </button>
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                  Contact
                </button>
              </div>
            </div>

            {/* Related Events */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Events</h3>
              <div className="space-y-4">
                {relatedEvents.map((relatedEvent) => (
                  <div key={relatedEvent.id} className="flex space-x-3">
                    <img
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-2">
                        {relatedEvent.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{relatedEvent.date}</p>
                      <p className="text-xs text-gray-500">{relatedEvent.location}</p>
                      <p className="text-sm font-medium text-blue-600 mt-1">
                        {relatedEvent.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;