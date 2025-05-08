import { Box, Typography, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Welcome to SplitWise
        </Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to share expenses with friends and family
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/register"
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={Link} 
            to="/about"
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Home