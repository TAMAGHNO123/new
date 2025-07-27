import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  // Handle user/admin tab switch
  const handleTabChange = (_, newValue) => setTab(newValue);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (tab === 0) {
      setForm((f) => ({ ...f, [name]: value }));
    } else {
      setAdminForm((f) => ({ ...f, [name]: value }));
    }
  };

  // Handle submit for user signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/auth/signup", form);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle submit for admin login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", {
        email: adminForm.email,
        password: adminForm.password,
      });
      if (res.data.user.role !== "admin") {
        toast.error("Not an administrator account.");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", res.data.token);
      toast.success("Admin login successful!");
      navigate("/admin");
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Admin login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Paper elevation={3} className="p-8 rounded-xl w-full max-w-md">
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="User Signup" />
          <Tab label="Admin Login" />
        </Tabs>
        {tab === 0 ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              className="mt-2"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <Typography className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </Typography>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin} className="flex flex-col gap-5 mt-4">
            <TextField
              label="Admin Email"
              name="email"
              value={adminForm.email}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Admin Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={adminForm.password}
              onChange={handleChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              disabled={loading}
              className="mt-2"
            >
              {loading ? "Logging in..." : "Admin Login"}
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}