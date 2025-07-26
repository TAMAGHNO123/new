import React from "react";

const banners = [
  { image: "/banner1.jpg", title: "Hot Deals on Cars" },
  { image: "/banner2.jpg", title: "Latest Smartphones" },
  { image: "/banner3.jpg", title: "Trending Watches" },
];

export default function HeroCarousel() {
  // For demo, just show first banner. Replace with a real carousel for production.
  return (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-8 rounded-lg overflow-hidden">
      <img src={banners[0].image} alt={banners[0].title} className="object-cover w-full h-full" />
      <div className="absolute text-white text-3xl font-bold bg-black/50 px-6 py-2 rounded">{banners[0].title}</div>
    </div>
  );
}