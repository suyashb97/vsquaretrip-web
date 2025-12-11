import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { packagesData, internationalPackagesData } from '../data/mockData';

const AllPackages = () => {
  const [allPackages, setAllPackages] = useState([...packagesData, ...internationalPackagesData]);
  const [filteredPackages, setFilteredPackages] = useState([...packagesData, ...internationalPackagesData]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    destination: '',
    duration: '',
    priceRange: '',
    rating: '',
    packageType: 'all'
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 9;

  // Available filters
  const destinations = [...new Set(allPackages.map(pkg => {
    const name = pkg.name.toLowerCase();
    if (name.includes('goa')) return 'Goa';
    if (name.includes('kashmir')) return 'Kashmir';
    if (name.includes('rajasthan')) return 'Rajasthan';
    if (name.includes('kerala')) return 'Kerala';
    if (name.includes('ladakh')) return 'Ladakh';
    if (name.includes('andaman')) return 'Andaman';
    if (name.includes('sikkim')) return 'Sikkim';
    if (name.includes('varanasi')) return 'Varanasi';
    if (name.includes('bali')) return 'Bali';
    if (name.includes('europe')) return 'Europe';
    if (name.includes('dubai')) return 'Dubai';
    if (name.includes('thailand')) return 'Thailand';
    if (name.includes('singapore')) return 'Singapore';
    if (name.includes('australia')) return 'Australia';
    if (name.includes('japan')) return 'Japan';
    if (name.includes('mauritius')) return 'Mauritius';
    return 'Other';
  }))].filter(Boolean);

  const durations = ['3-5 Days', '6-8 Days', '9+ Days'];
  const priceRanges = [
    { label: 'Under ₹10,000', value: '0-10000' },
    { label: '₹10,000 - ₹20,000', value: '10000-20000' },
    { label: '₹20,000 - ₹30,000', value: '20000-30000' },
    { label: '₹30,000 - ₹50,000', value: '30000-50000' },
    { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
    { label: 'Over ₹1,00,000', value: '100000-500000' }
  ];

  const packageTypes = [
    { label: 'All Packages', value: 'all' },
    { label: 'Domestic Packages', value: 'domestic' },
    { label: 'International Packages', value: 'international' }
  ];

  useEffect(() => {
    filterAndSortPackages();
  }, [filters, sortBy]);

  const filterAndSortPackages = () => {
    setLoading(true);
    
    let filtered = [...allPackages];

    // Apply package type filter
    if (filters.packageType === 'domestic') {
      filtered = filtered.filter(pkg => packagesData.includes(pkg));
    } else if (filters.packageType === 'international') {
      filtered = filtered.filter(pkg => internationalPackagesData.includes(pkg));
    }

    // Apply destination filter
    if (filters.destination) {
      filtered = filtered.filter(pkg => {
        const name = pkg.name.toLowerCase();
        const description = pkg.description.toLowerCase();
        const destinationLower = filters.destination.toLowerCase();
        
        return name.includes(destinationLower) || 
               description.includes(destinationLower) ||
               pkg.highlights.some(highlight => highlight.toLowerCase().includes(destinationLower));
      });
    }

    // Apply duration filter
    if (filters.duration) {
      const durationStr = filters.duration;
      filtered = filtered.filter(pkg => {
        const daysMatch = pkg.duration.match(/\d+/);
        if (!daysMatch) return false;
        const days = parseInt(daysMatch[0]);
        
        if (durationStr === '3-5 Days') return days >= 3 && days <= 5;
        if (durationStr === '6-8 Days') return days >= 6 && days <= 8;
        if (durationStr === '9+ Days') return days >= 9;
        return false;
      });
    }

    // Apply price filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(num => parseInt(num));
      filtered = filtered.filter(pkg => {
        const priceStr = pkg.price.replace(/[^0-9]/g, '');
        const price = parseInt(priceStr);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(pkg => pkg.rating >= parseFloat(filters.rating));
    }

    // Apply sorting
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => {
          const daysA = parseInt(a.duration.match(/\d+/)[0]);
          const daysB = parseInt(b.duration.match(/\d+/)[0]);
          return daysB - daysA;
        });
        break;
      default:
        // Recommended - mix domestic and international
        filtered.sort((a, b) => {
          const isAInternational = internationalPackagesData.includes(a);
          const isBInternational = internationalPackagesData.includes(b);
          
          // Show international first, then domestic
          if (isAInternational && !isBInternational) return -1;
          if (!isAInternational && isBInternational) return 1;
          return 0;
        });
        break;
    }

    setFilteredPackages(filtered);
    setCurrentPage(1);
    setLoading(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      destination: '',
      duration: '',
      priceRange: '',
      rating: '',
      packageType: 'all'
    });
    setSortBy('recommended');
  };

  // Pagination logic
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const activeFilters = Object.values(filters).filter(val => val !== '' && val !== 'all').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-600 to-purple-700 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Explore All Tour Packages</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
              Discover amazing destinations worldwide with our curated collection of domestic and international travel packages
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

                {/* Package Type Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Package Type</h3>
                  <div className="space-y-1 md:space-y-2">
                    {packageTypes.map((type, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="packageType"
                          checked={filters.packageType === type.value}
                          onChange={() => handleFilterChange('packageType', type.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm md:text-base">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Destination Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Destination</h3>
                  <div className="space-y-1 md:space-y-2 max-h-48 md:max-h-60 overflow-y-auto pr-2">
                    {destinations.sort().map((dest, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="destination"
                          checked={filters.destination === dest}
                          onChange={() => handleFilterChange('destination', dest)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm md:text-base">{dest}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="destination"
                        checked={filters.destination === ''}
                        onChange={() => handleFilterChange('destination', '')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm md:text-base">All Destinations</span>
                    </label>
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Duration</h3>
                  <div className="space-y-1 md:space-y-2">
                    {durations.map((duration, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="duration"
                          checked={filters.duration === duration}
                          onChange={() => handleFilterChange('duration', duration)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm md:text-base">{duration}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="duration"
                        checked={filters.duration === ''}
                        onChange={() => handleFilterChange('duration', '')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm md:text-base">Any Duration</span>
                    </label>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3">Price Range</h3>
                  <div className="space-y-1 md:space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.value}
                          onChange={() => handleFilterChange('priceRange', range.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm md:text-base">{range.label}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === ''}
                        onChange={() => handleFilterChange('priceRange', '')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm md:text-base">Any Price</span>
                    </label>
                  </div>
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
                          className="w-4 h-4 text-blue-600"
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
              </div>
            </div>

            {/* Packages Grid */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
                  <div>
                    <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                      {filteredPackages.length} Packages Found
                    </h2>
                    <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                      Showing {indexOfFirstPackage + 1}-{Math.min(indexOfLastPackage, filteredPackages.length)} of {filteredPackages.length} packages
                    </p>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    >
                      <option value="recommended">Sort by: Recommended</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Rating: High to Low</option>
                      <option value="duration">Duration: Long to Short</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {activeFilters > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {filters.packageType !== 'all' && (
                      <span className="bg-red-100 text-red-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        {filters.packageType === 'domestic' ? 'Domestic Only' : 'International Only'}
                        <button 
                          onClick={() => handleFilterChange('packageType', 'all')}
                          className="ml-1 md:ml-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.destination && (
                      <span className="bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        Destination: {filters.destination}
                        <button 
                          onClick={() => handleFilterChange('destination', '')}
                          className="ml-1 md:ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.duration && (
                      <span className="bg-green-100 text-green-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        Duration: {filters.duration}
                        <button 
                          onClick={() => handleFilterChange('duration', '')}
                          className="ml-1 md:ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.priceRange && (
                      <span className="bg-purple-100 text-purple-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        Price: {priceRanges.find(r => r.value === filters.priceRange)?.label}
                        <button 
                          onClick={() => handleFilterChange('priceRange', '')}
                          className="ml-1 md:ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.rating && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex items-center">
                        Rating: {filters.rating}+ ⭐
                        <button 
                          onClick={() => handleFilterChange('rating', '')}
                          className="ml-1 md:ml-2 text-yellow-600 hover:text-yellow-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
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
                  {/* Packages Grid */}
                  {currentPackages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {currentPackages.map((packageItem, index) => (
                        <div 
                          key={packageItem.id} 
                          className="animate-fadeInUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <PackageCard 
                            packageItem={packageItem}
                            isInternational={internationalPackagesData.includes(packageItem)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 md:py-12">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-1 md:mb-2">No packages found</h3>
                      <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Try adjusting your filters to find more packages</p>
                      <button 
                        onClick={clearFilters}
                        className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}

                  {/* Pagination */}
                  {filteredPackages.length > packagesPerPage && (
                    <div className="flex justify-center mt-8 md:mt-12">
                      <nav className="flex items-center space-x-1 md:space-x-2">
                        <button 
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base cursor-pointer"
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button 
                              key={pageNum}
                              onClick={() => paginate(pageNum)}
                              className={`px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm md:text-base cursor-pointer ${
                                currentPage === pageNum 
                                  ? 'bg-blue-600 text-white' 
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        <button 
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base cursor-pointer"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-linear-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Need Help Choosing?</h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
              Our travel experts can help you find the perfect package based on your preferences
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base cursor-pointer">
                Call Now: +91 9109309308
              </button>
              <button className="bg-transparent border border-white text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors text-sm md:text-base cursor-pointer">
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllPackages;