import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Typewriter } from "react-simple-typewriter";
import {
  FaLaptopCode,
  FaServer,
  FaMobileAlt,
  FaPaintBrush,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  { name: "Frontend Developer", icon: <FaLaptopCode /> },
  { name: "Backend Developer", icon: <FaServer /> },
  { name: "Data Science", icon: <SiDatabricks /> },
  { name: "Graphic Designer", icon: <FaPaintBrush /> },
  { name: "FullStack Developer", icon: <FaLaptopCode /> },
  { name: "Mobile Developer", icon: <FaMobileAlt /> },
  { name: "UI/UX Designer", icon: <MdDesignServices /> },
];

const CategoryCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 2500 }));

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandeler=(query)=>{
      dispatch(setSearchedQuery(query));
      navigate("/browse")
    }

  return (
    <section className="w-full py-20 bg-gradient-to-b from-indigo-200 via-blue-200 to-purple-200 text-center relative overflow-hidden">
      {/* Floating gradient circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-purple-400/40 to-indigo-400/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-gradient-to-r from-pink-400/40 to-blue-400/40 rounded-full blur-3xl"></div>

      {/* Heading */}
      <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-xl">
        Explore Job Categories
      </h2>

      {/* Subtitle with typewriter */}
      <p className="mt-6 text-lg md:text-xl text-slate-700 font-medium">
        <Typewriter
          words={["Find the right role that matches your skills 🚀"]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </p>

      {/* Carousel */}
      <div className="mt-16 relative">
        <Carousel
          plugins={[autoplay.current]}
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.play()}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="flex gap-4 px-6">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="flex-shrink-0 sm:basis-1/2 md:basis-1/3 flex justify-center"
              >
                <button
                onClick={()=>searchJobHandeler(cat.name)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full 
                  bg-white/30 backdrop-blur-md border border-white/40 
                  text-slate-900 font-semibold shadow-lg 
                  hover:shadow-xl hover:scale-105 transition-transform duration-300
                  whitespace-nowrap text-sm tracking-wide cursor-pointer"
                >
                  <span className="text-indigo-600">{cat.icon}</span>
                  {cat.name}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons */}
          <CarouselPrevious className="shadow-lg bg-white/40 backdrop-blur-md hover:bg-white/60 text-indigo-700 rounded-full hover:scale-110 transition" />
          <CarouselNext className="shadow-lg bg-white/40 backdrop-blur-md hover:bg-white/60 text-indigo-700 rounded-full hover:scale-110 transition" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
