import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  Avatar,
  Select,
  MenuItem,
  LinearProgress,
  Divider,
  Modal, TextField
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from 'dayjs';
import { useParams } from "react-router-dom";
import useProductDetail  from "@/hook/api/useProductDetail";

interface Review {
  reviewId: string;
  userId: string;
  productId: string;
  content: string;
  rating: number;
  createdAt: string | null;
  updatedAt: string | null;
}

interface Props {
  reviews: Review[];
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

const ReviewContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
}));

const RatingBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: "#e0e0e0",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#000",
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  flex: 1,
}));

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#000",
  },
});

const ReviewsComponent: React.FC<Props> = ({ reviews }) => {
    console.log("ReviewsComponent rendered with reviews:", reviews);
    const {handleSendReview, fetchReviews, reviewsData} = useProductDetail();
    const [newReviews, setNewReviews] = useState<Review[]>(reviews || []);
    const [sortOption, setSortOption] = useState<"newest" | "highest" | "lowest">("newest");
    const { accessToken, userId } = localStorage;
    const { productId } = useParams<{ productId: string }>();

    useEffect(() => {
      setNewReviews(reviewsData);
    }, [reviewsData]);

    useEffect(() => {
      setNewReviews(reviews);
    }, [reviews]);


    const sortedReviews = useMemo(() => {
      const cloned = [...newReviews];
      switch (sortOption) {
        case "highest":
          return cloned.sort((a, b) => b.rating - a.rating);
        case "lowest":
          return cloned.sort((a, b) => a.rating - b.rating);
        case "newest":
        default:
          return cloned.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
      }
    }, [newReviews, sortOption]);
    

    const [formReview, setFormReview] = useState({
      userId,
      productId,
      content: "",
      rating: 5,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const calculateRatingDistribution = (reviews: Review[]): RatingDistribution[] => {
      const total = reviews.length;
      const ratingCountMap = new Map<number, number>();
      // Khởi tạo count = 0 cho các mức từ 1 đến 5
      for (let i = 1; i <= 5; i++) {
        ratingCountMap.set(i, 0);
      }
      // Đếm số lượng mỗi loại rating
      for (const review of reviews) {
        ratingCountMap.set(review.rating, (ratingCountMap.get(review.rating) || 0) + 1);
      }
      // Chuyển thành mảng và tính phần trăm
      const distribution: RatingDistribution[] = Array.from(ratingCountMap.entries()).map(
        ([rating, count]) => ({
          rating,
          count,
          percentage: total > 0 ? (count / total) * 100 : 0,
        })
      );
      // Sắp xếp từ 5 sao xuống 1 sao
      return distribution.sort((a, b) => b.rating - a.rating);
    };

    const averageRating = newReviews?.length
      ? newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length : 0;

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormReview((prev) => ({
        ...prev,
        [name]: name === "rating" ? Number(value) : value,
      }));
    };

    const handleSubmitReview = async () => {
      if (!formReview.content || formReview.rating < 1 || formReview.rating > 5) {
        alert("Please fill in all fields correctly.");
        return;
      }
      try {
        await handleSendReview(formReview);
        console.log("Review submitted:", formReview);

        console.log("Fetching updated reviews...");
        await fetchReviews(productId); // Gọi lại fetchReviews để cập nhật reviewsData
        console.log("Reviews updated successfully!");
        setNewReviews(reviewsData); // Cập nhật newReviews với reviewsData mới
        handleCloseModal();
      } catch (error) {
        console.error("Error in handleSubmitReview:", error);
        alert("Failed to submit review. Please try again.");
      }
    };

  return (
    <ReviewContainer>
      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Customer Reviews
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          mb: 4,
          "& > *": {
            flex: 1,
            px: 3,
          },
        }}
      >
        <Box
          sx={{
            borderRight: "1px solid #eee",
            textAlign: "center",
            padding: "20px",
            flex: "0 0 250px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <StyledRating value={averageRating} precision={0.5} readOnly />
            <Typography component="div" sx={{ fontSize: "0.875rem" }}>
              {averageRating.toFixed(1)} out of 5
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Based on {newReviews?.length} reviews
          </Typography>
        </Box>

        <Box sx={{ flex: "0 0 400px", borderRight: "1px solid #eee" }}>
          {calculateRatingDistribution(newReviews).map((item) => (
            <Box
              key={item.rating}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <StyledRating value={item.rating} size="small" readOnly />
              <RatingBar variant="determinate" value={item.percentage} />
              <Typography variant="body2" sx={{ minWidth: 30 }}>
                {item.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "white",
            borderRadius: "50px",
            padding: "8px 16px",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mr: 1,
              color: "#666",
            }}
          >
            Sort by:
          </Typography>
          <Select
            size="small"
            defaultValue="newest"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            sx={{
              minWidth: 100,
              "& .MuiSelect-select": {
                padding: "0",
                paddingRight: "24px",
                border: "none",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  borderRadius: "10px",
                  mt: 1,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                },
              },
            }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="highest">Highest Rating</MenuItem>
            <MenuItem value="lowest">Lowest Rating</MenuItem>
          </Select>
        </Box>

        {accessToken && <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginLeft: 20,
            alignItems: "center",
            borderRight: "1px solid #eee",
            flex: "0 0 200px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "20px",
              borderColor: "#000",
              color: "#000",
              "&:hover": {
                borderColor: "#000",
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
            onClick={handleOpenModal}
          >
            ADD REVIEW
          </Button>
        </Box>
        }
      </Box>

      {/* Modal for adding a review */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add a Review
          </Typography>
          <TextField
            fullWidth
            label="Rating (1-5)"
            name="rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={formReview.rating}
            onChange={handleInputChange}
            onKeyDown={(e) => e.preventDefault()}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            multiline
            rows={4}
            value={formReview.content}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmitReview}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {sortedReviews.map((review) => (
        <Box
          key={review.reviewId}
          sx={{
            mb: 3,
            pb: 3,
            borderBottom: "1px solid #eee"
          }}
        >
          {/* Dòng hiển thị sao và thời gian */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1
            }}
          >
            <StyledRating value={review.rating} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              {dayjs(review.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          </Box>

          {/* Dòng hiển thị tên người dùng */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            {/* <Avatar src={review.avatar} alt={review.userId} sx={{ mr: 1 }} /> */}
            <Typography fontWeight="bold">
              {review.userId.slice(0, 13) + '*'.repeat(Math.max(0, review.userId.length - 8))}
            </Typography>
          </Box>

          {/* Nội dung đánh giá */}
          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            {review.content}
          </Typography>
        </Box>
      ))}
    </ReviewContainer>
  );
};

export default ReviewsComponent;
