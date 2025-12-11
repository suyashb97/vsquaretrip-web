import React from 'react';

const DestinationCard = ({ destination }) => {
  return (
    <div className="text-center transform transition duration-500 hover:scale-110 animate-fadeIn">
      <div className="relative inline-block mb-4">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {destination.tours} Tours
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{destination.name}</h3>
    </div>
  );
};

export default DestinationCard;