import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ packageItem }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn">
      <div className="relative">
        <img 
          src={packageItem.image} 
          alt={packageItem.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
          {packageItem.rating} ⭐
        </div>
        <div className="absolute bottom-4 left-4 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
          Save {Math.round((1 - parseInt(packageItem.price.replace('₹', '').replace(',', '')) / parseInt(packageItem.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{packageItem.name}</h3>
        <p className="text-gray-600 mb-4">{packageItem.duration}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">{packageItem.price}</span>
            <span className="text-gray-500 line-through ml-2">{packageItem.originalPrice}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{packageItem.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {packageItem.highlights.slice(0, 3).map((highlight, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {highlight}
            </span>
          ))}
        </div>
        
        <Link 
          to={`/package/${packageItem.id}`}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;