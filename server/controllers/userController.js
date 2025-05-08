import { getAllUsers } from '../models/userModel.js'

const getUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export { getUsersHandler }