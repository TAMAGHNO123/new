import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  isAdmin = false,
}) {
  const navigate = useNavigate();
  if (!product) return null;

  const {
    id,
    name,
    price,
    category,
    brand,
    description,
    imageUrls = [],
  } = product;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition relative">
      <img
        src={imageUrls[0] || "/placeholder.png"}
        alt={name}
        className="w-full h-40 object-contain rounded mb-3 bg-gray-50"
      />
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <h2 className="text-lg font-semibold truncate">{name}</h2>
        <div className="text-blue-600 font-bold text-xl mb-1">₹{price}</div>
        <div className="text-gray-600 text-sm mb-2">
          {brand || description?.slice(0, 40) + (description?.length > 40 ? "..." : "")}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
          onClick={() => navigate(`/products/${id}`)}
        >
          View Details
        </button>
        {isAdmin && (
          <>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600 transition"
              onClick={() => onEdit && onEdit(product)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition"
              onClick={() => onDelete && onDelete(id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}