import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth() // Get authentication status from your auth context

  const handleLogout = () => {
    // Perform logout logic here, e.g., clear token, redirect to login page
   logout();

    window.location.href = '/login';
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
          SplitWise
        </Typography>
      
        
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/expenses">Expenses</Button>
            <Button color="inherit" component={Link} to="/settlement">Settlement</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar