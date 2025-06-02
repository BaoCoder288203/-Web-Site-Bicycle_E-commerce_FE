import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Box)({
  display: "flex",
  gap: "16px",
  width: "95%",
  paddingTop: "3vw",
  height: "calc(100vh - 60px)",
});

const MainSection = styled(Box)({
  flex: 2,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff3e0",
  padding: "24px",
  borderRadius: "8px",
  position: "relative",
});

const SideSection = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const Card = styled(Box)({
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "8px",
  textAlign: "center",
});

const CardHelmet = styled(Card)({
  backgroundColor: "#f5f5f5",
});

const CardGloves = styled(Card)({
  backgroundColor: "#424242",
  color: "#fff",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "contain",
  marginTop: "16px",
});

const MarqueeContainer = styled(Box)({
  backgroundColor: "#d4ed91",
  width: "100%",
  position: "relative",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  padding: "18px 0",
  marginTop: "17vw",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

const MarqueeContent = styled(Box)({
  display: "flex",
  "& span": {
    margin: "0 32px",
    fontSize: "20px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
});

const Marquee = styled(Box)({
  display: "flex",
  width: "fit-content",
  animation: "marquee 15s linear infinite",
  "@keyframes marquee": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#ff5722 !important",
  color: "#fff !important",
});

const AdvertisementSection = () => {
  const marqueeItems = [
    "SPECIAL DISCOUNT",
    "SHIPPING THROUGH ALL EUROPE",
    "EXPERT ADVICE",
    "RETURNS EXTEND OVER A PERIOD OF 14 DAYS",
    "CHECK OUT TRENDY E-BIKES",
    "EXPLORE OUR LATEST MOUNTAIN BIKES",
  ];

  return (
    <>
      <Container>
        <MainSection>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            FREEDOM RIDE
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your personal electric bike with insurance from €88/month.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledButton variant="contained">Shop Bikes</StyledButton>
            <Button variant="text">Learn More</Button>
          </Box>
          <StyledImage
            src="/public/assets/images/hero-swiper-3.png"
            sx={{ width: "800px", height: "auto" }}
            alt="Bike"
          />
        </MainSection>

        <SideSection>
          <CardHelmet>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              PRO CYCLIST HELMET
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enjoy 40% off everything!
            </Typography>
            <StyledButton variant="contained">Shop Now</StyledButton>
            <StyledImage
              src="/public/assets/images/hero-swiper-3.png"
              alt="Helmet"
            />
          </CardHelmet>

          <CardGloves>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              CITY SPRINT GRIPWEAR
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Experience ultimate comfort and control
            </Typography>
            <StyledButton variant="contained">Shop Now</StyledButton>
            <StyledImage
              src="/public/assets/images/hero-swiper-3.png"
              alt="Gloves"
            />
          </CardGloves>
        </SideSection>
      </Container>

      <MarqueeContainer>
        <Marquee>
          <MarqueeContent>
            {marqueeItems.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </MarqueeContent>
          <MarqueeContent>
            {marqueeItems.map((item, index) => (
              <span key={`duplicate-${index}`}>{item}</span>
            ))}
          </MarqueeContent>
        </Marquee>
      </MarqueeContainer>
    </>
  );
};

export default AdvertisementSection;
