import React, { useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const GroupItem = ({groupName}) => {
  return (
    <ListItem>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText sx={{cursor: 'pointer'}}primary={groupName} />
    </ListItem>
  );
};
const GroupRightSidebar = ({ handleOnOpenDialog }) => {
  const [groups, setGroups] = React.useState(["TEAM1", "TEAM2"]);
  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        console.log("user", user, tokenl̥);l̥

        const response = await axios.get("http://localhost:5000/api/expensegroup", {
          user_id: user,
        },
          {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <Box
      sx={{ width: "20%", p: 2, backgroundColor: "#ffffff", height: "90vh" }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "gray", ml: 2, textAlign: "left" }}
      >
        GROUPS
      </Typography>
      <List>
        {groups.map((item) => (
          <GroupItem groupName={item} />
        ))}
        <ListItem>
          <IconButton>
            <AddIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">
            <Button onClick={handleOnOpenDialog}>Add</Button>
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default GroupRightSidebar;
