import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@mui/material";

const banners = [
  {
    image: "/bike1.avif",
    title: "Latest Bikes",
    subtitle: "Explore our new bike arrivals",
  },
  {
    image: "/car1.avif",
    title: "Top Cars",
    subtitle: "Best deals on cars",
  },
  {
    image: "/watch1.jpeg",
    title: "Trending Watches",
    subtitle: "Luxury & Smartwatches",
  },
  {
    image: "/sm1.jpeg",
    title: "Smartphones",
    subtitle: "Latest smartphones in stock",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: false,
  pauseOnHover: true,
};

export default function HeroCarousel() {
  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-lg mb-8 relative"
      style={{ marginTop: "12px" }} // Moved box higher up
    >
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div key={idx} className="relative h-[320px] md:h-[460px]">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-contain"
              style={{ objectPosition: "center", transform: "scale(0.85)" }}
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow mb-2">
                {banner.title}
              </h2>
              <p className="text-lg md:text-2xl text-white drop-shadow">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}