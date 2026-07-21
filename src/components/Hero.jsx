import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/doctor-hero.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-[650px] w-full bg-cover bg-center sm:min-h-[700px] lg:min-h-screen"
      style={{
        backgroundImage: `url(${doctorImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[650px] items-center justify-center px-4 py-20 sm:min-h-[700px] sm:px-6 lg:min-h-screen">
        <div className="w-full max-w-4xl text-center">

          {/* Small Heading */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-white/90 sm:mb-6 sm:text-sm sm:tracking-[5px] md:tracking-[8px]">
            Hospital Appointment Management System
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Your Health
            <br />
            <span className="text-blue-400">
              Benefits
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 sm:mt-6 sm:text-lg sm:leading-8">
            Book appointments with trusted doctors and receive professional
            healthcare services anytime, anywhere.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
            {/* Book Appointment */}
            <button
              type="button"
              onClick={() => navigate("/booking")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-300 hover:bg-blue-700 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              Book Appointment
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Learn More */}
            <button
              type="button"
              onClick={() => navigate("/about")}
              className="w-full rounded-lg border border-white/80 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-blue-600 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              Learn More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;