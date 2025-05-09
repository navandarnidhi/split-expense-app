import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 'auto' }}>
      <Typography variant="body1" align="center">
        © 2024 SplitWise - Expense Sharing App
      </Typography>
      <Typography variant="body2" align="center">
        Made with ❤️ by Team SplitWise
      </Typography>
    </Box>
  )
}

export default Footer