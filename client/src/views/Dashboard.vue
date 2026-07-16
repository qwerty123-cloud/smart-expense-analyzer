<template>
  <div class="dashboard-page">
    <section class="hero-card">
      <div class="hero-top">
        <div>
          <span class="eyebrow">Welcome back</span>
          <h2>Manage your expenses with clarity</h2>
          <p>Track spending, compare categories, and keep your budget ahead of every decision.</p>
        </div>
        <div class="summary-pill">
          <div>
            <span>Total spent</span>
            <strong>${{ totalExpenses }}</strong>
          </div>
          <div>
            <span>Average</span>
            <strong>${{ averageExpense }}</strong>
          </div>
          <div>
            <span>Entries</span>
            <strong>{{ expenses.length }}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong :class="{ over: isOverBudget }">{{ budgetStatus }}</strong>
          </div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span>Budget goal</span>
          <strong>${{ budgetGoal }}</strong>
          <p>{{ budgetHint }}</p>
        </div>
        <div class="stat-card">
          <span>Top category</span>
          <strong>{{ topCategoryLabel }}</strong>
          <p>{{ topCategoryValue }}</p>
        </div>
        <div class="stat-card">
          <span>Latest activity</span>
          <strong>{{ latestActivity }}</strong>
          <p>Keep your spending habits visible.</p>
        </div>
      </div>

      <div class="budget-card">
        <div class="budget-card-top">
          <div>
            <p>Budget goal</p>
            <strong>${{ budgetGoal }}</strong>
          </div>
          <div class="budget-form">
            <input type="number" v-model.number="budgetInput" min="0" />
            <button type="button" class="button-secondary" @click="updateBudget">Set budget</button>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <p class="progress-copy">{{ isOverBudget ? `You're $${Math.abs(budgetRemaining)} over budget.` : `$${budgetRemaining} remaining this period.` }}</p>
      </div>
    </section>

    <div class="dashboard-grid">
      <div class="panel">
        <div class="section-heading">
          <h3>Add New Expense</h3>
          <p class="secondary-text">Keep your spending updated as soon as you pay.</p>
        </div>
        <ExpenseForm :categories="categories" @saveExpense="addExpense" />
      </div>

      <div class="panel">
        <div class="section-heading">
          <h3>Category overview</h3>
          <p class="secondary-text">See the biggest spending areas at a glance.</p>
        </div>
        <div class="category-grid">
          <div v-for="(total, category) in categoryTotals" :key="category" class="category-card">
            <span>{{ category }}</span>
            <strong>${{ total }}</strong>
          </div>
        </div>
        <div class="section-heading" style="margin-top: 24px;">
          <h3>Recent expenses</h3>
        </div>
        <ExpenseList :expenses="recentExpenses" @deleteExpense="removeExpense" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import ExpenseForm from '../components/ExpenseForm.vue';
import ExpenseList from '../components/ExpenseList.vue';
import { useExpenseStore } from '../store/expenses';

const {
  expenses,
  categories,
  budgetGoal,
  budgetRemaining,
  isOverBudget,
  addExpense,
  removeExpense,
  getCategoryTotals,
  totalExpenses,
  averageExpense,
  recentExpenses,
  setBudgetGoal
} = useExpenseStore();

const budgetInput = ref(budgetGoal.value);

watchEffect(() => {
  budgetInput.value = budgetGoal.value;
});

function updateBudget() {
  if (budgetInput.value < 0) {
    budgetInput.value = 0;
  }
  setBudgetGoal(budgetInput.value);
}

const categoryTotals = computed(() => getCategoryTotals());
const progressPercent = computed(() => {
  if (!budgetGoal.value) return 0;
  return Math.min(100, Math.round((totalExpenses.value / budgetGoal.value) * 100));
});
const budgetStatus = computed(() => (isOverBudget.value ? 'Over budget' : 'On track'));
const budgetHint = computed(() => {
  if (!budgetGoal.value) return 'Set a budget to start tracking.';
  return isOverBudget.value ? 'Your spending is above the target.' : 'Your spending is within the target.';
});
const topCategoryEntry = computed(() => {
  const entries = Object.entries(categoryTotals.value).sort((a, b) => b[1] - a[1]);
  return entries[0] ? { name: entries[0][0], amount: entries[0][1] } : null;
});
const topCategoryLabel = computed(() => topCategoryEntry.value?.name || 'No data');
const topCategoryValue = computed(() => topCategoryEntry.value ? `$${topCategoryEntry.value.amount}` : 'Add expenses to see insights');
const latestActivity = computed(() => {
  const latest = expenses[0];
  if (!latest) return 'No expenses yet';
  return `${latest.category} · $${latest.amount}`;
});
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.hero-card,
.panel {
  background: white;
  border-radius: 28px;
  padding: 30px;
  box-shadow: 0 28px 90px rgba(15, 23, 42, 0.08);
}

.hero-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.hero-top h2 {
  margin: 10px 0 12px;
  font-size: 2.2rem;
}

.hero-top p {
  margin: 0;
  color: #475569;
  max-width: 540px;
  line-height: 1.75;
}

.eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #2563eb;
  font-weight: 700;
  font-size: 0.85rem;
}

.summary-pill {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 16px;
}

.summary-pill div {
  background: #f8fafc;
  border-radius: 20px;
  padding: 16px 18px;
}

.summary-pill span {
  display: block;
  color: #475569;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.summary-pill strong {
  font-size: 1.15rem;
}

.summary-pill .over {
  color: #dc2626;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.stat-card {
  padding: 18px 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f8fbff, #f8fafc);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.stat-card span {
  display: block;
  color: #64748b;
  margin-bottom: 8px;
}

.stat-card strong {
  display: block;
  font-size: 1.1rem;
  color: #111827;
  margin-bottom: 6px;
}

.stat-card p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
}

.budget-card {
  margin-top: 28px;
  background: #f8fbff;
  border-radius: 24px;
  padding: 22px 26px;
}

.budget-card-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  align-items: center;
}

.budget-form {
  display: flex;
  gap: 12px;
  align-items: center;
}

.budget-form input {
  width: 120px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: white;
}

.budget-card p {
  margin: 0;
  color: #475569;
}

.budget-card strong {
  display: block;
  font-size: 1.7rem;
  margin: 6px 0 14px;
}

.progress-bar {
  height: 14px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  overflow: hidden;
  margin: 0.75rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}

.progress-copy {
  margin: 0;
  color: #475569;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
}

.panel h3 {
  margin: 0 0 4px;
  font-size: 1.3rem;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

.secondary-text {
  margin: 0;
  color: #64748b;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.category-card {
  background: #f8fafc;
  border-radius: 20px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-card span {
  color: #475569;
}

.category-card strong {
  font-size: 1.05rem;
}

@media (max-width: 960px) {
  .dashboard-grid,
  .summary-pill {
    grid-template-columns: 1fr;
  }
}
</style>
