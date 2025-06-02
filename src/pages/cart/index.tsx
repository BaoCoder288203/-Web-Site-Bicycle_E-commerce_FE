import React from "react";
import { Box } from "@mui/material";
import CheckoutPage from "@/components/Shared/YourCart/index";

export default function CartTemplate() {
  return (
    <Box sx={{ width:'100%',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
      <CheckoutPage />
    </Box>
  );
}
