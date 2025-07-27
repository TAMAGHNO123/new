import React from "react";

export default function ProductSkeleton() {
  return (
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
  );
}