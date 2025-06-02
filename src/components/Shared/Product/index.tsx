import React, { useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button, Stack, Box } from "@mui/material";
import { styled } from "@mui/system";
import VanillaTilt from "vanilla-tilt";
import { ProductResponse } from "../../../types/product";

interface ProductComponentProps {
  product: ProductResponse;
}

const ProductCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "none",
  margin: "auto",
  boxShadow: "none",
  position: "relative",
  border: "1px solid #e0e0e0",
  backgroundColor: "#fff",
  transition: "transform 0.3s ease",
  "&:hover": {
    zIndex: 10,
  }
}));

const NewBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundColor: "#EB453B",
  left: "-9px",
  color: "white",
  padding: "15px 25px 15px 25px",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "uppercase",
  clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
}));

const PriceStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(0.5),
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: "#757575",
  fontSize: "16px",
}));

const DiscountPrice = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "red",
  fontSize: "18px",
}));

const BikeImage = styled("img")(({ theme }) => ({
  height: 200,
  width: "100%",
  objectFit: "contain",
  padding: "16px",
}));


const ProductComponent: React.FC<ProductComponentProps> = ({
  product
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 4,
        speed: 700,
        glare: true,
        "max-glare": 0.2,
        scale: 1.03,
      });
    }
    console.log("Check prop: ", product);

    return () => {
      if (cardRef.current && (cardRef.current as any).vanillaTilt) {
        (cardRef.current as any).vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <ProductCard ref={cardRef}>
      <NewBadge>NEW</NewBadge>
      <BikeImage src={product?.image} alt={`${product?.name} Bike`} />
      <CardContent sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {product.name}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ paddingTop: 1 }}
        >
          <PriceStack>
            <OriginalPrice>${product.price?.toFixed(2)} USD</OriginalPrice>
            <DiscountPrice>${product.priceReduced?.toFixed(2)} USD</DiscountPrice>
          </PriceStack>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#ffffff",
              color: "black",
              border: "1px solid black",
              textTransform: "uppercase",
              fontWeight: "bold",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "#EF675F",
                color: "white",
                borderColor: "#EF675F",
              },
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </ProductCard>
  );
};

export default ProductComponent;
