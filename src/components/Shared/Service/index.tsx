import React from 'react';
import ImageGrid from './ImageCard';
import BicycleFeatures from './BicycleFeatures';
import { Box } from "@mui/material";

function Service() {
  return (
    <Box sx={{ width:'100%',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
      <ImageGrid />
      <BicycleFeatures />
    </Box>
  );
}

export default Service;