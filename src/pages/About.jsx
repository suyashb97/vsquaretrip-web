import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamMember from '../components/TeamMember';
import { Link } from 'react-router-dom';
import QueryModal from '../components/QueryModal';

const About = () => {
    const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "20+ years in travel industry, passionate about creating memorable experiences",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Expert in travel logistics and customer experience management",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Travel Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Specializes in luxury travel and bespoke itineraries",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "Customer Experience Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      bio: "Dedicated to ensuring every customer has a perfect journey",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#"
      }
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Destinations" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "We believe in honest pricing and clear communication with our customers."
    },
    {
      icon: "❤️",
      title: "Customer First",
      description: "Every decision we make is focused on providing the best experience for our travelers."
    },
    {
      icon: "🌍",
      title: "Sustainable Travel",
      description: "We promote eco-friendly travel practices and support local communities."
    },
    {
      icon: "✨",
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service and operations."
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TravelEase</h1>
            <p className="text-xl mb-8">Crafting unforgettable travel experiences since 2008</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">From Passion to Profession</h3>
                  <p className="text-gray-600 mb-4">
                    Founded in 2008 by travel enthusiasts Rajesh Kumar and Priya Sharma, TravelEase began as a small travel agency with a big vision: to make luxury travel accessible to everyone while maintaining the highest standards of service.
                  </p>
                  <p className="text-gray-600 mb-4">
                    What started as a two-person operation has now grown into one of India's leading travel companies, serving over 10,000 satisfied customers across the globe. Our journey has been guided by a simple philosophy: every trip should be extraordinary.
                  </p>
                  <p className="text-gray-600">
                    Today, we're proud to have a team of 50+ travel experts who share our passion for exploration and commitment to excellence. From honeymooners to family vacations, corporate retreats to solo adventures, we've helped travelers create memories that last a lifetime.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Our Team"
                    className="rounded-xl shadow-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="text-3xl font-bold">15+</div>
                    <div className="text-sm">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The passionate people behind your perfect vacations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TravelEase?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">What sets us apart from other travel companies</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Expert Travel Consultants</h3>
                        <p className="text-gray-600">Our team includes certified travel experts with extensive destination knowledge.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">Best Price Guarantee</h3>
                        <p className="text-gray-600">We offer the most competitive prices with no hidden charges or fees.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">24/7 Support</h3>
                        <p className="text-gray-600">Round-the-clock assistance during your travel, wherever you are in the world.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-linear-to-br from-blue-500 to-purple-600 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-5xl mb-4">🤝</div>
                    <h3 className="text-2xl font-bold mb-4">Your Trust, Our Commitment</h3>
                    <p className="opacity-90">We're dedicated to making your travel dreams come true with personalized service and attention to detail.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-xl mb-8 opacity-90">Let us help you plan the perfect trip tailored to your preferences</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/all-packages"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300 transform hover:scale-105 cursor-pointer"
              >
                Explore Packages
              </Link>
              <button onClick={() => setIsQueryModalOpen(true)} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <QueryModal isOpen={isQueryModalOpen} onClose={() => setIsQueryModalOpen(false)} />
    </>
  );
};

export default About;