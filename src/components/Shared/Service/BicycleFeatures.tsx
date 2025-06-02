import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const BicycleFeatures = () => {
  return (
    <Box
      sx={{
        maxWidth: "none",
        padding: "40px",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Typography sx={{ padding: "40px" }} variant="h3" gutterBottom>
        FEATURES CYCLECITY
      </Typography>
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Top Left */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            WIDE RANGE OF BICYCLE
          </Typography>
          <Typography sx={{ fontSize: "17px" }} color="text.secondary">
            Discover an extensive selection of road bikes, hybrid bikes to suit
            every rider's needs.
          </Typography>
        </Grid>
        {/* Top Right */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            WIDE RANGE OF BICYCLE
          </Typography>
          <Typography sx={{ fontSize: "17px" }} color="text.secondary">
            Discover an extensive selection of mountain bikes, and city bikes to
            suit every rider's needs.
          </Typography>
        </Grid>
      </Grid>

      <Box
  sx={{
    my: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    marginX: "auto",
    cursor: "pointer",
    "&:hover img": {
      transform: "scale(1.1) rotate(-5deg)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
    },
    "&:hover": {
      transition: "background-color 0.3s ease",
    },
  }}
>
  <Box
    sx={{
      backgroundColor: "#d4edda",
      borderRadius: "50%",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  >
    <img
      src="/assets/images/bike-fearture.png"
      alt="Bicycle"
      style={{
        transition: "transform 0.4s ease, box-shadow 0.3s ease",
        borderRadius: "50%",
        width: "100%",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      }}
    />
  </Box>
</Box>


      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Bottom Left */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            WIDE RANGE OF BICYCLE
          </Typography>
          <Typography sx={{ fontSize: "17px" }} color="text.secondary">
            Discover an extensive selection of road bikes, e-bikes to suit every
            rider's needs.
          </Typography>
        </Grid>
        {/* Bottom Right */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            WIDE RANGE OF BICYCLE
          </Typography>
          <Typography sx={{ fontSize: "17px" }} color="text.secondary">
            Discover an extensive selection of road bikes, e-bikes to suit every
            rider's needs.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BicycleFeatures;
