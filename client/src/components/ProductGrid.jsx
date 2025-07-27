import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [], isAdmin = false, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-12">
          No products found.
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default ProductGrid;