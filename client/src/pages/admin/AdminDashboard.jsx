import React, { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Card, CardMedia, CardContent, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  // Fetch products
  const fetchProducts = () => {
    axios.get("/products").then(res => setProducts(res.data));
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async id => {
    await axios.delete(`/products/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setProducts(products.filter(p => p.id !== id));
  };

 return (
    <AdminLayout adminName="Admin">
      <Typography variant="h4" mb={2}>Admin Dashboard</Typography>
      <ProductForm onSave={fetchProducts} />
      <Typography variant="h5" mb={2}>All Products</Typography>
      <ProductTable
        products={products}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onEdit={setEditProduct}
        onDelete={handleDelete}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
    </AdminLayout>
  );
}