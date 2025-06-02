import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Logo component
const Logo = () => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
    <Box
      component="img"
      src="/assets/images/logo-white.png"
      alt="CycleCity Logo"
      sx={{ height: 30, mr: 1 }}
    />
  </Box>
);

// Payment method icons
const PaymentMethods = () => (
  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
    <Box
      component="img"
      src="/assets/images/logo_VISA.png"
      alt="Visa"
      sx={{ height: 30 }}
    />
    <Box
      component="img"
      src="/assets/images/logo_MOMO.png"
      alt="MoMo"
      sx={{ height: 30 }}
    />
    <Box
      component="img"
      src="/assets/images/logo_ZALOPAY.png"
      alt="ZaloPay"
      sx={{ height: 30 }}
    />
    <Box
      component="img"
      src="/assets/images/logo_COD.png"
      alt="COD"
      sx={{ height: 30 }}
    />
  </Stack>
);

// Map component
const MapEmbed = () => (
  <Box
    component="iframe"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4427!2d106.6842705!3d10.8221589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zMTDCsNDknMTkuOCJOIDEwNsKwNDEnMDQuNiJF!5e0!3m2!1sen!2s!4v1635835853801!5m2!1sen!2s"
    sx={{
      border: 0,
      width: "100%",
      height: "100%",
    }}
    allowFullScreen
    loading="lazy"
    title="Google Maps"
  />
);

// Footer component
const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "#000",
        color: "black",
        // pb: 3,
        px: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "white",
            "& span": { color: "#e63939" }, // đỏ cho "CycleCity"
          }}
        >
          JOIN THE <span>CYCLECITY</span> COMMUNITY
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#fff", maxWidth: 600, mx: "auto", mb: 3 }}
        >
          Stay updated with the latest in cycling. Sign up for our newsletter to
          receive exclusive offers, product updates, and tips straight to your
          inbox. Join our biking community today!
        </Typography>

        {/* Email subscription form */}
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            maxWidth: 500,
            mx: "auto",
          }}
        >
          <Box
            component="input"
            type="email"
            placeholder="Enter your email address"
            required
            sx={{
              px: 3,
              py: 3,
              flex: 1,
              bgcolor: "black",
              border: "1px solid gray",
              color: "white",
              outline: "none",
              "::placeholder": { color: "gray" },
            }}
          />
          <Box
            component="button"
            type="submit"
            sx={{
              px: 3,
              py: 3,
              bgcolor: "white",
              color: "black",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "#e63939",
                color: "white",
              },
            }}
          >
            Subscribe
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "#0D0D0D",
          color: "white",
          mt: "auto",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid container sx={{ px: 4, py: 3 }} spacing={3} xs={12} md={8}>
              {/* Logo and company description */}
              <Grid item xs={12} md={4}>
                <Logo />
                <Typography
                  variant="body2"
                  sx={{ fontSize: 15, mb: 3, color: "white" }}
                >
                  Selling premium products designed to elevate your everyday
                  experience
                </Typography>

                {/* Social media icons */}
                <Stack direction="row" spacing={1} sx={{ mb: 8 }}>
                  <IconButton
                    aria-label="Facebook"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      transition: "background-color 0.3s ease",
                      "&:hover": { bgcolor: "#e63939" },
                      width: 28,
                      height: 28,
                      p: 2.5,
                    }}
                  >
                    <FacebookIcon sx={{ color: "white" }} />
                  </IconButton>

                  <IconButton
                    aria-label="Twitter"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      transition: "background-color 0.3s ease",
                      "&:hover": { bgcolor: "#e63939" },
                      width: 28,
                      height: 28,
                      p: 2.5,
                    }}
                  >
                    <TwitterIcon sx={{ color: "white" }} />
                  </IconButton>

                  <IconButton
                    aria-label="Instagram"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      transition: "background-color 0.3s ease",
                      "&:hover": { bgcolor: "#e63939" },
                      width: 28,
                      height: 28,
                      p: 2.5,
                    }}
                  >
                    <InstagramIcon sx={{ color: "white" }} />
                  </IconButton>

                  <IconButton
                    aria-label="YouTube"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      transition: "background-color 0.3s ease",
                      "&:hover": { bgcolor: "#e63939" },
                      width: 28,
                      height: 28,
                      p: 2.5,
                    }}
                  >
                    <YouTubeIcon sx={{ color: "white" }} />
                  </IconButton>
                </Stack>

                <PaymentMethods />
              </Grid>

              <Grid item xs={6} sm={8} md={3} sx={{ color: "white" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Shop
                </Typography>
                <Stack spacing={1}>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Bikes
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Accessories
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Clothing
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Tool
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Hydration
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Equipment
                  </Link>
                </Stack>
              </Grid>

              {/* Cột 3: Pages */}
              <Grid item xs={6} sm={4} md={3} sx={{ color: "white" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Pages
                </Typography>
                <Stack spacing={1}>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    About Us
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Services
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Shop
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    News
                  </Link>
                </Stack>
              </Grid>

              {/* Cột 4: Support */}
              <Grid item xs={6} sm={4} md={2} sx={{ color: "white" }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Support
                </Typography>
                <Stack spacing={1}>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    FAQs
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Warranty Policy
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Shipping & Delivery
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    How to Order
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Exchange & Return Policy
                  </Link>
                  <Link
                    href="#"
                    sx={{
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      color: "#fff",
                      "&:hover": { color: "#e63939" },
                    }}
                  >
                    Terms of Offers
                  </Link>
                </Stack>
              </Grid>
            </Grid>
            <Grid xs={12} md={4}>
              <MapEmbed />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        sx={{
          width: "max-content",
          mb: 1,
          fontSize: 17,
          py: 4,
          color: "#fff",
          "& span": { color: "#e63939" },
        }}
      >
        Copyright © {new Date().getFullYear()} <span>CYCLECITY</span>. All
        rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
