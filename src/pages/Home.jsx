import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import BestsellingPackages from '../components/BestsellingPackages';
import TopDestinations from '../components/TopDestinations';
import OtherServices from '../components/OtherServices';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <OtherServices />
      <BestsellingPackages />
      <TopDestinations />
      
    </div>
  );
};

export default Home;