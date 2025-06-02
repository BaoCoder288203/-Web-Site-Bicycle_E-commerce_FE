import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
}));

const Image = styled('img')({
  width: '300px',
  maxWidth: '100%',
  marginBottom: '24px',
});

export default function NotFoundTemplate() {
  return (
    <Container>
      <Box sx={{ position: 'relative', mb: 4 }}>
        <img 
          src="/public/assets/images/error-banner.png" 
          alt="404" 
          style={{ width: '400px', maxWidth: '90%' }} 
        />
      </Box>
      
      <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
        Page Not Found
      </Typography>

      <Typography variant="body1" color="textSecondary" mb={4}>
        404 Error: Oops! The page you're looking for doesn't exist.<br/>
        Please check the URL or return to the homepage.
      </Typography>

      <Button
        variant="contained"
        color="error"
        href="/"
        sx={{ textTransform: 'none', px: 4, py: 1.5 }}
      >
        Back To Home
      </Button>
    </Container>
  );
}
