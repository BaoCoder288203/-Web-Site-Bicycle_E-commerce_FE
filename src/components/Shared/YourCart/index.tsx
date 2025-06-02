import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  IconButton,
  LinearProgress,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VNPayLogo from '/assets/images/logo-vnpay.png';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import EditAddressModal from "../EditAddress";
import useProduct from "@/hook/api/useProduct";
import ProductList from "@/components/Shared/ProductList/index";
import { ProductResponse } from "@/types/product";
import { getAllProduct } from "@/services/Product.service";
import useCart from "@/hook/api/useCart";
import { getValueFromLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "notistack";
import { createPayment, getPaymentStatus } from "@/services/Payment.service";
import { createOrder } from "@/services/Order.service";
interface CartItem {
  cartItemId: string;
  productName: string;
  imageUrl: string;
  color: string;
  quantity: number;
  price: number;
}

export default function CheckoutPage() {
  const cartSlice = useSelector((state: RootState) => state.cartSlice);
  const userSlice = useSelector((state: RootState) => state.userSlice);
  const productSlice = useSelector((state: RootState) => state.productSlice);
  const { updateQuantityCartItem, removeCartItem, fetchCartByUserId, removeCartItems } = useCart();
  const { me } = userSlice;
  const { cart } = cartSlice;
  const { promotions } = productSlice;
  const { handleFetchPromotion } = useProduct();
  const cartItems = cart.items;
  const { enqueueSnackbar } = useSnackbar();
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const giftWrapFee = 50000;
  const freeShippingThreshold = 1000000;
  const [open, setOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const userId = getValueFromLocalStorage("userId").replace(/^"|"$/g, '');
  const navigate = useNavigate();

  useEffect(() => {
      fetchCartByUserId(userId);
  }, [userId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectItem = (item: CartItem) => {
    setSelectedItems(prev => {
      if (prev.some(selectedItem => selectedItem.cartItemId === item.cartItemId)) {
        return prev.filter(selectedItem => selectedItem.cartItemId !== item.cartItemId);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems || []);
    }
  };

  const handlePayment = async () => {
    if (selectedItems.length === 0) {
      enqueueSnackbar("Please select at least one item to pay", { variant: 'warning' });
      return;
    }
    
    // Xóa trạng thái đã xử lý payment trước đó
    sessionStorage.removeItem('processedPayment');
    
    const products = selectedItems.map((item: any) => ({
      productId: item.productId,
      color: item.color.toUpperCase(),
      quantity: item.quantity
    }));
    const dataCreateOrder = {
      promotionId: selectedPromotion,
      products: products,
    }
    const order = await createOrder(dataCreateOrder)
    
    const data = {
      orderId: order.orderId,
      userId: order.userId,
      amount: calculateTotal(),
      currency: "VND", 
      paymentMethod: "VN_PAY",
      orderInfo: `Thanh toan don hang ${order.orderId}`,
      language: "vn",
    }
    const response = await createPayment(data);
    
    if (response && response.paymentUrl) {
      // Lưu thông tin cần thiết vào localStorage để xử lý sau khi thanh toán
      localStorage.setItem('pendingPayment', JSON.stringify({
        selectedItems,
        orderId: order.orderId
      }));
      // Chuyển hướng đến trang thanh toán VNPay
      window.location.href = response.paymentUrl;
    } else {
      enqueueSnackbar("Có lỗi xảy ra khi tạo thanh toán", { variant: 'error' });
    }
  };

  const fetchHomeData = async (pageNo = 0) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProduct(pageNo);
      if (response && response.content) {
        setFeaturedProducts(response.content);
        if (response.page) {
          setTotalPages(response.page.totalPages);
        }
      } else {
        setFeaturedProducts([]);
        setError("Không có sản phẩm đề xuất nào.");
      }
    } catch (error: any) {
      setError(error.message || "Đã xảy ra lỗi khi tải dữ liệu.");
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cartItems) return 0;
    const baseTotal = selectedItems.reduce(
      (total: number, item: any) => total + Number(item.price) * Number(item.quantity),
      0
    );
    let total = isGiftWrapped ? baseTotal + giftWrapFee : baseTotal;
    if (selectedPromotion) {
      const promotion = promotions.find((p: any) => p.id === selectedPromotion);
      if (promotion && promotion.discount) {
        total *= (100 - promotion.discount) / 100; // Áp dụng phần trăm giảm giá
      }
    }
    return total;
  };

  useEffect(() => {
    handleFetchPromotion();
    fetchHomeData(page);
  }, [page]);

  const currentAmount = calculateTotal();
  const progress = Math.min((currentAmount / freeShippingThreshold) * 100, 100);
  const amountLeft = Math.max(freeShippingThreshold - currentAmount, 0).toFixed(0);

  const handleQuantityChange = (cartItemId: string, newQuantity: number) => {
    updateQuantityCartItem(cartItemId, Math.max(1, newQuantity));
  };

  const handleDelete = (cartItemId: string) => {
    removeCartItem(cartItemId);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  useEffect(() => {
    const handlePaymentResult = async () => {
      const pendingPayment = localStorage.getItem('pendingPayment');
      if (pendingPayment) {
        const { selectedItems } = JSON.parse(pendingPayment);
        try {
          setIsProcessingPayment(true);
          // Kiểm tra kết quả thanh toán từ URL parameters
          const urlParams = new URLSearchParams(window.location.search);
          const vnpParams: { [key: string]: string } = {};
          
          // Collect all VNPay parameters
          urlParams.forEach((value, key) => {
            if (key.startsWith('vnp_')) {
              vnpParams[key] = value;
            }
          });

          // Check if we're on the callback URL or cart page with payment params
          if (Object.keys(vnpParams).length > 0) {
            // Call the payment status API with the VNPay parameters
            const response = await getPaymentStatus(vnpParams);
            console.log("check response payment status: ", response);
            
            if (response?.vnpResponseCode === "00") {
              // Remove cart items
              const cartItemIds = selectedItems.map((item: any) => item.cartItemId);
              await removeCartItems(cartItemIds);
              setSelectedItems([]);
              
              enqueueSnackbar("Thanh toán thành công!", { variant: 'success' });
              // Navigate to cart page
              navigate('/home/cart', { replace: true });
            } else {
              enqueueSnackbar("Thanh toán thất bại. Vui lòng thử lại!", { variant: 'error' });
              navigate('/home/cart', { replace: true });
            }
          }
        } catch (error) {
          console.error('Payment processing error:', error);
          enqueueSnackbar("Có lỗi xảy ra khi xử lý kết quả thanh toán", { variant: 'error' });
          navigate('/home/cart', { replace: true });
        } finally {
          setIsProcessingPayment(false);
          // Xóa thông tin pending payment
          localStorage.removeItem('pendingPayment');
        }
      }
    };

    handlePaymentResult();
  }, [navigate]);

  return (
    <Box p={4}>
      {isProcessingPayment && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Đang xử lý thanh toán...</Typography>
          </Box>
        </Box>
      )}
      <Grid container spacing={4}>
        {/* Left side: Cart */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" mb={2}>
            Giỏ hàng
          </Typography>
          {cartItems && cartItems.length === 0 ? (
            <Typography>Giỏ hàng của bạn đang trống</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.length === cartItems?.length}
                        indeterminate={selectedItems.length > 0 && selectedItems.length < (cartItems?.length || 0)}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Tổng</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems && cartItems.map((item: CartItem) => (
                    <TableRow key={item.cartItemId}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.some(selectedItem => selectedItem.cartItemId === item.cartItemId)}
                          onChange={() => handleSelectItem(item)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img src={item.imageUrl} alt={item.productName} width={80} />
                          <Box ml={2}>
                            <Typography>{item.productName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.color} / {item.quantity}
                            </Typography>
                            <Typography color="error">
                              {item.price.toLocaleString()} VND
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Button
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Typography mx={2}>{item.quantity}</Typography>
                          <Button
                            onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {(Number(item.price) * Number(item.quantity)).toLocaleString()} VND
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(item.cartItemId)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox
              checked={isGiftWrapped}
              onChange={(e) => setIsGiftWrapped(e.target.checked)}
            />
            <Typography variant="body2">
              Vui lòng gói quà cẩn thận. Phí chỉ {giftWrapFee.toLocaleString()} VND.
            </Typography>
          </Box>

          <hr style={{ margin: "20px 0" }} />

          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Có thể bạn sẽ thích
          </Typography>
          <Box mt={2}>
            {loading ? (
              <Typography>Đang tải sản phẩm...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : featuredProducts.length === 0 ? (
              <Typography>Không có sản phẩm đề xuất nào.</Typography>
            ) : (
              <>
                <ProductList products={featuredProducts} />
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
                  />
                )}
              </>
            )}
          </Box>
        </Grid>

        {/* Right side: Summary */}
        <Grid item xs={12} md={4}>
          <Box sx={{ width: "100%", px: 2, py: 2 }}>
            <Box sx={{ position: "relative", height: 10, borderRadius: 5 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ef4444",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "-11px",
                  left: `${progress}%`,
                  transform: "translateX(-50%)",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  border: "2px solid #ef4444",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocalShippingOutlinedIcon sx={{ color: "#ef4444" }} />
              </Box>
            </Box>
            <Typography variant="body2" align="center" mt={1}>
              Mua thêm <strong>{amountLeft.toLocaleString()} VND</strong> để được{" "}
              <Typography component="span" sx={{ color: "#ef4444", fontWeight: "bold" }}>
                MIỄN PHÍ VẬN CHUYỂN!
              </Typography>
            </Typography>
          </Box>

          <Typography mt={3} fontWeight="bold">
            Thông tin địa chỉ
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              fullWidth
              id="diaChi"
              label="Địa chỉ"
              variant="outlined"
              margin="normal"
              value={
                me.address
                  ? `${me.address.fullAddress || ""}, ${me.address.ward || ""}, ${me.address.district || ""}, ${me.address.city || ""}, ${me.address.country || ""}`
                  : ""
              }
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, -9px) scale(0.75)",
                  color: "black",
                },
                "& .MuiOutlinedInput-root": {
                  "& input": {
                    paddingY: "26px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleOpen}
              sx={{ mt: 1, height: "56px" }}
            >
              Sửa
            </Button>
          </Box>
          <EditAddressModal handleClose={handleClose} open={open} />

          <Typography mt={3} fontWeight="bold">
            Chọn khuyến mãi
          </Typography>
          <Select
            fullWidth
            value={selectedPromotion}
            onChange={(e) => setSelectedPromotion(e.target.value)}
            displayEmpty
            sx={{ mt: 1 }}
          >
            <MenuItem value="">
              <em>Không áp dụng khuyến mãi</em>
            </MenuItem>
            {promotions.map((promo: any) => (
              <MenuItem key={promo.promotionId} value={promo.promotionId}>
                {promo.name} ({promo.reducePercent}% giảm)
              </MenuItem>
            ))}
          </Select>
          {selectedPromotion && (
            <Typography color="success.main" mt={1}>
              Đã áp dụng khuyến mãi! Giảm {promotions.find((p: any) => p.promotionId === selectedPromotion)?.reducePercent}% tổng giá.
            </Typography>
          )}

          <Typography mt={3} fontWeight="bold">
            Ghi chú đơn hàng
          </Typography>
          <TextField
            label="Thêm ghi chú"
            multiline
            rows={3}
            fullWidth
            sx={{ mt: 1 }}
          />

          <Typography mt={3} fontWeight="bold">
            Tổng cộng: {calculateTotal().toLocaleString()} VND
          </Typography>
          {selectedPromotion && (
            <Typography variant="body2" color="text.secondary">
              (Đã giảm {promotions.find((p: any) => p.promotionId === selectedPromotion)?.reducePercent}% từ khuyến mãi)
            </Typography>
          )}

          <Box display="flex" alignItems="center" mt={2}>
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <Typography variant="body2">
              Tôi đồng ý với Điều khoản & Điều kiện
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#005ea6",
              padding: "16.5px 14px",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
            onClick={handlePayment}
          >
            <img
              src={VNPayLogo}
              alt="VNPay Logo"
              style={{ width: 25, marginRight: 8 }}
            />
            Thanh toán VNPay
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}