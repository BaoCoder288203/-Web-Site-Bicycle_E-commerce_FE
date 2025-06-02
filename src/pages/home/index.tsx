import React, { useState, useEffect } from "react";
import ProductList from "@/components/Shared/ProductList/index";
import AdvertisementSection from "@/components/Shared/Advertisement/index";
import LandingSection from "@/components/Shared/Landing/index";
import { Box, CircularProgress, Button, Typography, Pagination } from "@mui/material";
import { getAllProduct } from "@/services/Product.service";
import { ProductResponse } from "@/types/product";
import { getValueFromLocalStorage } from "@/utils/localStorage";
import { Navigate } from "react-router-dom";

export default function HomeTemplate() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const accessToken = getValueFromLocalStorage("accessToken");

  useEffect(()=>{
    console.log("Check in Home: ",accessToken);
    
    if(accessToken == ""){
      <Navigate to={("/auth/login")} replace />;
    }else {
      fetchHomeDate(page);
    }
  },[page])

  const fetchHomeDate = async (pageNo = 0) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProduct(pageNo);
      console.log("Full response:", JSON.stringify(response));

      if (response && response.content) {
        setFeaturedProducts(response.content);
        if (response.page) {
          setTotalPages(response.page.totalPages);
        }
      } else {
        setFeaturedProducts([]);
        console.error("API trả về success = false", response);
      }
    } catch (error: any) {
      console.error("Lỗi khi lấy dữ liệu trang chủ:", error);
      setError(error.message || "Đã xảy ra lỗi không mong muốn khi tải dữ liệu.");
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeDate(page);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '50px', color: 'error.main' }}>
        <Typography variant="h5">Oops! Something went wrong.</Typography>
        <Typography>{error}</Typography>
        <Button variant="contained" onClick={() => fetchHomeDate(page)} sx={{ mt: 2 }}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <AdvertisementSection />
      <ProductList products={featuredProducts} />
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          color="primary"
          sx={{ mt: 4, mb: 4 }}
        />
      )}
      <LandingSection />
    </Box>
  );
}
