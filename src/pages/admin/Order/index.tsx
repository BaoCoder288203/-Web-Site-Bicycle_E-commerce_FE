import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, Pagination, Box, InputAdornment, IconButton,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useOrder from '@/hook/api/useOrder';
import OrderDetail from '@/pages/admin/OrderDetail';

const OrderList: React.FC = () => {
  const {
    orders, page, totalPages,
    isLoading, fetchOrders, searchOrders, setPage
  } = useOrder();

  const [searchType, setSearchType] = useState<'orderId' | 'userId'>('orderId');
  const [searchInput, setSearchInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      searchOrders(searchType, searchInput.trim());
    }else if(searchInput.trim() === '') {
      fetchOrders();
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    if (searchInput.trim() !== '') {
      searchOrders(searchType, searchInput.trim(), value - 1);
    } else {
      fetchOrders(value - 1);
    }
  };
  

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Search by</InputLabel>
          <Select
            value={searchType}
            label="Search by"
            onChange={(e) => setSearchType(e.target.value as any)}
          >
            <MenuItem value="orderId">Order ID</MenuItem>
            <MenuItem value="userId">User ID</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={`Nhập ${searchType === 'orderId' ? 'OrderId ID' : 'User ID'}`}
          sx={{ flexGrow: 1, '& .MuiInputBase-root': { height: 56 } }}
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">Loading...</TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No orders found</TableCell>
              </TableRow>
            ) : (
              orders.map((order, index) => (
                <TableRow key={order.orderId}>
                  <TableCell>{page * 10 + index + 1}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                  <TableCell>{order.totalPrice.toLocaleString()}₫</TableCell>
                  <TableCell>
                    <IconButton onClick={() => setSelectedOrder(order)}>
                      🔍
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} />
        </Box>
      )}      

      {selectedOrder && (
        <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </Box>
  );
};

export default OrderList;