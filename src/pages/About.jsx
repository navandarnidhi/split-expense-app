import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

const teamMembers = [
  {
    name: "Mohini Patil",
    role: "Frontend Developer",
    bio: "Specializes in React and UI/UX design",
    email: "mohini.patil@splitwise.com",
  },
  {
    name: "Nidhi Navandar",
    role: "Backend Developer",
    bio: "Handles all the server-side logic and database",
    email: "nidhi.navandar@splitwise.com",
    profileImage: "/nidhi.jpg",
  },
  {
    name: "Owais Shaikh",
    role: "Full Stack Developer",
    bio: "Works on both frontend and backend integration",
    email: "owais.shaikh@splitwise.com",
  },
];

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          SplitWise is a simple app to help friends and roommates track shared
          expenses and settle up. Our mission is to make splitting expenses with
          friends and family painless and fair.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Our Team
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} >
              <Card>
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    alt={member.name}
                    src={member.profileImage || "/default.jpg"}
                    sx={{ width: 150, height: 150 }}
                  />
                </CardContent>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {member.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {member.role}
                  </Typography>
                  <Typography variant="body2">{member.bio}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Email: {member.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
