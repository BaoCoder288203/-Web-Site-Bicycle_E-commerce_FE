import React from "react";
import ProductList from "@/components/Shared/ProductList/index";
import AdvertisementSection from "@/components/Shared/Advertisement/index";
import Service from "@/components/Shared/Service/index";
import { Box } from "@mui/material";
import News from "@/components/Shared/News";
import NewsDetail from "@/components/Shared/NewsDetail";

export default function NewsDetailsTemplate() {
  return (
    <Box sx={{ width:'100%',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
      <NewsDetail />
    </Box>
  );
}
