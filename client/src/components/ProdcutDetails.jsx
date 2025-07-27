import React from "react";
import ImageZoom from "./ImageZoom";
// import SpecsTabs from "./SpecsTabs"; // Uncomment when implemented
// import RelatedItems from "./RelatedItems"; // Uncomment when implemented

export default function ProductDetails({ product }) {
  if (!product) return <div>Loading...</div>;

  const {
    name,
    brand,
    model,
    price,
    description,
    imageUrls = [],
    status,
    year,
    // Add more specs as needed
  } = product;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Images */}
      <div>
        <ImageZoom images={imageUrls} />
      </div>
      {/* Right: Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="text-gray-600">
          <span className="font-semibold">Brand:</span> {brand}
        </div>
        <div className="text-gray-600">
          <span className="font-semibold">Model:</span> {model}
        </div>
        {year && (
          <div className="text-gray-600">
            <span className="font-semibold">Year:</span> {year}
          </div>
        )}
        <div className="text-xl font-semibold text-blue-600">₹{price}</div>
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              status === "in stock"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status === "in stock" ? "In Stock" : "Sold Out"}
          </span>
        </div>
        <p className="text-gray-700">{description}</p>
        {/* Add to Cart / Buy Now */}
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={status !== "in stock"}
          >
            Add to Cart
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            disabled={status !== "in stock"}
          >
            Buy Now
          </button>
        </div>
        {/* Technical Specs Tabs */}
        {/* <SpecsTabs specs={product} /> */}
      </div>
      {/* Related Items */}
      {/* <div className="col-span-2 mt-8">
        <RelatedItems category={product.category} excludeId={product.id} />
      </div> */}
    </div>
  );
}