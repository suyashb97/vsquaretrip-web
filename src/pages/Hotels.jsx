import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import { domesticHotels, internationalHotels, allHotels } from '../data/mockData';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    rating: '',
    amenities: [],
    hotelType: 'all'
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;

  const locations = [...new Set(allHotels.map(hotel => hotel.location))].sort();
  
  const amenitiesList = [...new Set(
    allHotels.flatMap(hotel => hotel.amenities)
  )].sort();

  const hotelTypes = [
    { label: 'All Hotels', value: 'all' },
    { label: 'Domestic Hotels', value: 'domestic' },
    { label: 'International Hotels', value: 'international' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHotels(allHotels);
      setFilteredHotels(allHotels);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterHotels();
  }, [filters]);

  const filterHotels = () => {
    let filtered = [...allHotels];

    // Apply hotel type filter
    if (filters.hotelType === 'domestic') {
      filtered = filtered.filter(hotel => domesticHotels.includes(hotel));
    } else if (filters.hotelType === 'international') {
      filtered = filtered.filter(hotel => internationalHotels.includes(hotel));
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(num => {
        if (num.includes('$')) {
          return parseInt(num.replace('$', '')) * 83; // Convert to INR (approx)
        }
        return parseInt(num.replace('₹', '').replace(',', ''));
      });
      
      filtered = filtered.filter(hotel => {
        const priceStr = hotel.price;
        let price;
        
        if (priceStr.includes('$')) {
          price = parseFloat(priceStr.replace('$', '')) * 83; // Convert to INR
        } else {
          price = parseFloat(priceStr.replace('₹', '').replace(',', ''));
        }
        
        return price >= min && price <= max;
      });
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(hotel => hotel.rating >= parseFloat(filters.rating));
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }

    setFilteredHotels(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'amenities') {
      setFilters(prev => ({
        ...prev,
        amenities: prev.amenities.includes(value)
          ? prev.amenities.filter(a => a !== value)
          : [...prev.amenities, value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      rating: '',
      amenities: [],
      hotelType: 'all'
    });
  };

  // Pagination logic
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-600 to-purple-700 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Luxury Hotels & Resorts Worldwide</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
              Discover premium accommodations across India and international destinations with our curated collection
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-4 md:p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">Filters</h2>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Hotel Type Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Hotel Type</h3>
                  <div className="space-y-1 md:space-y-2">
                    {hotelTypes.map((type, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hotelType"
                          checked={filters.hotelType === type.value}
                          onChange={() => handleFilterChange('hotelType', type.value)}
                          className="w-4 h-4 text-blue-600 cursor-pointer"
                        />
                        <span className="text-sm md:text-base">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Location</h3>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base cursor-pointer"
                  >
                    <option value="">All Locations</option>
                    <optgroup label="Domestic">
                      {locations.filter(loc => 
                        domesticHotels.some(hotel => hotel.location === loc)
                      ).map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </optgroup>
                    <optgroup label="International">
                      {locations.filter(loc => 
                        internationalHotels.some(hotel => hotel.location === loc)
                      ).map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Price Range (INR)</h3>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base cursor-pointer"
                  >
                    <option value="">Any Price</option>
                    <option value="0-5000">Under ₹5,000</option>
                    <option value="5000-10000">₹5,000 - ₹10,000</option>
                    <option value="10000-20000">₹10,000 - ₹20,000</option>
                    <option value="20000-50000">₹20,000 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-250000">₹1,00,000 - ₹2,50,000</option>
                    <option value="250000-500000">Over ₹2,50,000</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Minimum Rating</h3>
                  <div className="space-y-1 md:space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map(rating => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating.toString()}
                          onChange={() => handleFilterChange('rating', rating.toString())}
                          className="w-4 h-4 text-blue-600 cursor-pointer"
                        />
                        <span className="text-sm md:text-base">
                          {rating} ⭐ & above
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === ''}
                        onChange={() => handleFilterChange('rating', '')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm md:text-base">Any Rating</span>
                    </label>
                  </div>
                </div>

                {/* Amenities Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Amenities</h3>
                  <div className="space-y-1 md:space-y-2 max-h-48 md:max-h-60 overflow-y-auto pr-2">
                    {amenitiesList.map(amenity => (
                      <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={() => handleFilterChange('amenities', amenity)}
                          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                        />
                        <span className="text-sm md:text-base">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hotels Grid */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
                  <div>
                    <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                      {filteredHotels.length} Hotels Found
                    </h2>
                    <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                      Showing {indexOfFirstHotel + 1}-{Math.min(indexOfLastHotel, filteredHotels.length)} of {filteredHotels.length} hotels
                      {filteredHotels.length > hotelsPerPage && ` • Page ${currentPage} of ${totalPages}`}
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <select className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
                      <option>Sort by: Recommended</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Rating: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                {Object.values(filters).some(val => 
                  Array.isArray(val) ? val.length > 0 : val !== '' && val !== 'all'
                ) && (
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {filters.hotelType !== 'all' && (
                      <span className="bg-red-100 text-red-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        {filters.hotelType === 'domestic' ? 'Domestic Only' : 'International Only'}
                        <button 
                          onClick={() => handleFilterChange('hotelType', 'all')}
                          className="ml-1 md:ml-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.location && (
                      <span className="bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        Location: {filters.location}
                        <button 
                          onClick={() => handleFilterChange('location', '')}
                          className="ml-1 md:ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.rating && (
                      <span className="bg-green-100 text-green-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        Rating: {filters.rating}+ ⭐
                        <button 
                          onClick={() => handleFilterChange('rating', '')}
                          className="ml-1 md:ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.amenities.map(amenity => (
                      <span key={amenity} className="bg-purple-100 text-purple-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        {amenity}
                        <button 
                          onClick={() => handleFilterChange('amenities', amenity)}
                          className="ml-1 md:ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex justify-center items-center h-48 md:h-64">
                  <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {/* Hotels Grid */}
                  {currentHotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {currentHotels.map((hotel, index) => (
                        <div 
                          key={hotel.id} 
                          className="animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <HotelCard hotel={hotel} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-1 md:mb-2">No hotels found</h3>
                      <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Try adjusting your filters to find more hotels</p>
                      <button 
                        onClick={clearFilters}
                        className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}

                  {/* Pagination */}
                  {filteredHotels.length > hotelsPerPage && (
                    <div className="flex justify-center mt-8 md:mt-12">
                      <nav className="flex items-center space-x-1 md:space-x-2" aria-label="Pagination">
                        {/* Previous Button */}
                        <button
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base flex items-center cursor-pointer"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                          </svg>
                          Previous
                        </button>

                        {/* Page Numbers */}
                        {getPageNumbers().map((pageNumber, index) => (
                          pageNumber === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500">
                              ...
                            </span>
                          ) : (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm md:text-base cursor-pointer ${
                                currentPage === pageNumber
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          )
                        ))}

                        {/* Next Button */}
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base flex items-center cursor-pointer"
                        >
                          Next
                          <svg className="w-4 h-4 md:w-5 md:h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </nav>
                    </div>
                  )}

                  {/* Page Info */}
                  {filteredHotels.length > hotelsPerPage && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                      Page {currentPage} of {totalPages} • {hotelsPerPage} hotels per page
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Why Book Hotels With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Experience premium hotel booking with exclusive benefits across domestic and international destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600 text-sm md:text-base">Find a lower price? We'll match it and give you 10% off your next booking.</p>
            </div>
            
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Secure Booking</h3>
              <p className="text-gray-600 text-sm md:text-base">Your personal information is protected with bank-level security.</p>
            </div>
            
            <div className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">24/7 Global Support</h3>
              <p className="text-gray-600 text-sm md:text-base">Our travel experts are available round the clock to assist you worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hotels;