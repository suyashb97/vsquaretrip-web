import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { domesticHotels, internationalHotels } from '../data/mockData';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    rooms: 1,
    adults: 2,
    children: 0,
    specialRequests: ''
  });

  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Find hotel from mockData
  const allHotels = [...domesticHotels, ...internationalHotels];
  const hotel = allHotels.find(h => h.id === parseInt(id));

  // If hotel not found
  if (!hotel) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Hotel Not Found</h1>
            <button 
              onClick={() => navigate('/hotels')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Back to Hotels
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    // Get price based on selected room or default hotel price
    let basePrice;
    if (selectedRoomType && hotel.roomTypes) {
      const selectedRoom = hotel.roomTypes.find(room => room.name === selectedRoomType);
      basePrice = selectedRoom ? parseFloat(selectedRoom.price.replace(/[^0-9.]/g, '')) : parseFloat(hotel.price.replace(/[^0-9.]/g, ''));
    } else {
      basePrice = parseFloat(hotel.price.replace(/[^0-9.]/g, ''));
    }
    
    const nights = bookingData.checkIn && bookingData.checkOut ? 
      Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24)) : 1;
    
    let total = basePrice * bookingData.rooms * nights;
    
    // Add charges for extra adults/children
    if (bookingData.adults > 2) {
      total += (bookingData.adults - 2) * 2000 * nights;
    }
    if (bookingData.children > 0) {
      total += bookingData.children * 1000 * nights;
    }
    
    // Format based on currency
    if (hotel.price.includes('$')) {
      return `$${total.toFixed(0)}`;
    } else {
      return `₹${total.toLocaleString('en-IN')}`;
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const bookingDetails = {
      hotel: hotel.name,
      location: hotel.location,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      rooms: bookingData.rooms,
      adults: bookingData.adults,
      children: bookingData.children,
      total: calculateTotal(),
      specialRequests: bookingData.specialRequests,
      selectedRoom: selectedRoomType
    };
    
    // Store booking in localStorage
    localStorage.setItem('bookingConfirmation', JSON.stringify(bookingDetails));
    
    alert('Booking submitted successfully! We will contact you shortly.');
    navigate('/');
  };

  // Calculate average rating
  const averageRating = hotel.reviews ? 
    hotel.reviews.reduce((acc, review) => acc + review.rating, 0) / hotel.reviews.length : 
    hotel.rating;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-white">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-white hover:text-gray-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Hotels
          </button>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{hotel.name}</h1>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <svg className="w-5 h-5 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              {hotel.reviews && (
                <span className="ml-1 text-gray-300">({hotel.reviews.length} reviews)</span>
              )}
            </div>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {hotel.location}
              {hotel.isInternational && (
                <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  International
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Hotel Details */}
          <div className="lg:w-2/3">
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex flex-wrap -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`mr-8 py-2 px-1 font-medium text-sm md:text-base ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('rooms')}
                  className={`mr-8 py-2 px-1 font-medium text-sm md:text-base ${
                    activeTab === 'rooms'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Rooms & Suites
                </button>
                <button
                  onClick={() => setActiveTab('amenities')}
                  className={`mr-8 py-2 px-1 font-medium text-sm md:text-base ${
                    activeTab === 'amenities'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Amenities
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`mr-8 py-2 px-1 font-medium text-sm md:text-base ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab('policies')}
                  className={`py-2 px-1 font-medium text-sm md:text-base ${
                    activeTab === 'policies'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Policies
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="animate-fadeInUp">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Hotel Overview</h2>
                <p className="text-gray-600 mb-6 text-sm md:text-base">{hotel.overview || hotel.description}</p>
                
                <div className="bg-blue-50 p-4 md:p-6 rounded-lg mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Location Details</h3>
                  <p className="text-gray-600 text-sm md:text-base">{hotel.locationDetails || hotel.location}</p>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Front Desk</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{hotel.amenities?.length || 5}+</div>
                    <div className="text-sm text-gray-600">Amenities</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">⭐ {hotel.rating}</div>
                    <div className="text-sm text-gray-600">Guest Rating</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">Free</div>
                    <div className="text-sm text-gray-600">WiFi</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="animate-fadeInUp">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Available Rooms</h2>
                {hotel.roomTypes && hotel.roomTypes.length > 0 ? (
                  <div className="space-y-6">
                    {hotel.roomTypes.map((room) => (
                      <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img 
                              src={room.image} 
                              alt={room.name}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 p-4 md:p-6">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{room.name}</h3>
                                <p className="text-gray-600 text-sm md:text-base mb-3">{room.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl md:text-2xl font-bold text-gray-900">{room.price}</div>
                                <div className="text-sm text-gray-600">per night</div>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-800 mb-2">Room Features:</h4>
                              <div className="flex flex-wrap gap-2">
                                {room.features.map((feature, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                <span className="font-semibold">Capacity:</span> {room.capacity}
                              </div>
                              <button
                                onClick={() => setSelectedRoomType(room.name)}
                                className={`px-4 py-2 rounded-lg font-semibold cursor-pointer ${
                                  selectedRoomType === room.name
                                    ? 'bg-green-600 text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                              >
                                {selectedRoomType === room.name ? 'Selected' : 'Select Room'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600">Room details coming soon. Please contact us for more information.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="animate-fadeInUp">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Hotel Amenities</h2>
                {hotel.amenities && hotel.amenities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800">{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600">Amenity details coming soon.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fadeInUp">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Guest Reviews</h2>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    {hotel.reviews && (
                      <div className="text-sm text-gray-600 mt-1">Based on {hotel.reviews.length} reviews</div>
                    )}
                  </div>
                </div>

                {hotel.reviews && hotel.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {hotel.reviews.map((review) => (
                      <div key={review.id} className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                </svg>
                              ))}
                            </div>
                            <h4 className="font-semibold text-gray-800">{review.name}</h4>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 mb-3 text-sm md:text-base">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600">Be the first to review this hotel!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'policies' && (
              <div className="animate-fadeInUp">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Hotel Policies</h2>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  {hotel.policies && hotel.policies.length > 0 ? (
                    <ul className="space-y-3">
                      {hotel.policies.map((policy, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span className="text-gray-600 text-sm md:text-base">{policy}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">Standard hotel policies apply. Please contact us for specific details.</p>
                  )}
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Important Information:</h3>
                    <p className="text-sm text-gray-600">
                      All rates are exclusive of taxes. Additional charges may apply for extra services. 
                      Please carry valid ID proof at the time of check-in. Rates are subject to change without prior notice.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 sticky top-24">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Book Your Stay</h2>
              
              <form onSubmit={handleBookingSubmit}>
                {/* Selected Room */}
                {selectedRoomType && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Selected Room:</span>
                        <div className="font-semibold text-green-700">{selectedRoomType}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedRoomType('')}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Booking Form Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                    <select
                      name="rooms"
                      value={bookingData.rooms}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                      <select
                        name="adults"
                        value={bookingData.adults}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                      <select
                        name="children"
                        value={bookingData.children}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                    <textarea
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleBookingChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      placeholder="Any special requirements or requests..."
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Price Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Price (per room)</span>
                      <span>{selectedRoomType && hotel.roomTypes ? 
                        hotel.roomTypes.find(r => r.name === selectedRoomType)?.price || hotel.price : 
                        hotel.price}</span>
                    </div>
                    {bookingData.checkIn && bookingData.checkOut && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Nights</span>
                          <span>
                            {Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24))}
                          </span>
                        </div>
                        {bookingData.adults > 2 && (
                          <div className="flex justify-between text-sm">
                            <span>Extra Adults</span>
                            <span>₹{((bookingData.adults - 2) * 2000).toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        {bookingData.children > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Extra Children</span>
                            <span>₹{(bookingData.children * 1000).toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{calculateTotal()}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Including all taxes and charges</p>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  type="submit"
                  className="w-full mt-6 py-3 rounded-lg font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Book Now
                </button>

                {/* Contact Info */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Need help? Call us:</p>
                  <a href="tel:+919876543210" className="text-blue-600 font-semibold hover:text-blue-800">
                    +91 98765 43210
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;