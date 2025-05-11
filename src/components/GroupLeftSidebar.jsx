export const GroupLeftSidebar = () => {
  return (
    <Box sx={{ width: "20%", p: 2, backgroundColor: "#ffffff" }}>
      <Typography variant="subtitle1" gutterBottom>
        GROUP BALANCES
      </Typography>

      <Stack spacing={2}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "orange" }}>M</Avatar>
            <Box>
              <Typography variant="body2">Mohini Mahajan</Typography>
              <Typography variant="caption" color="error">
                owes $378.00
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "black" }}>M</Avatar>
            <Box>
              <Typography variant="body2" color="white">
                MOHINI PATIL
              </Typography>
              <Typography variant="caption" color="green">
                gets back $378.00
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Box mt={2}>
        <Typography variant="caption" color="primary">
          View details »
        </Typography>
      </Box>
    </Box>
  );
};
