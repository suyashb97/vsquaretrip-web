import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { packagesData } from '../data/mockData';
import { useLocation } from 'react-router-dom';

// Sample international packages (in real app, these would come from your API)
const internationalPackagesData = [
  {
    id: 101,
    name: "Bali Paradise Getaway",
    duration: "6 Days / 5 Nights",
    price: "₹45,999",
    originalPrice: "₹52,999",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    description: "Experience the beautiful beaches and culture of Bali with luxury resorts and adventure activities.",
    highlights: ["Beach Resorts", "Temple Visits", "Water Sports", "Cultural Shows"],
    inclusions: ["Accommodation", "Breakfast", "Sightseeing", "Airport Transfers"],
    itinerary: [
      { day: 1, title: "Arrival in Bali", description: "Check into resort and relax" },
      { day: 2, title: "Ubud Exploration", description: "Visit temples and rice terraces" },
      { day: 3, title: "Beach Day", description: "Water sports and beach activities" },
      { day: 4, title: "Island Hopping", description: "Visit Nusa Penida or Lembongan" },
      { day: 5, title: "Cultural Experience", description: "Traditional dance and local cuisine" },
      { day: 6, title: "Departure", description: "Check out and transfer to airport" }
    ]
  },
  {
    id: 102,
    name: "European Adventure",
    duration: "10 Days / 9 Nights",
    price: "₹89,999",
    originalPrice: "₹99,999",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    description: "Explore the best of Europe with visits to Paris, Switzerland, and Italy.",
    highlights: ["Eiffel Tower", "Swiss Alps", "Venice Canals", "Roman History"],
    inclusions: ["Accommodation", "Breakfast", "Sightseeing", "Inter-city Travel"],
    itinerary: [
      { day: 1, title: "Paris Arrival", description: "Check into hotel and Seine River cruise" },
      { day: 2, title: "Paris Sightseeing", description: "Eiffel Tower and Louvre Museum" },
      { day: 3, title: "Travel to Switzerland", description: "Scenic train to Interlaken" },
      { day: 4, title: "Swiss Alps", description: "Jungfrau region exploration" },
      { day: 5, title: "Travel to Italy", description: "Transfer to Venice" },
      { day: 6, title: "Venice Experience", description: "Gondola ride and St. Mark's Square" },
      { day: 7, title: "Rome Arrival", description: "Travel to Rome and check in" },
      { day: 8, title: "Ancient Rome", description: "Colosseum and Roman Forum" },
      { day: 9, title: "Vatican City", description: "Visit St. Peter's Basilica" },
      { day: 10, title: "Departure", description: "Check out and airport transfer" }
    ]
  },
  {
    id: 103,
    name: "Dubai Luxury Experience",
    duration: "5 Days / 4 Nights",
    price: "₹39,999",
    originalPrice: "₹45,999",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    description: "Experience the glamour of Dubai with desert safaris, luxury shopping, and iconic landmarks.",
    highlights: ["Burj Khalifa", "Desert Safari", "Luxury Shopping", "Dhow Cruise"],
    inclusions: ["5-star Hotel", "Breakfast", "Sightseeing", "Desert Safari"],
    itinerary: [
      { day: 1, title: "Arrival in Dubai", description: "Check into luxury hotel" },
      { day: 2, title: "City Tour", description: "Burj Khalifa and Dubai Mall" },
      { day: 3, title: "Desert Adventure", description: "Desert safari with dinner" },
      { day: 4, title: "Abu Dhabi Day Trip", description: "Visit Sheikh Zayed Mosque" },
      { day: 5, title: "Departure", description: "Last minute shopping and departure" }
    ]
  },
  {
    id: 104,
    name: "Thailand Island Hopping",
    duration: "7 Days / 6 Nights",
    price: "₹32,999",
    originalPrice: "₹38,999",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    description: "Explore the beautiful islands of Thailand with beach hopping and cultural experiences.",
    highlights: ["Phi Phi Islands", "James Bond Island", "Floating Markets", "Thai Massage"],
    inclusions: ["Accommodation", "Breakfast", "Island Tours", "Cultural Show"],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok", description: "Check into hotel and local market visit" },
      { day: 2, title: "Bangkok Sightseeing", description: "Grand Palace and floating markets" },
      { day: 3, title: "Travel to Phuket", description: "Flight to Phuket and check in" },
      { day: 4, title: "Phi Phi Islands", description: "Full day island tour" },
      { day: 5, title: "James Bond Island", description: "Phang Nga Bay exploration" },
      { day: 6, title: "Beach Relaxation", description: "Free day at Patong Beach" },
      { day: 7, title: "Departure", description: "Check out and airport transfer" }
    ]
  },
  {
    id: 105,
    name: "Singapore Malaysia Tour",
    duration: "8 Days / 7 Nights",
    price: "₹49,999",
    originalPrice: "₹56,999",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    description: "Experience the best of Singapore and Malaysia with modern cities and cultural heritage.",
    highlights: ["Gardens by the Bay", "Petronas Towers", "Sentosa Island", "Cultural Diversity"],
    inclusions: ["Accommodation", "Breakfast", "Theme Park Entry", "Inter-country Transfer"],
    itinerary: [
      { day: 1, title: "Arrival in Singapore", description: "Check into hotel and Marina Bay visit" },
      { day: 2, title: "Singapore Sightseeing", description: "Gardens by the Bay and Sentosa" },
      { day: 3, title: "Universal Studios", description: "Full day at theme park" },
      { day: 4, title: "Travel to Kuala Lumpur", description: "Flight to Malaysia and check in" },
      { day: 5, title: "KL City Tour", description: "Petronas Towers and Batu Caves" },
      { day: 6, title: "Genting Highlands", description: "Day trip to highland resort" },
      { day: 7, title: "Shopping Day", description: "Free day for shopping" },
      { day: 8, title: "Departure", description: "Check out and airport transfer" }
    ]
  },
  {
    id: 106,
    name: "Australia Adventure",
    duration: "12 Days / 11 Nights",
    price: "₹1,29,999",
    originalPrice: "₹1,45,999",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    description: "Explore Australia's iconic landmarks from Sydney to the Great Barrier Reef.",
    highlights: ["Sydney Opera House", "Great Barrier Reef", "Gold Coast", "Wildlife"],
    inclusions: ["Accommodation", "Breakfast", "Domestic Flights", "Reef Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Sydney", description: "Check into hotel and harbor cruise" },
      { day: 2, title: "Sydney Exploration", description: "Opera House and Bondi Beach" },
      { day: 3, title: "Blue Mountains", description: "Day trip to scenic mountains" },
      { day: 4, title: "Travel to Cairns", description: "Flight to Cairns and check in" },
      { day: 5, title: "Great Barrier Reef", description: "Full day reef exploration" },
      { day: 6, title: "Daintree Rainforest", description: "Rainforest and wildlife tour" },
      { day: 7, title: "Travel to Gold Coast", description: "Flight to Gold Coast" },
      { day: 8, title: "Theme Parks", description: "Movie World or Sea World" },
      { day: 9, title: "Surfers Paradise", description: "Beach day and shopping" },
      { day: 10, title: "Travel to Melbourne", description: "Flight to Melbourne" },
      { day: 11, title: "Melbourne City", description: "City tour and cultural spots" },
      { day: 12, title: "Departure", description: "Check out and airport transfer" }
    ]
  }
];

