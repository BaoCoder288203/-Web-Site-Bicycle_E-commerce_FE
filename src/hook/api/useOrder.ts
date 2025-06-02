import { useEffect, useState } from 'react';
import {
  getOrdersByPage,
  getOrdersByUserId_DB,
  getOrderById
} from '@/services/Order.service';

interface OrderDetailType {
  createdAt: string;
  updatedAt: string | null;
  orderDetailId: string;
  productId: string;
  quantity: number;
  subtotal: number;
}

interface OrderType {
  orderId: string;
  userId: string;
  orderDate: string;
  totalPrice: number;
  orderDetails: OrderDetailType[];
  promotionId?: string;
}

function useOrder() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async (page: number = 0) => {
    setIsLoading(true);
    try {
      const res = await getOrdersByPage(page);
      if (res.data && res.data.content) {
        setOrders(res.data.content);
        setPage(res.data.number);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchOrders = async (type: 'orderId' | 'userId', value: string, page: number = 0) => {
    if (!value) return;
    setIsLoading(true);
    try {
      if (type === 'orderId') {
        const res = await getOrderById(value);
        setOrders(res.data ? [res.data] : []);
        setTotalPages(1);
        setPage(0);
      } else {
        const res = await getOrdersByUserId_DB(value, 0);
        if (res.data && res.data.content) {
          setOrders(res.data.content);
          setTotalPages(res.data.totalPages || 1);
          setPage(res.data.number || 0);
        } else {
          setOrders([]);
        }
      }
    } catch (error) {
      console.error('Search failed:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orders,
    page,
    totalPages,
    isLoading,
    fetchOrders,
    searchOrders,
    setPage,
  };
}

export default useOrder;
