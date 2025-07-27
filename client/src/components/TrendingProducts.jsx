import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function TrendingProducts({ limit = 6 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/products?sortBy=rating&sortOrder=desc&limit=${limit}`)
      .then((res) => {
        // Ensure the response is always an array
        const arr = Array.isArray(res.data) ? res.data : [];
        setProducts(arr.slice(0, limit));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto py-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="min-w-[220px]">
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-5 bg-gray-300 rounded w-2/3 mb-2" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="flex gap-2 mt-auto">
                <div className="h-8 bg-gray-200 rounded w-24" />
                <div className="h-8 bg-gray-200 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span role="img" aria-label="trending">🔥</span> Trending Products
      </h3>
      <div className="flex gap-4 overflow-x-auto">
        {products.map((product) => (
          <div key={product.id} className="min-w-[220px] relative">
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow">
              🔥 Trending
            </span>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}