const InternationalTours = () => {
    const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [activeFilter, setActiveFilter] = useState('all');
  const carouselRef = useRef(null);

   // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setActiveFilter(category);
    }
  }, [location.search]);
  
  // Sub-categories for filtering
  const categories = [
    { id: 'all', name: 'All International Tours' },
    { id: 'europe', name: 'Europe Packages' },
    { id: 'southeast', name: 'Southeast Asia' },
    { id: 'middle-east', name: 'Middle East' },
    { id: 'australia', name: 'Australia & NZ' },
    { id: 'america', name: 'America' },
    { id: 'escorted', name: 'Escorted Tours' },
  ];

  // Filter packages based on active category
  const filteredPackages = internationalPackagesData.filter(pkg => {
    if (activeFilter === 'all') return true;
    
    const name = pkg.name.toLowerCase();
    const description = pkg.description.toLowerCase();
    
    switch(activeFilter) {
      case 'europe':
        return name.includes('europe') || description.includes('europe') || 
               name.includes('switzerland') || name.includes('paris') || name.includes('italy');
      case 'southeast':
        return name.includes('bali') || name.includes('thailand') || 
               name.includes('singapore') || name.includes('malaysia') || 
               name.includes('vietnam') || name.includes('indonesia');
      case 'middle-east':
        return name.includes('dubai') || description.includes('dubai') || 
               name.includes('abu dhabi') || name.includes('egypt');
      case 'australia':
        return name.includes('australia') || description.includes('australia') || 
               name.includes('sydney') || name.includes('melbourne');
      case 'america':
        return name.includes('america') || description.includes('america') || 
               name.includes('usa') || name.includes('canada');
      case 'escorted':
        return description.includes('escorted') || description.includes('guided');
      default:
        return true;
    }
  });

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = () => {
    if (currentIndex < filteredPackages.length - itemsPerView) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredPackages.length - itemsPerView);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index * itemsPerView);
  };

  const canGoNext = currentIndex < filteredPackages.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  // Auto slide
  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (filteredPackages.length > itemsPerView) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [currentIndex, itemsPerView, filteredPackages.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">International Tour Packages</h1>
            <p className="text-xl mb-8">Explore the world with our carefully crafted international travel experiences</p>
          </div>
        </div>
      </section>

      {/* Popular Regions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular International Regions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular international destinations</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Europe', tours: 45, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Southeast Asia', tours: 38, image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Middle East', tours: 22, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Australia & NZ', tours: 18, image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'America', tours: 25, image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'East Asia', tours: 20, image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Africa', tours: 15, image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Cruise Packages', tours: 12, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            ].map((region, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl">
                <img 
                  src={region.image} 
                  alt={region.name}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{region.name}</h3>
                  <p className="text-sm opacity-90">{region.tours} Tours Available</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveFilter(category.id);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition duration-300 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {categories.find(c => c.id === activeFilter)?.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {filteredPackages.length} packages found
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Left Navigation Button */}
            {filteredPackages.length > itemsPerView && (
              <button
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 rounded-full p-2 md:p-3 shadow-lg transition duration-300 group ${
                  canGoPrev
                    ? 'bg-white hover:bg-gray-100'
                    : 'bg-gray-100 cursor-not-allowed opacity-50'
                }`}
                disabled={!canGoPrev}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
            )}

            {/* Carousel Content */}
            <div ref={carouselRef} className="overflow-hidden px-2">
              {filteredPackages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No packages found</h3>
                  <p className="text-gray-600">Try selecting a different category</p>
                </div>
              ) : (
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6 lg:gap-8"
                  style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                  {filteredPackages.map((packageItem, index) => (
                    <div
                      key={packageItem.id}
                      className="shrink-0 animate-fadeInUp"
                      style={{
                        width: `${100 / itemsPerView}%`,
                        animationDelay: `${index * 0.1}s`,
                        minWidth: 0,
                      }}
                    >
                      <PackageCard packageItem={packageItem} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Navigation Button */}
            {filteredPackages.length > itemsPerView && (
              <button
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 rounded-full p-2 md:p-3 shadow-lg transition duration-300 group cursor-pointer ${
                  canGoNext
                    ? 'bg-white hover:bg-gray-100'
                    : 'bg-gray-100 cursor-not-allowed opacity-50'
                }`}
                disabled={!canGoNext}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          {filteredPackages.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(filteredPackages.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition duration-300 ${
                    index === Math.floor(currentIndex / itemsPerView)
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Dreaming of an International Vacation?
              </h3>
              <p className="text-gray-600 mb-6">
                Our international travel specialists can help you plan the perfect overseas trip with visa assistance, flight bookings, and custom itineraries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                  Get Visa Consultation
                </button>
                <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">
                  Book Flight + Hotel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default InternationalTours;