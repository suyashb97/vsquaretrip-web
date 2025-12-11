import React, { useEffect, useState, useRef } from "react";
import { destinationsData } from "../data/mockData";
import { useNavigate } from "react-router-dom";


const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Clear interval on unmount
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinationsData.length);
    }, 4000);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? destinationsData.length - 1 : prev - 1
    );
    resetAutoSlide();
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % destinationsData.length);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  };

  const item = destinationsData[index];

  const handleViewPackages = () => {
    // Navigate to package details page
    navigate(`/package/${item.id}`);
  };

  return (
    <section className="relative h-[50vh] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4 max-w-3xl animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl">
            Explore {item.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-3 mb-8">
            Discover {item.name} with {item.tours}+ curated tours.
          </p>
          <button
          onClick={handleViewPackages}
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all cursor-pointer"
        >
          View Packages
        </button>
        </div>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black p-3 rounded-full backdrop-blur cursor-pointer z-20"
      >
        ❮
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-black p-3 rounded-full backdrop-blur cursor-pointer z-20"
      >
        ❯
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
        {destinationsData.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
