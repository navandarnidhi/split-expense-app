import React from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  Divider,
  Stack,
  LinearProgress,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import GroupRightSidebar from "../components/GroupRightSidebar";
import { CreateGroupDialog } from "../components/CreateGroupDialog";
import { GroupLeftSidebar } from "../components/GroupLeftSidebar";

const Group = () => {
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] =
    React.useState(false);
  const handleOnCloseDialog = () => {
    setIsCreateGroupDialogOpen(false);
  };

  const handleOnOpenDialog = () => {
    setIsCreateGroupDialogOpen(true);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f7f7f7" }}>
      {/* Right Sidebar */}
      <GroupRightSidebar handleOnOpenDialog={handleOnOpenDialog} />

      {/* Main*/}
      <Box sx={{ width: "70%", p: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar>
            <HomeIcon />
          </Avatar>

          <Typography variant="h6">GROUP NAME</Typography>
          <Typography variant="caption" sx={{ textAlign: "left" }}>
            2 peoples
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" color="warning">
            Add an expense
          </Button>
          <Button variant="contained" color="success">
            Settle up
          </Button>
        </Box>

        <Divider />

        {/* Expense List */}
        <Box mt={2}>{/* Expense Card */}</Box>
        <CreateGroupDialog
          open={isCreateGroupDialogOpen}
          onClose={handleOnCloseDialog}
        />
      </Box>

      {/* Right Sidebar */}
      <GroupLeftSidebar/>
    </Box>
  );
};

export default Group;
