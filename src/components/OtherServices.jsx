import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../data/mockData';

const OtherServices = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Other Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our additional travel services to make your journey seamless</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServices;