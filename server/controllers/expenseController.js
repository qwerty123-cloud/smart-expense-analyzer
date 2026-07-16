import { Expense } from '../models/Expense.js';

// READ ALL — GET /api/expenses
export async function getExpenses(req, res) {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching expenses.', error: err.message });
  }
}

// READ ONE — GET /api/expenses/:id
export async function getExpenseById(req, res) {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.userId });
    if (!expense) return res.status(404).json({ message: 'Expense not found.' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
}

// CREATE — POST /api/expenses
export async function addExpense(req, res) {
  try {
    const { amount, category, date, note } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ message: 'Amount, category and date are required.' });
    }

    const expense = await Expense.create({
      user: req.userId,
      amount,
      category,
      date,
      note
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: 'Unable to add expense.', error: err.message });
  }
}

// UPDATE — PUT /api/expenses/:id
export async function updateExpense(req, res) {
  try {
    const { amount, category, date, note } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: { amount, category, date, note } },
      { new: true, runValidators: true } // { new: true } returns the updated document
    );

    if (!expense) return res.status(404).json({ message: 'Expense not found.' });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: 'Unable to update expense.', error: err.message });
  }
}

// DELETE — DELETE /api/expenses/:id
export async function deleteExpense(req, res) {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found.' });
    }
    res.json({ message: 'Expense deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting expense.', error: err.message });
  }
}
