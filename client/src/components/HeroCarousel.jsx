import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";

const banners = [
  { image: "/xuv", title: "Hot Deals on Cars" },
  { image: "/banner2.jpg", title: "Latest Smartphones" },
  { image: "/banner3.jpg", title: "Trending Watches" },
];

export default function HeroCarousel() {
  // For demo, just show first banner. Replace with a real carousel for production.
  return (
    <Card sx={{ position: "relative", height: 280, mb: 4, borderRadius: 3, overflow: "hidden" }}>
      <CardMedia
        component="img"
        image={banners[0].image}
        alt={banners[0].title}
        sx={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 24,
          left: 24,
          bgcolor: "rgba(0,0,0,0.5)",
          px: 3,
          py: 1,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" color="white" fontWeight="bold">
          {banners[0].title}
        </Typography>
      </Box>
    </Card>
  );
}