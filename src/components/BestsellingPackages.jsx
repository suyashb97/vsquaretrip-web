import React, { useState, useRef, useEffect } from "react";
import PackageCard from "./PackageCard";
import { packagesData } from "../data/mockData";
import { Link } from "react-router-dom";

const BestsellingPackages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => {
    if (currentIndex < packagesData.length - itemsPerView) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to start if at end
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop to end if at start
      setCurrentIndex(packagesData.length - itemsPerView);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index * itemsPerView);
  };

  const canGoNext = currentIndex < packagesData.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  // Auto slide every 5 seconds
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [currentIndex, itemsPerView]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Our Bestselling Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular travel packages curated for an
            unforgettable experience
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 rounded-full p-2 md:p-3 shadow-lg transition duration-300 group ${
              canGoPrev
                ? "bg-white hover:bg-gray-100"
                : "bg-gray-100 cursor-not-allowed opacity-50"
            }`}
            disabled={!canGoPrev && packagesData.length <= itemsPerView}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          {/* Carousel Content */}
          <div ref={carouselRef} className="overflow-hidden px-2">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6 lg:gap-8"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {packagesData.map((packageItem, index) => (
                <div
                  key={packageItem.id}
                  className="shrink-0 animate-fadeInUp"
                  style={{
                    width: `${100 / itemsPerView}%`,
                    animationDelay: `${index * 0.1}s`,
                    minWidth: 0, // Prevents flex items from overflowing
                  }}
                >
                  <PackageCard packageItem={packageItem} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 rounded-full p-2 md:p-3 shadow-lg transition duration-300 group cursor-pointer ${
              canGoNext || packagesData.length > itemsPerView
                ? "bg-white hover:bg-gray-100"
                : "bg-gray-100 cursor-not-allowed opacity-50"
            }`}
            disabled={!canGoNext && packagesData.length <= itemsPerView}
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        {packagesData.length > itemsPerView && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
              length: Math.ceil(packagesData.length / itemsPerView),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition duration-300 ${
                  index === Math.floor(currentIndex / itemsPerView)
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile Swipe Instructions */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              ></path>
            </svg>
            Swipe to navigate
          </p>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-packages"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 cursor-pointer"
          >
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestsellingPackages;
