import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import ProductComponent from "../Product/index";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { ProductResponse } from "@/types/product";

interface ProductListProps {
  products: ProductResponse[];
}

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "95%",
  padding: "50px 0",
  backgroundColor: "#f5f5f5",
});

const MoreShopButton = styled(Button)({
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "20px",
  padding: "8px 16px",
  textTransform: "none",
  fontWeight: "normal",
  color: "#000",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box
      sx={{
        width: "100%",
        pb: "5vw",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderContainer>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          NEW ARRIVALS
        </Typography>
        <MoreShopButton variant="outlined">More Shop</MoreShopButton>
      </HeaderContainer>
      <Grid container justifyContent="center" sx={{ padding: "0 32px" }}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Link style={{ textDecoration: 'none' }} to={`/product/detail/${product.productId}`}>
              <ProductComponent product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList; 