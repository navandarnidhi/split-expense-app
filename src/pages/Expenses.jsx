import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [splitExpenseId, setSplitExpenseId] = useState(null);
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [count, setCount] = useState('');
  const [split, setSplit] = useState(null);
  const [error, setError] = useState('');

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching expenses');
    }
  };

  const handleSplitOpen = (id, amount) => {
    setSplitExpenseId(id);
    setTotal(amount);
    setSplitDialogOpen(true);
  };

  const handleSplitClose = () => {
    setSplitDialogOpen(false);
    setName('');
    setTotal('');
    setCount('');
    setSplit(null);
  };

  const handleSplitCalculation = () => {
    const amt = parseFloat(total);
    const ppl = parseInt(count);
    if (!isNaN(amt) && !isNaN(ppl) && ppl > 0) {
      setSplit((amt / ppl).toFixed(2));
    }
  };

  const handleSplitSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const participants = Array.from({ length: parseInt(count) }, (_, i) => `Person ${i + 1}`);
      await axios.post(
        'http://localhost:5000/api/split_expense',
        {
          expenseId: splitExpenseId,
          totalAmount: total,
          participants,
          splitAmount: split,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchExpenses();
      handleSplitClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving split expense');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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
                  <TableCell>${expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleSplitOpen(expense._id, expense.amount)}>
                      SPLIT
                    </IconButton>
                    <IconButton onClick={() => console.log('Edit')}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => console.log('Delete')}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={splitDialogOpen} onClose={handleSplitClose}>
          <DialogTitle>Split Expense</DialogTitle>
          <DialogContent>
            <div className="glass-card text-center">
              <h4>Hello, {name || 'User'} 👋</h4>
              <TextField
                fullWidth
                className="form-control my-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                className="form-control my-2"
                type="number"
                placeholder="Total expense ($)"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                className="form-control my-2"
                type="number"
                placeholder="Number of people"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                margin="normal"
              />
              <Button
                fullWidth
                className="btn btn-success w-100"
                onClick={handleSplitCalculation}
                sx={{ mt: 2 }}
              >
                Split Now
              </Button>
              {split && (
                <Typography className="alert alert-info mt-3">
                  Each person pays: <strong>${split}</strong>
                </Typography>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSplitClose}>Cancel</Button>
            <Button onClick={handleSplitSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Expenses;