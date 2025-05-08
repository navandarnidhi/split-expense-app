import { useState, useEffect } from 'react'
import { 
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import axios from 'axios'

const Settlements = () => {
  const [settlements, setSettlements] = useState([])
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [toUser, setToUser] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const fetchSettlements = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/settlements', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSettlements(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching settlements')
    }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching users')
    }
  }

  const handleSettleUp = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/settlements', {
        amount,
        toUser
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchSettlements()
      handleClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating settlement')
    }
  }

  const handleClose = () => {
    setOpen(false)
    setAmount('')
    setToUser('')
  }

  useEffect(() => {
    fetchSettlements()
    fetchUsers()
  }, [])

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settlements
        </Typography>
        
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)}
          sx={{ mb: 3 }}
        >
          Settle Up
        </Button>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {settlements.map((settlement) => (
                <TableRow key={settlement._id}>
                  <TableCell>{settlement.fromUser.name}</TableCell>
                  <TableCell>{settlement.toUser.name}</TableCell>
                  <TableCell>${settlement.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(settlement.date).toLocaleDateString()}</TableCell>
                  <TableCell>{settlement.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Settle Up</DialogTitle>
          <DialogContent>
            <TextField
              select
              fullWidth
              label="To User"
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
              SelectProps={{
                native: true,
              }}
              margin="normal"
            >
              <option value=""></option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSettleUp} color="primary">
              Settle
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  )
}

export default Settlements