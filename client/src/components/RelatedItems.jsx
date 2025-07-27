import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function RelatedItems({ category, excludeId }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    axios
      .get(`/products?category=${encodeURIComponent(category)}`)
      .then((res) => {
        // Exclude the current product by id
        const filtered = res.data.filter((p) => p.id !== excludeId);
        setRelated(filtered.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, [category, excludeId]);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto py-4">
        {Array.from({ length: 4 }).map((_, i) => (
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

  if (!related.length) return null;

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold mb-4">Related Products</h3>
      <div className="flex gap-4 overflow-x-auto">
        {related.map((product) => (
          <div key={product.id} className="min-w-[220px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}