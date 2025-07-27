import HeroCarousel from "../components/HeroCarousel";
import CategoryTiles from "../components/CategoryTiles";
import CategorySection from "../components/CategorySection";
import { Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="max-w-8xl mx-auto p-0">
      <div className="flex items-center justify-between mt-4 mb-2 px-2">
        {/* Clickable TurboTrenz Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            fontFamily="Montserrat, Roboto, sans-serif"
            color="primary"
            sx={{
              letterSpacing: 3,
              textShadow: "2px 2px 8px rgba(0,0,0,0.18)",
              userSelect: "none",
              transition: "color 0.2s",
              "&:hover": { color: "#1565c0" }
            }}
            className="cursor-pointer"
          >
            TurboTrenz
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          {!isLoggedIn && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/signup")}
              sx={{ fontWeight: "bold", borderRadius: 2 }}
            >
              Sign Up
            </Button>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => navigate("/profile")}
              startIcon={<AccountCircleIcon />}
              sx={{ fontWeight: "bold", borderRadius: 2 }}
            >
              Profile
            </Button>
          )}
        </div>
      </div>
      <HeroCarousel />
      <CategoryTiles />
      <CategorySection category="Car" title="Cars" />
      <CategorySection category="Bike" title="Bikes" />
      <CategorySection category="Smartphone" title="Smartphones" />
      <CategorySection category="Watch" title="Watches" />
    </div>
  );
};

export default Home;