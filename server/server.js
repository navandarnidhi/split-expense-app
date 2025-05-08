import app from './app.js'
import http from 'http'
import { connectDB } from './config/db.js'

const port = process.env.PORT || 5000
const server = http.createServer(app)

// Connect to database
connectDB()

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})