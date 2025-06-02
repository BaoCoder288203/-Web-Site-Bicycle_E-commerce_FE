import React from "react";
import ProductList from "@/components/Shared/ProductList/index";
import AdvertisementSection from "@/components/Shared/Advertisement/index";
import Service from "@/components/Shared/Service/index";
import { Box } from "@mui/material";
import Payment from "@/components/Shared/Payment/index";
import AboutComponent from "@/components/Shared/About/index";

export default function AboutTemplate() {
  return (
    <Box sx={{ width:'100%',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
      <AboutComponent />
    </Box>
  );
}
