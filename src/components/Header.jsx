import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import QueryModal from "./QueryModal";
import HeroMainBg from "../assets/images/Hero-Main_bg.png";

const Header = () => {
  const [isHolidayDropdownOpen, setIsHolidayDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const activeClass = "text-[#0CB7C9] font-medium transition duration-300";
  const normalClass =
    "text-gray-700 hover:text-[#0CB7C9] font-medium transition duration-300";

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
      <header
        className="sticky top-0 z-50 backdrop-blur-[11px] bg-white/30"
        style={{
          backgroundImage: `url(${HeroMainBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">

            <Link to="/">
              <img src={Logo} alt="logo" className="w-full" />
            </Link>

            {/* DESKTOP */}
                      <div className="flex  gap-20">

            <nav
              className="hidden md:flex items-center gap-12 relative"
              onMouseLeave={() => setIsHolidayDropdownOpen(false)}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Home
              </NavLink>

              <div
                className="relative"
                onMouseEnter={() => setIsHolidayDropdownOpen(true)}
                onMouseLeave={() => setIsHolidayDropdownOpen(false)}
              >
                <span
                  className={normalClass + " cursor-pointer flex items-center"}
                >
                  Holiday
                </span>

                {isHolidayDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-[900px] bg-white rounded-lg shadow-xl z-50 grid grid-cols-2 gap-6 px-6 py-4 border">
                    <div>
                      {indiaTours.map((item, idx) => (
                        <NavLink
                          key={idx}
                          to={getPackageRoute(item)}
                          className={({ isActive }) =>
                            isActive
                              ? "block py-2 text-[#0CB7C9]"
                              : "block py-2 text-gray-700 hover:text-[#0CB7C9]"
                          }
                        >
                          {item}
                        </NavLink>
                      ))}
                    </div>
                    <div>
                      {internationalTours.map((item, idx) => (
                        <NavLink
                          key={idx}
                          to={getPackageRoute(item)}
                          className={({ isActive }) =>
                            isActive
                              ? "block py-2 text-[#0CB7C9]"
                              : "block py-2 text-gray-700 hover:text-[#0CB7C9]"
                          }
                        >
                          {item}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Hotels
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                About
              </NavLink>

              <NavLink
                to="/all-packages"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                All Packages
              </NavLink>
            </nav>

            {/* Desktop Query Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsQueryModalOpen(true)}
                className="bg-[#0CB7C9] text-white px-4 py-2 rounded-full hover:bg-[#0e99a8] transition duration-300 font-medium cursor-pointer"
              >
                Contact Us
              </button>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-10 h-10"
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
        </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slideDown px-4">
            <div className="flex flex-col space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium py-2 transition duration-300 ${
                    isActive
                      ? "text-[#0CB7C9]"
                      : "text-gray-700 hover:text-[#0CB7C9]"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>

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
                      <NavLink
                        key={idx}
                        to={getPackageRoute(item)}
                        className={({ isActive }) =>
                          `block py-2 px-3 rounded transition duration-200 ${
                            isActive
                              ? "text-[#0CB7C9] bg-blue-50"
                              : "text-gray-600 hover:text-[#0CB7C9] hover:bg-blue-50"
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </NavLink>
                    ))}
                  </div>

                  <h4 className="font-bold mt-4 mb-2 text-gray-700">
                    International Holidays
                  </h4>

                  <div className="space-y-1">
                    {internationalTours.map((item, idx) => (
                      <NavLink
                        key={idx}
                        to={getPackageRoute(item)}
                        className={({ isActive }) =>
                          `block py-2 px-3 rounded transition duration-200 ${
                            isActive
                              ? "text-[#0CB7C9] bg-blue-50"
                              : "text-gray-600 hover:text-[#0CB7C9] hover:bg-blue-50"
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </details>

              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  `font-medium py-2 transition duration-300 ${
                    isActive
                      ? "text-[#0CB7C9]"
                      : "text-gray-700 hover:text-[#0CB7C9]"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hotels
              </NavLink>

              <NavLink
                to="/all-packages"
                className={({ isActive }) =>
                  `font-medium py-2 transition duration-300 ${
                    isActive
                      ? "text-[#0CB7C9]"
                      : "text-gray-700 hover:text-[#0CB7C9]"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Packages
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-medium py-2 transition duration-300 ${
                    isActive
                      ? "text-[#0CB7C9]"
                      : "text-gray-700 hover:text-[#0CB7C9]"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>

              <button
                onClick={() => {
                  setIsQueryModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-3 rounded-full font-medium hover:bg-blue-700 transition duration-300 mt-2"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      <QueryModal
        isOpen={isQueryModalOpen}
        onClose={() => setIsQueryModalOpen(false)}
      />
    </>
  );
};

export default Header;
