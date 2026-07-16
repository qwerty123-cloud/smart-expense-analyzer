import express from 'express';
import {
  getExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense
} from '../controllers/expenseController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth); // saari expense routes login maangti hain

router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
