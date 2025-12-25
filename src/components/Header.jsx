import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import QueryModal from "./QueryModal";
import HeroMainBg from "../assets/images/Hero-Main_bg.png";

// Holiday images
import IndiaHolidayImg from "../assets/images/india-holiday.png";
import InternationalHolidayImg from "../assets/images/international-holiday.png";

const Header = () => {
  const location = useLocation();

  const [isHolidayDropdownOpen, setIsHolidayDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileHolidayOpen, setIsMobileHolidayOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const activeClass = "text-[#0CB7C9] font-medium transition duration-300";
  const normalClass =
    "text-gray-700 hover:text-[#0CB7C9] font-medium transition duration-300";

  // ✅ Holiday Active Condition
  const isHolidayActive =
    location.pathname.startsWith("/india-tours") ||
    location.pathname.startsWith("/international-tours");

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
            {/* Logo */}
            <Link to="/">
              <img src={Logo} alt="logo" className="max-w-[140px]" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Home
              </NavLink>

              {/* Desktop Holiday Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsHolidayDropdownOpen(true)}
                onMouseLeave={() => setIsHolidayDropdownOpen(false)}
              >
                <span
                  className={`cursor-pointer font-medium transition duration-300 ${
                    isHolidayActive
                      ? "text-[#0CB7C9]"
                      : "text-gray-700 hover:text-[#0CB7C9]"
                  }`}
                >
                  Holiday
                </span>

                {isHolidayDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-xl shadow-xl z-50 flex flex-col gap-4 p-4">
                    {/* India & Around */}
                    <NavLink
                      to="/india-tours"
                      className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-lg p-3 transition ${
                          isActive
                            ? "bg-cyan-50"
                            : "hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setIsHolidayDropdownOpen(false)}
                    >
                      <img
                        src={IndiaHolidayImg}
                        alt="India Holidays"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="font-semibold text-gray-800 group-hover:text-[#0CB7C9]">
                        India & Around Holidays
                      </div>
                    </NavLink>

                    {/* International */}
                    <NavLink
                      to="/international-tours"
                      className={({ isActive }) =>
                        `group flex items-center gap-4 rounded-lg p-3 transition ${
                          isActive
                            ? "bg-cyan-50"
                            : "hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setIsHolidayDropdownOpen(false)}
                    >
                      <img
                        src={InternationalHolidayImg}
                        alt="International Holidays"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="font-semibold text-gray-800 group-hover:text-[#0CB7C9]">
                        International Holidays
                      </div>
                    </NavLink>
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

              <button
                onClick={() => setIsQueryModalOpen(true)}
                className="bg-[#0CB7C9] text-white px-5 py-2 rounded-full"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-9 h-9"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-6">
            <div className="flex flex-col gap-4">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </NavLink>

              {/* Mobile Holiday Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileHolidayOpen(!isMobileHolidayOpen)}
                  className={`w-full flex justify-between items-center font-medium py-2 ${
                    isHolidayActive ? "text-[#0CB7C9]" : "text-gray-700"
                  }`}
                >
                  Holiday
                  <span>{isMobileHolidayOpen ? "−" : "+"}</span>
                </button>

                {isMobileHolidayOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-3">
                    <NavLink
                      to="/india-tours"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileHolidayOpen(false);
                      }}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#0CB7C9] font-medium"
                          : "text-gray-600"
                      }
                    >
                      India & Around Holidays
                    </NavLink>

                    <NavLink
                      to="/international-tours"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileHolidayOpen(false);
                      }}
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#0CB7C9] font-medium"
                          : "text-gray-600"
                      }
                    >
                      International Holidays
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink to="/hotels" onClick={() => setIsMobileMenuOpen(false)}>
                Hotels
              </NavLink>

              <NavLink
                to="/all-packages"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Packages
              </NavLink>

              <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </NavLink>

              <button
                onClick={() => {
                  setIsQueryModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#0CB7C9] text-white py-3 rounded-full"
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
