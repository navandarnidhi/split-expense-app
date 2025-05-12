import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  ListItemText,
} from "@mui/material";

export const AddGroupMemberDialog = ({ open, onClose, groupId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [selectedUserId, setSelectedUserId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [error, setError] = useState("");

  const handleCreateUserClick = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleCreateNewUser = async () => {
    try {
      const password = "Admin@123";
      const userData = { ...newUser, password };
      await axios.post("http://localhost:5000/api/auth/register", userData);
      handleDialogClose();
      setNewUser({ name: "", email: "" });
      // Refresh users
      fetchAllUsers();
    } catch (err) {
      setError("Failed to create user");
    }
  };

  const handleAddMember = async () => {
    if (!selectedUserId) return setError("Please select a member.");
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/expensegroup/addmember",
        {
          user_id: selectedUserId,
          group_id: groupId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onClose();
    } catch (err) {
      setError(err);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(response.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 520, mt: 5 }}>
          <FormControl fullWidth>
            <InputLabel>Members</InputLabel>
            <Select
              value={selectedUserId}
              label="Members"
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              {allUsers.map(({ user_id, name }) => (
                <MenuItem key={user_id} value={user_id}>
                  {name}
                </MenuItem>
              ))}
              <MenuItem disabled>
                <hr style={{ width: "100%" }} />
              </MenuItem>
              <MenuItem onClick={handleCreateUserClick}>
                <ListItemText
                  primary="+ Create New User"
                  primaryTypographyProps={{ color: "primary" }}
                />
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Create New User Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Create New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button variant="contained" onClick={handleCreateNewUser}>
              Create
            </Button>
          </DialogActions>
        </Dialog>

        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddMember}>Add Member</Button>
      </DialogActions>
    </Dialog>
  );
};
