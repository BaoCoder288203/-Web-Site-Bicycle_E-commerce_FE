import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProductList from "@/components/Shared/ProductList/index";
import FilterSidebar from "@/components/Shared/SideBar/index";
import { Box, Grid, CircularProgress, Button, Typography, Pagination } from "@mui/material";
import { getAllProduct, getProductWithPage } from "@/services/Product.service";
import { ProductResponse } from "@/types/product";
import { getValueFromLocalStorage } from "@/utils/localStorage";

export default function ShopTemplate() {
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const accessToken = getValueFromLocalStorage("accessToken");

  useEffect(() => {
    console.log("Check in Shop: ", accessToken);



    fetchProducts(page);

  }, [page, accessToken]);

  const fetchProducts = async (pageNo = 0) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductWithPage({
        pageNo: pageNo,
        pageSize: 8,
        sortBy: "name",
        sortDirection: "ASC"
      });

      console.log("Full response:", response);

      if (response && response.data && response.data.content) {

        const rawProducts = Array.isArray(response.data.content) ? response.data.content : [];
        
        // Biến đổi dữ liệu để chỉ lấy các trường cần thiết
        const simplifiedProducts = rawProducts.map(item => {
          // Lấy thông tin từ product
          const product = item.product || {};
          
          // Lấy thông tin giá từ inventory (giả sử lấy phần tử đầu tiên nếu có nhiều)
          const inventory = Array.isArray(item.inventory) && item.inventory.length > 0 
            ? item.inventory[0] 
            : {};
            
          // Tạo đối tượng sản phẩm đơn giản hóa
          return {
            id: product.productId,
            name: product.name,
            image: inventory.imageUrls[0],
            price: product.price || 0,
            priceReduced: product.priceReduced,           // Lưu lại thông tin gốc nếu cần thiết cho các bộ lọc
            originalData: product,
            productId: product.productId
          };
        });

        setFilteredProducts(simplifiedProducts);

        if (response.data.page) {
          setTotalPages(response.data.page.totalPages || 1);
        }
      } else {
        setFilteredProducts([]);
        console.error("API trả về success = false", response);
      }
    } catch (error: any) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      setError(error.message || "Đã xảy ra lỗi không mong muốn khi tải dữ liệu.");
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px", color: "error.main" }}>
        <Typography variant="h5">Oops! Something went wrong.</Typography>
        <Typography>{error}</Typography>
        <Button variant="contained" onClick={() => fetchProducts(page)} sx={{ mt: 2 }}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
      <Grid container spacing={4} sx={{ maxWidth: "1400px" }}>
        {/* Sidebar Filter */}
        <Grid item xs={12} md={3}>
          <FilterSidebar products={filteredProducts} setFilteredProducts={setFilteredProducts} />
        </Grid>

        {/* Product List */}
        <Grid item xs={12} md={9}>
          <ProductList products={filteredProducts} />
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={handlePageChange}
              color="primary"
              sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}