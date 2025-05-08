import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import axios from 'axios'

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const validationSchema = Yup.object({
    description: Yup.string().required('Required'),
    amount: Yup.number().required('Required').positive('Amount must be positive'),
    category: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      description: '',
      amount: '',
      category: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token')
        if (editingId) {
          await axios.put(`http://localhost:5000/api/expenses/${editingId}`, values, {
            headers: { Authorization: `Bearer ${token}` }
          })
        } else {
          await axios.post('http://localhost:5000/api/expenses', values, {
            headers: { Authorization: `Bearer ${token}` }
          })
        }
        fetchExpenses()
        handleClose()
      } catch (err) {
        setError(err.response?.data?.message || 'Error saving expense')
      }
    },
  })

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setExpenses(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching expenses')
    }
  }

  const handleEdit = (expense) => {
    formik.setValues({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    })
    setEditingId(expense._id)
    setOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchExpenses()
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting expense')
    }
  }

  const handleOpen = () => {
    setOpen(true)
    setEditingId(null)
    formik.resetForm()
  }

  const handleClose = () => {
    setOpen(false)
    setEditingId(null)
    formik.resetForm()
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Expenses
        </Typography>
        
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        
        <Button 
          variant="contained" 
          onClick={handleOpen}
          sx={{ mb: 3 }}
        >
          Add New Expense
        </Button>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>${expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(expense)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(expense._id)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editingId ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                margin="normal"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                margin="normal"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
              <TextField
                fullWidth
                id="category"
                name="category"
                label="Category"
                margin="normal"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={formik.handleSubmit} color="primary">
              {editingId ? 'Update' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  )
}

export default Expenses