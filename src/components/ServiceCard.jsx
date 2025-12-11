import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-xl animate-fadeIn">
      <div className="text-5xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <Link to={service.link}>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer">
          {service.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default ServiceCard;