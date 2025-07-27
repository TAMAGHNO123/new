import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 220;

const navLinks = [
  { text: "Products", icon: <InventoryIcon />, to: "/admin" },
  { text: "Add Product", icon: <AddBoxIcon />, to: "/admin#add" },
  { text: "Orders", icon: <ListAltIcon />, to: "/admin/orders" },
];

export default function AdminLayout({ children, adminName = "Admin" }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <Box className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", background: "#fff" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
        <List>
          {navLinks.map(link => (
            <ListItemButton key={link.text} component={Link} to={link.to}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box className="flex-1 flex flex-col" sx={{ ml: `${drawerWidth}px` }}>
        {/* Top AppBar */}
        <AppBar position="static" color="default" elevation={1} sx={{ zIndex: 1201 }}>
          <Toolbar className="flex justify-between">
            <Box className="flex items-center gap-2">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { sm: "none" } }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Dashboard
              </Typography>
            </Box>
            <Box className="flex items-center gap-4">
              <Typography variant="body1" color="textSecondary">
                {adminName}
              </Typography>
              <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Page content */}
        <Box className="p-6 flex-1">{children}</Box>
      </Box>
    </Box>
  );
}