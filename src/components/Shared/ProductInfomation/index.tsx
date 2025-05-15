import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  TextField,
  Grid,
  CardMedia,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "@/hook/api/useCart";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/index";

const ProductInformation = ({ product }) => {
  if (!product) return null;

  // Lọc các inventory có số lượng > 0
  const availableInventories =
    product.inventory?.filter((inv) => inv.quantity > 0) || [];

  // Danh sách màu từ các inventory còn hàng
  const colors = availableInventories.map((inv) => inv.color);

  // State: chọn inventory đầu tiên còn hàng làm mặc định
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  // Lấy inventory tương ứng với màu đang chọn
  const selectedInventory = availableInventories.find(
    (inv) => inv.color === selectedColor
  );
  const images = selectedInventory?.imageUrls || [];

  const [mainImage, setMainImage] = useState(images[0] || "");

  // Khi người dùng chọn màu
  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    const inv = availableInventories.find((i) => i.color === color);
    setMainImage(inv?.imageUrls?.[0] || "");
  };

  const handleImageChange = (image) => setMainImage(image);
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const { addCartItem } = useCart();
  const { cart } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = () => {
      console.log(
          `Added to cart: ${product.product.productId}, Name: ${product.product.name}, Color: ${selectedColor}, Quantity: ${quantity}`
      );
      const cartItem = {
          productId: product.product.productId,
          name: product.product.name,
          selectedColor,
          quantity,
          cartId: cart.cartId, 
      };

      addCartItem(cartItem);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: "auto" }}>
      <Grid container spacing={4}>
        {/* Ảnh chính */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={mainImage}
            alt={product.name}
            sx={{ width: "100%", height: "auto", borderRadius: 2 }}
          />
          <Box
            sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "center" }}
          >
            {images.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                image={image}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 1,
                  cursor: "pointer",
                  border: mainImage === image ? "2px solid #1976d2" : "none",
                }}
                onClick={() => handleImageChange(image)}
              />
            ))}
          </Box>
        </Grid>

        {/* Thông tin sản phẩm */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
            {product.product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Category: {product.category?.name || "Không rõ danh mục"}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {product.product.priceReduced.toLocaleString()} đ
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, mb: 2, fontWeight: "bold" }}
          >
            Supplier:
          </Typography>
          {product.supplier?.name || "UNKNOWN"}

          {/* Màu sắc */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            Color
          </Typography>
          <RadioGroup row value={selectedColor} onChange={handleColorChange}>
            {colors.map((color) => (
              <FormControlLabel
                key={color}
                value={color}
                control={
                  <Radio
                    sx={{
                      color: color.toLowerCase(),
                      "&.Mui-checked": { color: color.toLowerCase() },
                    }}
                  />
                }
                label=""
              />
            ))}
          </RadioGroup>

          {/* Số lượng */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            Quantity:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handleDecrease}>
              <Remove />
            </IconButton>
            <TextField
              value={quantity}
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ width: 60, mx: 1 }}
              disabled
            />
            <IconButton onClick={handleIncrease}>
              <Add />
            </IconButton>
          </Box>

          {/* Nút hành động */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ flexGrow: 1 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              sx={{ flexGrow: 1 }}
              component={Link}
              to={`/payment/${product.product.productId}/${selectedColor}/${quantity}`}
            >
              Buy Now
            </Button>
          </Box>

          {/* Thông tin thanh toán và giao hàng */}
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Guaranteed Safe Checkout:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
            <img
              src="/assets/images/logo_VISA.png"
              width="40"
              height="24"
              alt="Visa"
            />
            <img
              src="/assets/images/logo_MOMO.png"
              width="30"
              height="30"
              alt="MoMo"
            />
            <img
              src="/assets/images/logo_ZALOPAY.png"
              width="45"
              height="14"
              alt="ZaloPay"
            />
            <img
              src="/assets/images/logo_COD.png"
              width="30"
              height="30"
              alt="COD"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Orders ship within 5 to 10 business days
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInformation;
