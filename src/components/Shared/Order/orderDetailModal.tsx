// src/components/Order/OrderDetailsModal/index.tsx
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OrderDetail } from "../../../types/order";

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  orderDetails: OrderDetail[];
  orderId: string;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: '90%', sm: '80%', md: '700px' }, // Responsive width
  bgcolor: "background.paper",
  borderRadius: '8px',
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
  maxHeight: "90vh",
  overflowY: "auto",
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  open,
  onClose,
  orderDetails,
  orderId,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="order-details-modal-title"
      aria-describedby="order-details-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="order-details-modal-title" variant="h6" component="h2" fontWeight="bold">
            Chi tiết đơn hàng: {orderId}
          </Typography>
          <IconButton onClick={onClose} aria-label="close" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }}/>
        {orderDetails && orderDetails.length > 0 ? (
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table size="small" aria-label="order details table">
              <TableHead sx={{ backgroundColor: (theme) => theme.palette.grey[50]}}>
                <TableRow>
                  <TableCell sx={{fontWeight: 'medium'}}>Mã sản phẩm</TableCell>
                  {/* Thêm cột Tên sản phẩm nếu API trả về productName */}
                  {/* <TableCell sx={{fontWeight: 'medium'}}>Tên sản phẩm</TableCell> */}
                  <TableCell align="right" sx={{fontWeight: 'medium'}}>Số lượng</TableCell>
                  <TableCell align="right" sx={{fontWeight: 'medium'}}>Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.map((item) => (
                  <TableRow key={item.orderDetailId} hover>
                    <TableCell component="th" scope="row">
                      {item.productId}
                      {/* {item.productName && ` (${item.productName})`} */}
                    </TableCell>
                    {/* Nếu có productName và muốn hiển thị riêng:
                    <TableCell>{item.productName || 'N/A'}</TableCell>
                    */}
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      {item.subtotal.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Không có chi tiết sản phẩm cho đơn hàng này.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default OrderDetailsModal;