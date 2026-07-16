import { computed, reactive, ref } from 'vue';
import { api } from '../api/axios';

const BUDGET_KEY = 'expense-analyzer-budget';

function loadBudgetGoal() {
  if (typeof window === 'undefined') return 1200;
  try {
    const saved = localStorage.getItem(BUDGET_KEY);
    return saved ? Number(saved) : 1200;
  } catch (error) {
    return 1200;
  }
}

const state = reactive({
  expenses: [],
  budgetGoal: loadBudgetGoal(),
  categories: ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Other']
});

// Every API call follows the standard 3-state pattern: loading, error, success
const loading = ref(false);
const error = ref(null);

function mapExpense(serverExpense) {
  return {
    id: serverExpense._id,
    amount: serverExpense.amount,
    category: serverExpense.category,
    date: serverExpense.date,
    note: serverExpense.note || ''
  };
}

// READ - GET /api/expenses (called automatically when AppLayout.vue mounts)
async function fetchExpenses() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await api.get('/expenses'); // response data is already an array of expenses
    state.expenses = data.map(mapExpense);
  } catch (err) {
    error.value = err.response?.data?.message ?? 'Unable to load expenses.';
  } finally {
    loading.value = false;
  }
}

// CREATE - POST /api/expenses
async function addExpense(expense) {
  try {
    const { data } = await api.post('/expenses', {
      amount: Number(expense.amount),
      category: expense.category,
      date: expense.date || new Date().toISOString().slice(0, 10),
      note: expense.note || ''
    });
    state.expenses.unshift(mapExpense(data)); // data yahan seedha saved expense object hai
  } catch (err) {
    error.value = err.response?.data?.message ?? 'Unable to add expense.';
  }
}

// UPDATE - PUT /api/expenses/:id
async function updateExpense(id, changes) {
  try {
    const { data } = await api.put(`/expenses/${id}`, changes);
    const index = state.expenses.findIndex((item) => item.id === id);
    if (index !== -1) {
      state.expenses[index] = mapExpense(data);
    }
  } catch (err) {
    error.value = err.response?.data?.message ?? 'Unable to update expense.';
  }
}

// DELETE - DELETE /api/expenses/:id
async function removeExpense(id) {
  try {
    await api.delete(`/expenses/${id}`);
    const index = state.expenses.findIndex((item) => item.id === id);
    if (index !== -1) {
      state.expenses.splice(index, 1);
    }
  } catch (err) {
    error.value = err.response?.data?.message ?? 'Unable to delete expense.';
  }
}

function getCategoryTotals() {
  return state.expenses.reduce((totals, expense) => {
    const category = expense.category || 'Uncategorized';
    totals[category] = (totals[category] || 0) + Number(expense.amount || 0);
    return totals;
  }, {});
}

function getCategoryPercentages() {
  const totals = getCategoryTotals();
  const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
  return Object.fromEntries(
    Object.entries(totals).map(([category, value]) => [category, total ? Math.round((value / total) * 100) : 0])
  );
}

const totalExpenses = computed(() => state.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0));
const averageExpense = computed(() => {
  if (!state.expenses.length) return 0;
  return Number((totalExpenses.value / state.expenses.length).toFixed(2));
});
const recentExpenses = computed(() => state.expenses.slice(0, 6));
const budgetRemaining = computed(() => state.budgetGoal - totalExpenses.value);
const isOverBudget = computed(() => budgetRemaining.value < 0);

function setBudgetGoal(goal) {
  state.budgetGoal = Number(goal) || 0;
  if (typeof window !== 'undefined') {
    localStorage.setItem(BUDGET_KEY, String(state.budgetGoal));
  }
}

export function useExpenseStore() {
  return {
    expenses: state.expenses,
    categories: computed(() => state.categories),
    budgetGoal: computed(() => state.budgetGoal),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetchExpenses,
    addExpense,
    updateExpense,
    removeExpense,
    getCategoryTotals,
    getCategoryPercentages,
    totalExpenses,
    averageExpense,
    recentExpenses,
    budgetRemaining,
    isOverBudget,
    setBudgetGoal
  };
}
