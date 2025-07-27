import React from "react";
import { Link } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import WatchIcon from "@mui/icons-material/Watch";

const categories = [
  { name: "Cars", icon: <DirectionsCarIcon sx={{ fontSize: 48, color: "#1976d2" }} />, value: "Car" },
  { name: "Bikes", icon: <TwoWheelerIcon sx={{ fontSize: 48, color: "#e53935" }} />, value: "Bike" },
  { name: "Smartphones", icon: <SmartphoneIcon sx={{ fontSize: 48, color: "#fb8c00" }} />, value: "Smartphone" },
  { name: "Watches", icon: <WatchIcon sx={{ fontSize: 48, color: "#43a047" }} />, value: "Watch" },
];

export default function CategoryTiles() {
  return (
    <div className="flex justify-center gap-8 my-8">
      {categories.map((cat) => (
        <Link to={`/category/${cat.value}`} key={cat.value}>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            {cat.icon}
            <span className="mt-2 font-semibold">{cat.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}