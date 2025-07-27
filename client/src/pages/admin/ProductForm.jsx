import React, { useState, useEffect } from "react";
import {
  Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, Skeleton, Typography
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  { value: "Car", label: "Car" },
  { value: "Bike", label: "Bike" },
  { value: "Smartphone", label: "Smartphone" },
  { value: "Watch", label: "Watch" },
];

const ranges = [
  { value: "Low", label: "Low Range" },
  { value: "Mid", label: "Mid Range" },
  { value: "High", label: "High Range" },
];

export default function ProductForm({ productId, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    range: "",
    description: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(!!productId);

  // Load product for editing
  useEffect(() => {
    if (productId) {
      setLoading(true);
      axios.get(`/products/${productId}`).then(res => {
        setForm({
          ...res.data,
          year: res.data.year || "",
          price: res.data.price || "",
          range: res.data.range || "",
          image: null,
        });
        setImageUrl(res.data.imageUrls?.[0] || "");
        setLoading(false);
      });
    }
  }, [productId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleImage = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    const res = await axios.post("/products/upload", data, {
      headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + localStorage.getItem("token") }
    });
    setImageUrl(res.data.url);
  };

  const handleReset = () => {
    setForm({
      name: "",
      category: "",
      brand: "",
      model: "",
      year: "",
      price: "",
      range: "",
      description: "",
      image: null,
    });
    setImageUrl("");
  };

 const handleSubmit = async e => {
  e.preventDefault();
  const payload = {
    ...form,
    imageUrls: imageUrl ? [imageUrl] : [],
    price: parseFloat(form.price),
    year: form.year ? parseInt(form.year) : undefined,
    status: "in stock",
  };
  try {
    if (productId) {
      await axios.put(`/products/${productId}`, payload, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      toast.success("Product updated!");
    } else {
      await axios.post("/products", payload, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      toast.success("Product added!");
    }
    if (onSave) onSave();
    handleReset();
  } catch (err) {
    toast.error("Failed to save product");
  }
};

  if (loading) {
    return (
      <Box className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width="100%" height={56} className="my-2" />
        <Skeleton variant="rectangular" width="100%" height={56} className="my-2" />
        <Skeleton variant="rectangular" width="100%" height={56} className="my-2" />
        <Skeleton variant="rectangular" width="100%" height={56} className="my-2" />
        <Skeleton variant="rectangular" width="100%" height={56} className="my-2" />
        <Skeleton variant="rectangular" width="100%" height={56} className="my-2" />
        <Skeleton variant="rectangular" width="100%" height={56} className="my-2" />
        <Skeleton variant="rectangular" width={120} height={80} className="my-2" />
        <Skeleton variant="rectangular" width={180} height={40} className="my-2" />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg flex flex-col gap-4"
    >
      <Typography variant="h5" className="mb-2">{productId ? "Edit Product" : "Add Product"}</Typography>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={form.category} onChange={handleChange} required>
          {categories.map(c => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Range</InputLabel>
        <Select name="range" value={form.range} onChange={handleChange} required>
          {ranges.map(r => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField label="Brand" name="brand" value={form.brand} onChange={handleChange} required />
      <TextField label="Model" name="model" value={form.model} onChange={handleChange} required />
      <TextField label="Year" name="year" value={form.year} onChange={handleChange} type="number" />
      <TextField label="Price" name="price" value={form.price} onChange={handleChange} type="number" required />
      <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={2} />
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
        className="w-fit"
      >
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImage} />
      </Button>
      {imageUrl && <img src={imageUrl} alt="preview" className="w-32 mt-2 rounded shadow" />}
      <Box className="flex gap-2 mt-4">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          className="transition hover:scale-105"
        >
          Save
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
          className="transition hover:scale-105"
        >
          Reset
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="text"
            color="inherit"
            onClick={onCancel}
            className="transition hover:underline"
          >
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
}