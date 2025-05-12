import React, { use, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import HomeIcon from "@mui/icons-material/Home";
import GroupRightSidebar from "../components/GroupRightSidebar";
import { CreateGroupDialog } from "../components/CreateGroupDialog";
import { GroupLeftSidebar } from "../components/GroupLeftSidebar";
import { AddGroupMemberDialog } from "../components/AddGroupMemberDialog";

const Group = () => {
  const [selectedGroup, setSelectedGroup] = React.useState({
    groupId: "",
    groupName: "",
  });

  const [selectedGroupMembers, setSelectedGroupMembers] = React.useState({
    userId: "",
    userName: "",
  });

  const [noOfMembers, setNoOfMembers] = React.useState(0);

  const [groups, setGroups] = React.useState([
    {
      groupId: "",
      groupName: "",
    },
  ]);
  const [members,setMembers] = React.useState([]);
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] =
    React.useState(false);

    const [isAddGroupMembersDialogOpen, setIsAddGroupMembersDialogOpen] =
    React.useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = JSON.parse(localStorage.getItem("user")).id;

        const response = await axios.get(
          `http://localhost:5000/api/expensegroup/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { group_id: groupId, name: groupName } = response?.data[0];
        setSelectedGroup({ groupId, groupName });
        setGroups(
          response.data.map((item) => ({
            groupId: item.group_id,
            groupName: item.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const selectedGroupId = selectedGroup?.groupId;
  const selectedGroupName = selectedGroup?.groupName;

  useEffect(() => {
    const fetchGroupsUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/expensegroup/group/${selectedGroupId}/members`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { user_id: userId, name: userName } = response?.data[0];
        const count = response?.data?.length;
        setMembers(response.data);
        setSelectedGroupMembers({ userId, userName });
        setNoOfMembers(count);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroupsUsers();
  }, [selectedGroupId, isAddGroupMembersDialogOpen]);

  const handleOnCloseDialog = () => {
    setIsCreateGroupDialogOpen(false);
  };

  const handleOnOpenDialog = () => {
    setIsCreateGroupDialogOpen(true);
  };

  
  const handleAddMembersDialog = () => {
    setIsAddGroupMembersDialogOpen(!isAddGroupMembersDialogOpen);
  };

  const handleGroupName = (currentGroup) => {
    const selecetedGroup = groups.find(({ groupId }) => {
      return groupId === currentGroup;
    });
    setSelectedGroup((prevState) => ({
      ...prevState,
      ...selecetedGroup,
    }));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f7f7f7" }}>
      {/* Right Sidebar */}
      <GroupRightSidebar
        handleOnOpenDialog={handleOnOpenDialog}
        groups={groups}
        onGroupName={handleGroupName}
      />

      {/* Main*/}
      <Box sx={{ width: "70%", p: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar>
            <HomeIcon />
          </Avatar>

          <Typography variant="h6">{selectedGroup.groupName}</Typography>
          <Typography variant="caption" sx={{ textAlign: "left" }}>
            {noOfMembers} peoples
          </Typography>
          <IconButton color="primary" aria-label="add members" onClick={handleAddMembersDialog}>
            {/* <Typography variant="caption">Add members</Typography> */}
            <PersonAddAltIcon />
          </IconButton>

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
        <AddGroupMemberDialog
        open={isAddGroupMembersDialogOpen}
        onClose={handleAddMembersDialog}
        groupId={selectedGroupId}
        />
      </Box>

      {/* Right Sidebar */}
      <GroupLeftSidebar members={members}/>
    </Box>
  );
};

export default Group;
