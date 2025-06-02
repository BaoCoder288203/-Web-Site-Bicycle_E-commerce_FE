import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const imageData = [
  { id: 1, src: "/assets/images/bike-example.jpeg", label: "BIKES" },
  { id: 2, src: "/assets/images/bike-repair-example.jpeg", label: "REPAIR" },
  { id: 3, src: "/assets/images/bike-gear-example.jpeg", label: "GEAR" },
  {
    id: 4,
    src: "/assets/images/bike-cycling-glasses-example.jpeg",
    label: "CYCLING GLASSES",
  },
  {
    id: 5,
    src: "/assets/images/bike-e-vents-example.jpeg",
    label: "BIKE E-VENTS",
  },
  {
    id: 6,
    src: "/assets/images/bike-e-vents-example.jpeg",
    label: "BIKE E-VENTS",
  },
];

const ImageCard = ({ src, label }) => {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    alert(`Navigating to ${label} section!`);
  };

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      sx={{
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        cursor: "pointer",
        borderRadius: "12px",
        boxShadow: hovered ? 6 : 1,
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={src}
        alt={label}
        sx={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          backgroundColor: "white",
          color: "#000",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {label}
      </Box>
    </Card>
  );
};

const ImageGrid = () => {
  return (
    <Box sx={{width:'97%',mt:6, padding: "20px" }}>
      <Grid container spacing={2} justifyContent="center">
        {imageData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ImageCard src={item.src} label={item.label} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGrid;
