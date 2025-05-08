import express from 'express'
import { createContactHandler } from '../controllers/contactController.js'

const router = express.Router()

router.post('/', createContactHandler)

export default router