import React, { useEffect, useState } from 'react';
import ProductInformation from "@/components/Shared/ProductInfomation";
import SpecificationsComponent from "@/components/Shared/Specification";
import ReviewsComponent from "@/components/Shared/Review/customerReview";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ProductList from '@/components/Shared/ProductList';
import { useParams } from "react-router-dom";
import useProductDetail from '@/hook/api/useProductDetail';

const ProductDetailTemplate = () => {
  const [value, setValue] = useState(0);
  const { productId } = useParams<{ productId: string }>();
  const { fetchProduct, fetchSpecifications, fetchReviews,
    productInfo, specifications, reviewsData
  } = useProductDetail();

  // Gọi hàm fetchProduct khi component được mount
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
      fetchSpecifications(productId);
      fetchReviews(productId);
    }
  }, [productId]);

  // Xử lý thay đổi tab
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  // Component TabPanel để hiển thị nội dung tương ứng với tab
  const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={2} bgcolor="#f3f8f3">
      <ProductInformation product={productInfo} />
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="product tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '20px',
              marginRight: '8px',
            },
            '& .Mui-selected': {
              backgroundColor: '#000',
              color: '#fff !important',
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab label="Description" id="tab-0" />
          <Tab label="Specifications" id="tab-1" />
          <Tab label="Video" id="tab-2" />
          <Tab label="Customer Reviews" id="tab-3" />
        </Tabs>

        {/* Nội dung của từng tab */}
        <TabPanel value={value} index={0}>
          {productInfo?.product?.description ? (
            <div
              dangerouslySetInnerHTML={{ __html: productInfo.product.description }}
            />
          ) : (
            'No description available.'
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SpecificationsComponent specifications={specifications} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            Video content goes here. (e.g., Embed a YouTube video or a video player.)
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewsComponent reviews={reviewsData} />
        </TabPanel>
      </Box>
      {/* <Box sx={{ width: '100%' }}>
        <ProductList products={sampleProducts} />
      </Box> */}
    </Box>
  );
};

export default ProductDetailTemplate;