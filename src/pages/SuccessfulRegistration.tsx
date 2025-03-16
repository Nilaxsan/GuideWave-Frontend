import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessfulRegistration = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 5 }}>
      <Box>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green' }} />
        <Typography variant="h4" gutterBottom>
          Verification Successfully!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Your email has been  verified successfully . You can now login to the platform.
        </Typography>
        <Button variant="contained" color="secondary" href="/"sx={{ borderRadius: 50 }}>
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessfulRegistration;
