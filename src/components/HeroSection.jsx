import { useNavigate } from "react-router-dom";
import { MessageCircle, MapPin, Radio } from "lucide-react";
import WhatsappButton from "../components/WhatsappButton";
import HeroOne from "../assets/images/hero1.png";
import HeroTwo from "../assets/images/hero2.png";
import HeroThree from "../assets/images/hero3.png";
import RightDot from "../assets/images/right-bg-dot.png";
import BottomBg from "../assets/images/hero-bottom.png";
import LinbkBg from "../assets/images/Line-bg.png";
import HeroMainBg from "../assets/images/Hero-Main_bg.png";

const HeroSlider = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{
        backgroundImage: `url(${HeroMainBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Bottom Map Background (hide on mobile) */}
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-80 hidden lg:block">
        <img src={BottomBg} alt="map" className="w-[650px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
        {/* LEFT CONTENT */}
        <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
            <span className="whitespace-nowrap block">Plan Your Perfect</span>
            <span className="block text-[#00A9C1]">GETAWAY</span>
          </h1>

          <p className="text-gray-500 mt-6 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
            From exotic escapes to serene landscapes find curated packages
            designed for every traveler.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 sm:mt-10">
            <button
              onClick={() => navigate("/All-packages")}
              className="bg-[#00BCD4] text-white px-8 sm:px-10 py-4 rounded-xl font-bold shadow-lg cursor-pointer"
            >
              View Packages
            </button>

            <WhatsappButton
              phoneNumber="9109309308"
              message="Hi! I want to chat."
            >
              <button className="flex items-center gap-2 border-2 border-gray-200 bg-white px-6 py-3 rounded-xl font-bold hover:border-green-500 transition cursor-pointer">
                <MessageCircle className="w-5 h-5 text-green-500 fill-green-500" />
                Chat on WhatsApp
              </button>
            </WhatsappButton>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative flex justify-center items-center mt-10 lg:mt-0 scale-[0.85] sm:scale-95 lg:scale-100">
          {/* Decorative backgrounds only desktop */}
          <div className="absolute left-[-15%] top-[-10%] hidden lg:block">
            <img src={RightDot} className="w-[515px] h-[313px]" />
          </div>

          <div className="absolute top-[-1%] right-[5%] hidden lg:block">
            <img src={LinbkBg} className="w-[624px] h-[441.034px]" />
          </div>

          <div className="relative flex items-center gap-4 sm:gap-6">
            {/* LEFT COLUMN */}
            <div
              className="flex flex-col justify-between gap-3 sm:gap-4
                            w-[150px] sm:w-[180px] lg:w-[221px]
                            h-80 sm:h-[380px] lg:h-[454px]"
            >
              <div className="w-full h-[200px] sm:h-60 lg:h-[290px] rounded-t-full overflow-hidden">
                <img src={HeroOne} className="w-full h-full object-cover" />
              </div>

              <div className="w-full h-[110px] sm:h-[130px] lg:h-[148px] rounded-b-full overflow-hidden">
                <img src={HeroTwo} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div
              className="w-[150px] sm:w-[180px] lg:w-[221px]
                            h-80 sm:h-[380px] lg:h-[454px]
                            rounded-full overflow-hidden"
            >
              <img src={HeroThree} className="w-full h-full object-cover" />
            </div>

            {/* Customers Badge */}
            <div
              className="absolute -left-6 sm:-left-14 lg:-left-20 top-[35%]
                            bg-white/90 backdrop-blur px-3 sm:px-4 py-2
                            rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3"
            >
              <Radio className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-500" />
              <div>
                <p className="font-bold text-sm sm:text-lg">5000+</p>
                <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase">
                  Customers
                </p>
              </div>
            </div>

            {/* Top Places Badge */}
            <div
              className="absolute -right-2 sm:-right-10 lg:-right-15 bottom-[8%]
                            bg-white px-3 sm:px-5 py-2 sm:py-3
                            rounded-full shadow-xl flex items-center gap-2"
            >
              <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-500" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">
                Top Places
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
