import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import PackageDetails from "../pages/PackageDetails";
import About from "../pages/About";
import Hotels from "../pages/Hotels";
import AllPackages from "../pages/AllPackages";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import IndiaTours from "../pages/IndiaTours";
import InternationalTours from "../pages/InternationalTours";
import HotelDetails from "../components/HotelDetails";

const AppRoutes = () => {
  return (
    <Router>
      {/* change route then start page at a top */}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-packages" element={<AllPackages />} />
        <Route path="/india-tours" element={<IndiaTours />} />
        <Route path="/international-tours" element={<InternationalTours />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
