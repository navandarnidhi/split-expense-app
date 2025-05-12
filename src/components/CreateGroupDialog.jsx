import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export const CreateGroupDialog = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const handleCreateGroup = async () => {
    if (!groupName || members.length === 0) {
      setError("Please provide a group name and at least one member.");
      return;
    }

    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:5000/api/expensegroup`,
      {
        groupName: groupName,
        members: members,
        userId: userId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Group</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Group Name"
          type="text"
          fullWidth
          variant="standard"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Members (comma separated)"
          type="text"
          fullWidth
          variant="standard"
          value={members.join(", ")}
          onChange={(e) =>
            setMembers(e.target.value.split(",").map((member) => member.trim()))
          }
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateGroup}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
