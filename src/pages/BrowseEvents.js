import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Star, Grid, List, Map, ChevronDown, X, SlidersHorizontal, Heart, Share2, Clock } from 'lucide-react';

const BrowseEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  const [filters, setFilters] = useState({
    location: '',
    dateRange: '',
    category: [],
    priceRange: [0, 500],
    eventType: [],
    rating: 0,
    availability: 'all'
  });

  // Sample events data - in real app this would come from API
  const allEvents = [
    {
      id: 1,
      title: "Tech Conference 2024: Future of AI",
      date: "2024-09-15",
      time: "09:00 AM",
      endDate: "2024-09-17",
      location: "San Francisco, CA",
      venue: "Moscone Center",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
      price: 299,
      originalPrice: 399,
      attendees: 1250,
      maxAttendees: 2000,
      rating: 4.8,
      reviewCount: 124,
      category: "Technology",
      tags: ["AI", "Machine Learning", "Tech", "Conference"],
      organizer: "TechEvents Inc.",
      description: "Join industry leaders for three days of cutting-edge AI discussions and networking.",
      featured: true,
      distance: "2.3 miles"
    },
    {
      id: 2,
      title: "Summer Music Festival 2024",
      date: "2024-08-20",
      time: "06:00 PM",
      endDate: "2024-08-22",
      location: "Austin, TX",
      venue: "Zilker Park",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
      price: 89,
      originalPrice: 120,
      attendees: 5000,
      maxAttendees: 8000,
      rating: 4.9,
      reviewCount: 342,
      category: "Music",
      tags: ["Music", "Festival", "Outdoor", "Live Performance"],
      organizer: "Austin Music Co.",
      description: "Three days of amazing music featuring top artists from around the world.",
      featured: true,
      distance: "12.7 miles"
    },
    {
      id: 3,
      title: "Digital Marketing Workshop",
      date: "2024-09-05",
      time: "10:00 AM",
      endDate: "2024-09-05",
      location: "New York, NY",
      venue: "WeWork Manhattan",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop",
      price: 149,
      originalPrice: 199,
      attendees: 45,
      maxAttendees: 60,
      rating: 4.7,
      reviewCount: 23,
      category: "Business",
      tags: ["Marketing", "Digital", "Workshop", "Business"],
      organizer: "Marketing Pro Academy",
      description: "Learn the latest digital marketing strategies from industry experts.",
      featured: false,
      distance: "5.1 miles"
    },
    {
      id: 4,
      title: "Food & Wine Expo 2024",
      date: "2024-09-28",
      time: "12:00 PM",
      endDate: "2024-09-29",
      location: "Napa Valley, CA",
      venue: "Napa Valley Convention Center",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
      price: 75,
      originalPrice: 95,
      attendees: 800,
      maxAttendees: 1200,
      rating: 4.6,
      reviewCount: 89,
      category: "Food & Drink",
      tags: ["Food", "Wine", "Tasting", "Culinary"],
      organizer: "Napa Events",
      description: "Experience the finest wines and gourmet foods from local vendors.",
      featured: false,
      distance: "45.2 miles"
    },
    {
      id: 5,
      title: "Startup Pitch Competition",
      date: "2024-09-12",
      time: "02:00 PM",
      endDate: "2024-09-12",
      location: "San Francisco, CA",
      venue: "TechCrunch Office",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
      price: 0,
      originalPrice: 0,
      attendees: 200,
      maxAttendees: 300,
      rating: 4.4,
      reviewCount: 67,
      category: "Business",
      tags: ["Startup", "Pitch", "Investment", "Networking"],
      organizer: "StartupHub SF",
      description: "Watch innovative startups pitch their ideas to top investors.",
      featured: false,
      distance: "1.8 miles"
    },
    {
      id: 6,
      title: "Photography Workshop: Street Photography",
      date: "2024-08-25",
      time: "09:00 AM",
      endDate: "2024-08-25",
      location: "Brooklyn, NY",
      venue: "Brooklyn Bridge Park",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=250&fit=crop",
      price: 85,
      originalPrice: 120,
      attendees: 15,
      maxAttendees: 20,
      rating: 4.9,
      reviewCount: 18,
      category: "Arts",
      tags: ["Photography", "Workshop", "Street", "Arts"],
      organizer: "NYC Photo School",
      description: "Master the art of street photography with professional guidance.",
      featured: false,
      distance: "8.3 miles"
    }
  ];

  const categories = ["Technology", "Music", "Business", "Food & Drink", "Arts", "Sports", "Health", "Education"];
  const eventTypes = ["Conference", "Workshop", "Festival", "Seminar", "Networking", "Competition", "Exhibition"];

  // Filter events based on current filters and search
  const filteredEvents = useMemo(() => {
    let filtered = allEvents.filter(event => {
      // Search filter
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !event.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(event.category)) {
        return false;
      }

      // Price filter
      if (event.price < filters.priceRange[0] || event.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && event.rating < filters.rating) {
        return false;
      }

      // Availability filter
      if (filters.availability === 'available' && event.attendees >= event.maxAttendees) {
        return false;
      }

      return true;
    });

    // Sort events
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.attendees - a.attendees);
        break;
      default: // relevance
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy, allEvents]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      dateRange: '',
      category: [],
      priceRange: [0, 500],
      eventType: [],
      rating: 0,
      availability: 'all'
    });
    setSearchQuery('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const EventCard = ({ event, isListView = false }) => (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${isListView ? 'flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-64 flex-shrink-0' : 'w-full h-48'}`}>
        <img
          src={event.image}
          alt={event.title}
          className={`w-full object-cover ${isListView ? 'h-full' : 'h-48'}`}
        />
        {event.featured && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
        {event.originalPrice > event.price && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}% OFF
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex space-x-2">
          <button className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all">
            <Heart size={16} className="text-gray-600 hover:text-red-500" />
          </button>
          <button className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all">
            <Share2 size={16} className="text-gray-600 hover:text-blue-500" />
          </button>
        </div>
      </div>

      <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
            {event.category}
          </span>
          <div className="flex items-center">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{event.rating}</span>
            <span className="text-xs text-gray-400 ml-1">({event.reviewCount})</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-lg">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={14} className="mr-2 flex-shrink-0" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-2 flex-shrink-0" />
            <span>{event.venue}, {event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={14} className="mr-2 flex-shrink-0" />
            <span>{event.attendees}/{event.maxAttendees} attendees</span>
            <span className="ml-2 text-xs text-green-600">• {event.distance}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-2 flex-shrink-0" />
            <span>By {event.organizer}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {event.originalPrice > event.price && (
              <span className="text-sm text-gray-400 line-through">
                ${event.originalPrice}
              </span>
            )}
            <span className="text-xl font-bold text-blue-600">
              {event.price === 0 ? 'Free' : `$${event.price}`}
            </span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            {event.attendees >= event.maxAttendees ? 'Waitlist' : 'Get Tickets'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Events</h1>
              <p className="text-gray-600 mt-1">Find amazing events happening around you</p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, categories, or locations..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="Enter city or address"
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any date</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This week</option>
                  <option value="this-weekend">This weekend</option>
                  <option value="next-week">Next week</option>
                  <option value="this-month">This month</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price Range
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}+</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFilterChange('priceRange', [0, 0])}
                      className={`px-3 py-1 text-xs rounded ${filters.priceRange[1] === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Free
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', [0, 50])}
                      className={`px-3 py-1 text-xs rounded ${filters.priceRange[1] === 50 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      Under $50
                    </button>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                        className="mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{rating} & up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Availability
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="all"
                      checked={filters.availability === 'all'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">All events</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="availability"
                      value="available"
                      checked={filters.availability === 'available'}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Available tickets only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filters
                </button>

                <div className="text-sm text-gray-600">
                  {filteredEvents.length} events found
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="date">Sort by Date</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Map size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Events Display */}
            {viewMode === 'map' ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Map size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Map View</h3>
                <p className="text-gray-600">Interactive map showing event locations would be displayed here.</p>
                <p className="text-sm text-gray-500 mt-2">Integration with mapping services like Google Maps or Mapbox</p>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-6'
              }`}>
                {filteredEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Search size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                    <button
                      onClick={clearFilters}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      isListView={viewMode === 'list'} 
                    />
                  ))
                )}
              </div>
            )}

            {/* Pagination */}
            {filteredEvents.length > 0 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseEventsPage;