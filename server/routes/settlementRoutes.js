import express from 'express'
import {
  createSettlementHandler,
  getSettlementsHandler
} from '../controllers/settlementController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .post(protect, createSettlementHandler)
  .get(protect, getSettlementsHandler)

export default router