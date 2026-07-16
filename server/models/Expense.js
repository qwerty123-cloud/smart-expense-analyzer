import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: [true, 'Amount required'],
      min: 0
    },
    category: {
      type: String,
      required: [true, 'Category required'],
      trim: true
    },
    date: {
      type: String, // 'YYYY-MM-DD' -- ExpenseForm.vue sends the date in this format
      required: true
    },
    note: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export const Expense = mongoose.model('Expense', expenseSchema);
