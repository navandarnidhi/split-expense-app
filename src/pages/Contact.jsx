import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box, Typography, Container, TextareaAutosize } from '@mui/material'
import axios from 'axios'

const Contact = () => {
  const [message, setMessage] = useState('')

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required').min(10, 'Message must be at least 10 characters'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:5000/api/contact', values)
        setMessage('Your message has been sent successfully!')
        formik.resetForm()
      } catch (err) {
        setMessage('Failed to send message. Please try again.')
      }
    },
  })

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        {message && (
          <Typography color={message.includes('successfully') ? 'success.main' : 'error'} gutterBottom>
            {message}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Your Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="subject"
            name="subject"
            label="Subject"
            margin="normal"
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
          />
          <TextField
            fullWidth
            id="message"
            name="message"
            label="Message"
            margin="normal"
            multiline
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit"
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Contact