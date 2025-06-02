// src/components/Order/OrderRow/index.tsx
import React, { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Order } from "../../../types/order";
import OrderDetailsModal from "./orderDetailModal";

interface OrderRowProps {
  order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const handleOpenDetailsModal = () => {
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <>
      <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {order.orderId}
        </TableCell>
        <TableCell>{formatDate(order.orderDate)}</TableCell>
        <TableCell align="right">
          {order.totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </TableCell>
        <TableCell>{order.promotionId || "Không áp dụng"}</TableCell>
        <TableCell align="center">
          <IconButton
            color="primary"
            size="small"
            onClick={handleOpenDetailsModal}
            aria-label="view order details"
          >
            <VisibilityIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {order.orderDetails && order.orderDetails.length > 0 && (
        <OrderDetailsModal
          open={openDetailsModal}
          onClose={handleCloseDetailsModal}
          orderDetails={order.orderDetails}
          orderId={order.orderId}
        />
      )}
    </>
  );
};

export default OrderRow;