import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  margin: '120px 0',
  width: '100%',
  padding: '64px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
});

const SplitSection = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '32px',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ImageSection = styled(Box)({
  flex: 1,
  textAlign: 'center',
});

const CyclistImage = styled('img')({
  width: '100%',
  maxWidth: '500px',
  borderRadius: '12px',
});

const TextSection = styled(Box)({
  flex: 1,
  padding: '16px',
});

const FeatureCard = styled(Box)({
  backgroundColor: '#d4ed91',
  padding: '24px 0',
  borderRadius: '8px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
});

const MarqueeContainer = styled(Box)({
  backgroundColor: '#fff',
  padding: '16px 0',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'relative',
});

const MarqueeContent = styled(Box)({
  display: 'flex',
  gap: '64px',
  '& span': {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
});

const Marquee = styled(Box)({
  display: 'flex',
  width: 'fit-content',
  animation: 'scroll 20s linear infinite',
  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#ff5722 !important',
  color: '#fff !important',
});

const LandingSection = () => {
  const partnerBrands = ['ICEBERG', 'SITEMARK', 'SNAPSHOT', 'UNSPLASH', 'GREENISH', 'SITEMARK'];

  return (
    <Container>
      <SplitSection>
        <ImageSection>
          <CyclistImage src="/public/assets/images/landing-banner.png" alt="Cyclist" /> {/* 👈 Bạn đổi path thành ảnh bạn upload */}
        </ImageSection>
        <TextSection>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#212121' }}>
            Advancing Electric Biking with Innovation, Performance, and Sustainability.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
            At Eura, we revolutionized electric scooters, and now we’re doing the same for electric bikes. Our innovative designs combine cutting-edge technology with unmatched performance, offering a seamless and exhilarating ride for every cyclist. Join us on this electrifying journey.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <StyledButton variant="contained">Shop Bikes</StyledButton>
            <Button variant="text" sx={{ color: '#666' }}>Learn More</Button>
          </Box>
        </TextSection>
      </SplitSection>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FeatureCard>
            <Typography fontSize="32px">🚲</Typography>
            <Typography fontWeight="bold">Limited lifetime warranty on all bikes.</Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FeatureCard>
            <Typography fontSize="32px">🚚</Typography>
            <Typography fontWeight="bold">Free ground shipping and easy returns.</Typography>
          </FeatureCard>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FeatureCard>
            <Typography fontSize="32px">🛠️</Typography>
            <Typography fontWeight="bold">Designed, engineered & assembled in the USA.</Typography>
          </FeatureCard>
        </Grid>
      </Grid>

      <MarqueeContainer>
        <Marquee>
          <MarqueeContent>
            {partnerBrands.map((brand, i) => (
              <span key={i}>{brand}</span>
            ))}
          </MarqueeContent>
          <MarqueeContent>
            {partnerBrands.map((brand, i) => (
              <span key={`dup-${i}`}>{brand}</span>
            ))}
          </MarqueeContent>
        </Marquee>
      </MarqueeContainer>
    </Container>
  );
};

export default LandingSection;
