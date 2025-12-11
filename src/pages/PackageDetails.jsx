import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { packagesData } from '../data/mockData';
import { internationalPackagesData } from '../data/mockData';

const PackageDetails = () => {
  const { id } = useParams();
  const indianPackage = packagesData.find(pkg => pkg.id === parseInt(id));
  const internationalPackage = internationalPackagesData?.find(pkg => pkg.id === parseInt(id));
  
  const packageItem = indianPackage || internationalPackage;

  if (!packageItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Not Found</h2>
          <Link to="/" className="text-blue-600 hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fadeIn">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li>
              <Link 
                to={internationalPackage ? "/international-tours" : "/india-tours"} 
                className="hover:text-blue-600"
              >
                {internationalPackage ? "International Tours" : "India Tours"}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{packageItem.name}</li>
          </ol>
        </nav>

        {/* Package Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 animate-fadeIn">
          <div className="relative">
            <img 
              src={packageItem.image} 
              alt={packageItem.name}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {packageItem.rating} ⭐ Rating
            </div>
            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
              Save {Math.round((1 - parseInt(packageItem.price.replace('₹', '').replace(',', '')) / parseInt(packageItem.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{packageItem.name}</h1>
                <p className="text-gray-600 text-lg">{packageItem.duration}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-3xl font-bold text-blue-600">{packageItem.price}</div>
                <div className="text-gray-500 line-through">{packageItem.originalPrice}</div>
                <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer">
                  Book Now
                </button>
              </div>
            </div>
            
            <p className="text-gray-700 text-lg mb-6">{packageItem.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeInUp">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageItem.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageItem.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{inclusion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Itinerary</h2>
              <div className="space-y-6">
                {packageItem.itinerary.map((day, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {day.day}
                      </div>
                      {index < packageItem.itinerary.length - 1 && (
                        <div className="w-1 h-full bg-gray-300 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{day.title}</h3>
                      <p className="text-gray-600">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-lg p-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{packageItem.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-semibold">{packageItem.rating} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-blue-600">{packageItem.price}</span>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="mb-4">Our travel experts are here to help you plan your perfect trip.</p>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 mb-3 cursor-pointer">
                Call Now
              </button>
              <button className="w-full bg-transparent border-2 border-white text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 cursor-pointer">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;