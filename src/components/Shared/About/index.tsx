import { Box, Typography, Button, Grid } from "@mui/material";
import {
  Gift,
  Truck,
  Shield,
  Award,
  ThumbsUp,
  Lightbulb,
  Users,
  Globe,
  Handshake,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Benefit Item Component
const BenefitItem = ({ icon, title, description }) => (
  <Box sx={{ display: "flex", gap: "15px", px: 2, my: 7 }}>
    <Box sx={{ mb: 2, color: "#000", fontSize: 40 }}>{icon}</Box>
    <Box>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "15px", color: "#666" }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

// Core Value Item Component
const CoreValueItem = ({ icon, title, description }) => (
  <Box
    sx={{
      bgcolor: "#fff",
      p: 5,
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "transform 0.3s ease, background-color 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        bgcolor: "#E9FFA4",
      },
    }}
  >
    <Box sx={{ mb: 2, color: "#000", fontSize: 40 }}>{icon}</Box>
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: "#666" }}>
      {description}
    </Typography>
  </Box>
);

// Team Member Item Component
const TeamMemberItem = ({ imageSrc, name, role }) => (
  <Box sx={{ px: 1.5 }}>
    <img
      src={imageSrc}
      alt={name}
      style={{ width: "100%", height: "auto", borderRadius: "8px", mb: 1 }}
    />
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      {name}
    </Typography>
    <Typography variant="body2" sx={{ color: "#666" }}>
      {role}
    </Typography>
  </Box>
);

const AboutComponent = () => {
  // Team member placeholder images (replace with actual paths)
  const teamMembers = [
    {
      name: "Vũ Quốc Huy",
      role: "Leader",
      imageSrc: "public/assets/images/person1.png",
    },
    {
      name: "Nguyễn Trọng Bảo",
      role: "Design UI FrontEnd",
      imageSrc: "public/assets/images/person2.png",
    },
    {
      name: "Lương Tấn Đạt",
      role: "BackEnd",
      imageSrc: "public/assets/images/person3.png",
    },
    {
      name: "Phạm Lê Thanh Nhiệt",
      role: "BackEnd",
      imageSrc: "public/assets/images/person4.png",
    },
  ];

  // Slider settings for continuous, smooth sliding
  const sliderSettings = {
    infinite: true,
    speed: 4000, // Duration of the transition (in milliseconds) for smooth scrolling
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Immediate transition for continuous scrolling
    cssEase: "linear", // Linear easing for constant speed
    pauseOnHover: false, // Prevent pausing on hover
    pauseOnDotsHover: false, // Prevent pausing on dots hover
    pauseOnFocus: false, // Prevent pausing on focus
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        mt: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fff",
      }}
    >
      <Grid sx={{ width: "96%" }} container spacing={2}>
        {/* Left Image and Overlay */}
        <Grid item xs={12} md={8}>
          <Box sx={{ position: "relative" }}>
            <img
              src="public/assets/images/banner-1.png"
              alt="Person on Electric Bike"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                bgcolor: "#fff",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: "#00C4B4",
                  textAlign: "center",
                }}
              >
                ABOUT CYCLECITY
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  width: "45%",
                  fontWeight: "bold",
                  marginTop: "3vw",
                  mb: 12,
                }}
              >
                Meet the Team Behind Your Ride.
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#ff4d4f",
                      color: "#fff",
                      borderRadius: "50px",
                      textTransform: "none",
                      px: 5,
                      fontSize: "18px",
                      "&:hover": { bgcolor: "#e64446" },
                    }}
                  >
                    Shop Bikes
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      color: "#000",
                      textTransform: "none",
                      fontWeight: "medium",
                      fontSize: '15px',
                      textDecoration: 'underline',
                      mx: 2
                    }}
                  >
                    About Us
                  </Button>
                </Box>
                <Box
                  sx={{
                    width: "350px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#000", fontSize: "12px" }}
                  >
                    At CycleCity, we’re passionate about delivering high-quality
                    bikes and exceptional service. Our mission is to inspire
                    every rider with the perfect bike.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Image and Description */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "relative" }}>
            <img
              src="public/assets/images/banner-2.png"
              alt="Cyclist in Gear"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Benefits Section */}
      <Box sx={{ width: "96%", py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <BenefitItem
              icon={<Gift size={40} />}
              title="Exclusive Customer Discounts"
              description="Unlock special deals and savings just for you. Subscribe now to receive exclusive customer discounts."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BenefitItem
              icon={<Truck size={40} />}
              title="Free Shipping Threshold"
              description="Enjoy free shipping on all orders over $50. Shop now and save on your favorite bikes and accessories."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BenefitItem
              icon={<Shield size={40} />}
              title="Extended Warranty Coverage"
              description="Extend the life of your bike with our comprehensive warranty coverage. Enjoy peace of mind and ride."
            />
          </Grid>
        </Grid>
      </Box>

      {/* Core Values Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F5F9F3",
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}
        >
          Core Values
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <CoreValueItem
              icon={<Award size={40} />}
              title="Quality"
              description="We are committed to offering top-notch bicycles and gear, ensuring every ride is smooth and reliable."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CoreValueItem
              icon={<ThumbsUp size={40} />}
              title="Customer Satisfaction"
              description="Your happiness is our priority. We strive to provide exceptional service and support to meet your cycling needs."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CoreValueItem
              icon={<Lightbulb size={40} />}
              title="Innovation"
              description="We embrace the latest technologies and trends to bring you cutting-edge products that enhance your experience."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CoreValueItem
              icon={<Users size={40} />}
              title="Community"
              description="We foster a strong cycling community, organizing events and activities that bring enthusiasts together."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CoreValueItem
              icon={<Globe size={40} />}
              title="Sustainability"
              description="We promote eco-friendly practices and products to contribute to a greener planet."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CoreValueItem
              icon={<Handshake size={40} />}
              title="Integrity"
              description="We conduct our business with honesty and transparency, building trust with our customers and partners."
            />
          </Grid>
        </Grid>
      </Box>

      {/* Meet Our Team Section */}
      <Box sx={{ overflow: 'hidden', py: { xs: 4, md: 6 }, width: '100%' }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ px: { xs: 2, md: 4 }, fontWeight: "bold" }}>
            Meet Our Team
          </Typography>
        </Box>
        <Slider {...sliderSettings}>
          {teamMembers.map((member, index) => (
            <div key={index}>
              <TeamMemberItem
                imageSrc={member.imageSrc}
                name={member.name}
                role={member.role}
              />
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default AboutComponent;
