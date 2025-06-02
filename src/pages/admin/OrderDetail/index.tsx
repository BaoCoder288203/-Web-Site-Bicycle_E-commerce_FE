import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography
} from '@mui/material';

interface OrderDetailItem {
  productId: string;
  color: string;
  quantity: number;
  subtotal: number;
}

interface OrderDetailProps {
  order: {
    orderId: string;
    totalPrice: number;
    orderDetails: OrderDetailItem[];
    promotionId?: string;
  };
  onClose: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onClose }) => {
  // Tính tổng tiền trước giảm giá
  const calculateTotalBeforeDiscount = (): number => {
    return order.orderDetails.reduce((total, item) => total + item.subtotal, 0);
  };

  // Tính tiền giảm giá
  const calculateDiscount = (): number => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    return totalBeforeDiscount - order.totalPrice;
  };

  return (
    <Dialog open={!!order} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order detail</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">
          Order ID: {order.orderId}
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell>{detail.productId}</TableCell>
                  <TableCell>{detail.color === null ? 'NaN' : detail.color}</TableCell>
                  <TableCell>{detail.quantity}</TableCell>
                  <TableCell>{(detail.subtotal / detail.quantity).toLocaleString()}₫</TableCell>
                  <TableCell>{detail.subtotal.toLocaleString()}₫</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">
            Total price: {calculateTotalBeforeDiscount().toLocaleString()}₫
          </Typography>
          <Typography variant="h6" color="error">
            Discount: {calculateDiscount().toLocaleString()}₫
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Pay: {order.totalPrice.toLocaleString()}₫
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetail;