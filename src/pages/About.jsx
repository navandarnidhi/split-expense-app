import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material'

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Frontend Developer',
    bio: 'Specializes in React and UI/UX design',
    email: 'john@splitwise.com'
  },
  {
    name: 'Jane Smith',
    role: 'Backend Developer',
    bio: 'Handles all the server-side logic and database',
    email: 'jane@splitwise.com'
  },
  {
    name: 'Mike Johnson',
    role: 'Full Stack Developer',
    bio: 'Works on both frontend and backend integration',
    email: 'mike@splitwise.com'
  },
]

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          SplitWise is a simple app to help friends and roommates track shared expenses and settle up. 
          Our mission is to make splitting expenses with friends and family painless and fair.
        </Typography>
        
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Our Team
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {member.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {member.role}
                  </Typography>
                  <Typography variant="body2">
                    {member.bio}
                  </Typography>
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
  )
}

export default About