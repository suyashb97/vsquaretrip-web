import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpeg";
import QueryModal from "./QueryModal";

const Header = () => {
  const [isHolidayDropdownOpen, setIsHolidayDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const indiaTours = [
    "All India Tour Packages",
    "Buy 1 Get 1 Free India and Around Packages",
    "Domestic Flight Inclusive Tour Packages",
    "Spiritual Journeys",
    "Himachal Tour Packages",
    "Bhutan Tour Packages",
    "Rajasthan Tour Packages",
    "Jammu And Kashmir Tour Packages",
    "Andaman and Nicobar Tour Packages",
    "Karnataka Tour Packages",
    "Uttarakhand Tour Packages",
    "Cordelia Cruises Tour Packages",
    "Nepal Tour Packages",
    "Sri Lanka Tour Packages",
    "Kerala Tour Packages",
    "Sikkim and West Bengal Tour Packages",
  ];

  const internationalTours = [
    "All International Tour Packages",
    "Buy 1 Get 1 FREE International Tour Packages",
    "Escorted Tours by Partners",
    "Europe Tour Packages",
    "New Zealand Tour Packages",
    "Japan Tour Packages",
    "Vietnam Tour Packages",
    "Bali Tour Packages",
    "Simply International Packages",
    "Singapore Malaysia Tour Packages",
    "America Tour Packages",
    "Dubai Tour Packages",
    "Thailand Tour Packages",
    "Australia Tour Packages",
    "Egypt Tour Packages",
    "South Africa Tour Packages",
    "Mauritius Tour Packages",
    "Switzerland Tour Packages",
  ];

  // Function to generate route for specific package types
  const getPackageRoute = (packageName) => {
    // Main categories
    if (packageName === "All India Tour Packages") return "/india-tours";
    if (packageName === "All International Tour Packages")
      return "/international-tours";

    // Specific Indian destination packages
    if (packageName === "Himachal Tour Packages")
      return "/india-tours?category=himachal";
    if (packageName === "Rajasthan Tour Packages")
      return "/india-tours?category=rajasthan";
    if (packageName === "Jammu And Kashmir Tour Packages")
      return "/india-tours?category=kashmir";
    if (packageName === "Andaman and Nicobar Tour Packages")
      return "/india-tours?category=andaman";
    if (packageName === "Kerala Tour Packages")
      return "/india-tours?category=kerala";
    if (packageName === "Sikkim and West Bengal Tour Packages")
      return "/india-tours?category=sikkim";

    // Specific International packages
    if (packageName === "Europe Tour Packages")
      return "/international-tours?category=europe";
    if (packageName === "Dubai Tour Packages")
      return "/international-tours?category=dubai";
    if (packageName === "Thailand Tour Packages")
      return "/international-tours?category=thailand";
    if (packageName === "Australia Tour Packages")
      return "/international-tours?category=australia";
    if (packageName === "Singapore Malaysia Tour Packages")
      return "/international-tours?category=southeast";

    // For other packages, use generic package listing
    return "/all-packages";
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <img src={Logo} alt="logo" className="w-10" />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-8 relative"
              onMouseLeave={() => setIsHolidayDropdownOpen(false)}
            >
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Home
              </Link>

              {/* Holiday Menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsHolidayDropdownOpen(true)}
                onMouseLeave={() => setIsHolidayDropdownOpen(false)}
              >
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center transition duration-300 cursor-pointer">
                  Holiday
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown */}
                {isHolidayDropdownOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-lg shadow-xl z-50
                               grid grid-cols-2 gap-6 px-6 py-4 border border-gray-200"
                    style={{
                      maxHeight: "450px",
                      overflow: "hidden",
                    }}
                  >
                    {/* India List */}
                    <div className="pr-4 border-r border-gray-300">
                      <h3 className="text-gray-900 font-bold text-lg mb-2 pb-2 border-b border-gray-200">
                        India & Around Holidays
                      </h3>
                      <ul
                        className="space-y-1 overflow-y-auto"
                        style={{ maxHeight: "350px", paddingRight: "4px" }}
                      >
                        {indiaTours.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={getPackageRoute(item)}
                              className="block py-2 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition duration-200"
                              onClick={() => setIsHolidayDropdownOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* International List */}
                    <div className="pl-4">
                      <h3 className="text-gray-900 font-bold text-lg mb-2 pb-2 border-b border-gray-200">
                        International Holidays
                      </h3>
                      <ul
                        className="space-y-1 overflow-y-auto"
                        style={{ maxHeight: "350px", paddingRight: "4px" }}
                      >
                        {internationalTours.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              to={getPackageRoute(item)}
                              className="block py-2 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition duration-200"
                              onClick={() => setIsHolidayDropdownOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/hotels"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Hotels
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                About
              </Link>

              <Link
                to="/all-packages"
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                All Packages
              </Link>
            </nav>

            {/* Desktop Query Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsQueryModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 font-medium cursor-pointer"
              >
                Send us a Query
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-slideDown">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-700 font-medium py-2 hover:text-blue-600 transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <details className="bg-gray-50 rounded-md p-3">
                  <summary className="cursor-pointer font-medium text-gray-800">
                    Holiday
                  </summary>

                  <div className="mt-2">
                    <h4 className="font-bold mb-2 text-gray-700">
                      India Holidays
                    </h4>
                    <div className="space-y-1 mb-4">
                      {indiaTours.map((item, idx) => (
                        <Link
                          key={idx}
                          to={getPackageRoute(item)}
                          className="block py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>

                    <h4 className="font-bold mt-4 mb-2 text-gray-700">
                      International Holidays
                    </h4>
                    <div className="space-y-1">
                      {internationalTours.map((item, idx) => (
                        <Link
                          key={idx}
                          to={getPackageRoute(item)}
                          className="block py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </details>

                <Link
                  to="/hotels"
                  className="text-gray-700 font-medium py-2 hover:text-blue-600 transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hotels
                </Link>

                <Link
                  to="/all-packages"
                  className="text-gray-700 font-medium py-2 hover:text-blue-600 transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Packages
                </Link>

                <Link
                  to="/about"
                  className="text-gray-700 font-medium py-2 hover:text-blue-600 transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <button
                  onClick={() => {
                    setIsQueryModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-600 text-white px-4 py-3 rounded-full font-medium hover:bg-blue-700 transition duration-300 mt-2"
                >
                  Send us a Query
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <QueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
      />
    </>
  );
};

export default Header;
