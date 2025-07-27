import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";

export default function Category() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products?category=${encodeURIComponent(category)}`)
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {category}s
      </Typography>
      {loading ? (
        <div className="flex justify-center py-12">
          <CircularProgress />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}