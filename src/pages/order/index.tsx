// src/pages/user/OrderHistoryPage/index.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import { Order, SpringPage } from "../../types/order";
import { getOrdersByUserId } from "../../services/Order.service";
import OrderRow from "../../components/Shared/Order";


type OrderSortBy = "orderDate" | "totalPrice";
type OrderSortDirection = "asc" | "desc";

interface HeadCell {
  id: OrderSortBy;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "orderDate", numeric: false, label: "Ngày đặt" },
  { id: "totalPrice", numeric: true, label: "Tổng tiền" },
];

const OrderHistoryPage: React.FC = () => {
  const [ordersPage, setOrdersPage] = useState<SpringPage<Order> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [sortBy, setSortBy] = useState<OrderSortBy>("orderDate");
  const [sortDirection, setSortDirection] = useState<OrderSortDirection>("desc");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log("Fetching orders with params:", { currentPage, rowsPerPage, sortBy, sortDirection });
    const receivedOrdersPage = await getOrdersByUserId(currentPage, rowsPerPage, sortBy, sortDirection);
    console.log("Response from service in order page", receivedOrdersPage);

    if (receivedOrdersPage && receivedOrdersPage.success && receivedOrdersPage.data && Array.isArray(receivedOrdersPage.data.content)) {
      setOrdersPage(receivedOrdersPage.data);
      console.log(receivedOrdersPage.data);
    } else if (receivedOrdersPage?.message === "Request failed with status code 400") {
      setOrdersPage({ 
        content: [], 
        totalPages: 0, 
        totalElements: 0, 
        size: rowsPerPage, 
        number: currentPage,
        pageable: {
          sort: { sorted: false, unsorted: true, empty: true },
          pageNumber: currentPage,
          pageSize: rowsPerPage,
          offset: 0,
          paged: true,
          unpaged: false
        },
        last: true,
        sort: { sorted: false, unsorted: true, empty: true },
        numberOfElements: 0,
        first: true,
        empty: true
      });
      setError(null);
    } else {
      setError(receivedOrdersPage?.message || "Lấy danh sách đơn hàng thất bại hoặc dữ liệu không đúng định dạng.");
      setOrdersPage(null);
    }
    setLoading(false);
  }, [currentPage, rowsPerPage, sortBy, sortDirection]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage - 1);
  };

  const handleSortRequest = (property: OrderSortBy) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);
    setCurrentPage(0);
  };

  if (loading && !ordersPage) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !loading) { 
    return (
      <Container sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const orders = ordersPage?.content || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Lịch sử đơn hàng
      </Typography>
      {loading && <CircularProgress size={24} sx={{ mb: 2, display: 'block', margin: 'auto' }} />}
      {ordersPage?.content.length === 0 && (
        <Typography sx={{ textAlign: 'center', mt: 3 }}>Bạn chưa có đơn hàng nào.</Typography>
      )}

      {orders.length > 0 && (
        <>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table aria-label="order history table">
              <TableHead>
                <TableRow sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Mã đơn hàng</TableCell>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                      sortDirection={sortBy === headCell.id ? sortDirection : false}
                      sx={{ fontWeight: 'bold' }}
                    >
                      <TableSortLabel
                        active={sortBy === headCell.id}
                        direction={sortBy === headCell.id ? sortDirection : "asc"}
                        onClick={() => handleSortRequest(headCell.id)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: 'bold' }}>Mã khuyến mãi</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Chi tiết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <OrderRow key={order.orderId} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {ordersPage && ordersPage.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
              <Pagination
                count={ordersPage.totalPages}
                page={currentPage + 1}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default OrderHistoryPage;