import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const isInternational = hotel.isInternational || false;

  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden hover:shadow-lg md:hover:shadow-xl transition-shadow h-full flex flex-col">
      {/* Hotel Type Badge */}
      <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${isInternational ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {isInternational ? 'International' : 'Domestic'}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 lg:p-6 flex-1 flex flex-col">
        {/* Rating and Location */}
        <div className="flex items-center mb-1 md:mb-2">
          <div className="flex items-center">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="ml-1 text-xs md:text-sm font-semibold text-gray-800">{hotel.rating}</span>
          </div>
          <span className="mx-1 md:mx-2 text-gray-300">•</span>
          <span className="text-xs md:text-sm text-gray-600">{hotel.location}</span>
          {isInternational && (
            <>
              <span className="mx-1 md:mx-2 text-gray-300">•</span>
              <span className="text-xs md:text-sm text-red-600 font-medium">🌍 International</span>
            </>
          )}
        </div>

        {/* Hotel Name */}
        <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-1 md:mb-2 line-clamp-1">
          {hotel.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
          {hotel.description}
        </p>

        {/* Amenities */}
        <div className="mb-2 md:mb-4">
          <div className="flex flex-wrap gap-1 md:gap-2">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-blue-50 text-blue-600 text-xs rounded">
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{hotel.price}</div>
              {hotel.originalPrice && (
                <div className="text-xs md:text-sm text-gray-500 line-through">{hotel.originalPrice}</div>
              )}
              <div className="text-xs md:text-sm text-gray-600 mt-1">
                Per night
              </div>
            </div>
            {isInternational && (
              <div className="text-xs text-red-600 font-semibold bg-red-50 px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                ✈️ Visa Assistance
              </div>
            )}
          </div>

          {/* View Details Button */}
          <Link 
            to={`/hotel/${hotel.id}`} 
            className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-sm md:text-base"
          >
            View Details & Book
            <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;