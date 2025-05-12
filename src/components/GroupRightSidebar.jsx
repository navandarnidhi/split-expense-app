import React, { use, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  ListItemButton,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";

const GroupItem = ({ groupName,groupId,onGroupName }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemButton onClick={() => onGroupName(groupId)}>
        <ListItemText primary={groupName} />
      </ListItemButton>
    </ListItem>
  );
};
const GroupRightSidebar = ({ handleOnOpenDialog, groups, onGroupName }) => {
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
        {groups.map(({groupName, groupId}) => (
          <GroupItem groupName={groupName} groupId={groupId} onGroupName={onGroupName}/>
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
