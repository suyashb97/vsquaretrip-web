import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { packagesData } from '../data/mockData';
import { useLocation } from 'react-router-dom';

const IndiaTours = () => {
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

  // Filter Indian packages based on package names/descriptions
  const indianPackages = packagesData.filter(pkg => {
    const name = pkg.name.toLowerCase();
    const description = pkg.description.toLowerCase();
    
    // Indian destinations
    const indianDestinations = ['goa', 'kashmir', 'rajasthan', 'kerala', 'ladakh', 'andaman', 'sikkim', 'varanasi', 'himachal', 'uttarakhand'];
    
    return indianDestinations.some(dest => 
      name.includes(dest) || description.includes(dest)
    );
  });

  // Sub-categories for filtering
  const categories = [
    { id: 'all', name: 'All Indian Tours' },
    { id: 'goa', name: 'Goa Packages' },
    { id: 'kashmir', name: 'Kashmir Packages' },
    { id: 'rajasthan', name: 'Rajasthan Packages' },
    { id: 'kerala', name: 'Kerala Packages' },
    { id: 'ladakh', name: 'Ladakh Packages' },
    { id: 'andaman', name: 'Andaman Packages' },
    { id: 'spiritual', name: 'Spiritual Journeys' },
  ];

  // Filter packages based on active category
  const filteredPackages = indianPackages.filter(pkg => {
    if (activeFilter === 'all') return true;
    
    const name = pkg.name.toLowerCase();
    const description = pkg.description.toLowerCase();
    
    switch(activeFilter) {
      case 'goa':
        return name.includes('goa') || description.includes('goa');
      case 'kashmir':
        return name.includes('kashmir') || description.includes('kashmir');
      case 'rajasthan':
        return name.includes('rajasthan') || description.includes('rajasthan');
      case 'kerala':
        return name.includes('kerala') || description.includes('kerala');
      case 'ladakh':
        return name.includes('ladakh') || description.includes('ladakh');
      case 'andaman':
        return name.includes('andaman') || description.includes('andaman');
      case 'spiritual':
        return name.includes('spiritual') || description.includes('spiritual') || 
               name.includes('varanasi') || description.includes('varanasi');
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Indian Tour Packages</h1>
            <p className="text-xl mb-8">Explore the incredible diversity of India with our curated tour packages</p>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Indian Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our most sought-after destinations in India</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
            {[
              { name: 'Goa', tours: 24, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Kashmir', tours: 18, image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Rajasthan', tours: 32, image: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Kerala', tours: 21, image: 'https://images.unsplash.com/photo-1589556189269-0d8566ca4b71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Ladakh', tours: 15, image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Andaman', tours: 12, image: 'https://images.unsplash.com/photo-1558349694-4b00baedc8c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Sikkim', tours: 14, image: 'https://images.unsplash.com/photo-1544735716-142d95ff5e79?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { name: 'Varanasi', tours: 9, image: 'https://images.unsplash.com/photo-1567136308352-2d03e36bf644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            ].map((destination, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.tours} Tours Available</p>
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
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition duration-300 cursor-pointer ${
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
                Need a Custom Indian Tour Package?
              </h3>
              <p className="text-gray-600 mb-6">
                Our travel experts can create a personalized itinerary based on your preferences, budget, and travel style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 cursor-pointer">
                  Get Custom Quote
                </button>
                <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 cursor-pointer">
                  Call Our Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default IndiaTours;