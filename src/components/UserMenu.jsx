import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton, Typography, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { isAuthenticated, logout } = useAuth() ;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  }

  return (
    <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
      <IconButton onClick={handleClick}>
        <Avatar src={user.imageUrl} alt={user.name} />
        <ArrowDropDownIcon />
      </IconButton>
      <Typography>{user.name}</Typography>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={() => console.log("Create Group Clicked")}>Create Group</MenuItem>
        <MenuItem onClick={() => console.log("Profile Clicked")}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
