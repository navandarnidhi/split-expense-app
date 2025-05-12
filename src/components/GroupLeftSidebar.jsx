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

export const GroupLeftSidebar = ({members}) => {
  return (
    <Box sx={{ width: "20%", p: 2, backgroundColor: "#ffffff" }}>
      <Typography variant="subtitle1" gutterBottom>
        GROUP BALANCES
      </Typography>

      <Stack spacing={2}>
        {members.map(({user_name}) => (
          
          <Box>
            {/* {JSON.stringify(members)} */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "orange" }}>M</Avatar>
              <Box>
                <Typography sx={{textAlign: "left"}} variant="body2">{user_name}</Typography>
                <Typography variant="caption" color="success">
                  {"message not yet defined"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>

      <Box mt={2}>
        <Typography variant="caption" color="primary">
          View details »
        </Typography>
      </Box>
    </Box>
  );
};
