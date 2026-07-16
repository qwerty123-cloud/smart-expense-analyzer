<template>
  <div class="history-page">
    <div class="hero-card card">
      <div class="history-header">
        <div>
          <h2>Expense History</h2>
          <p>Search, filter, and sort your past spending entries so insights are easy to find.</p>
        </div>
        <div class="history-controls">
          <input v-model="searchTerm" type="search" placeholder="Search category, note, or date" />
          <select v-model="filterCategory">
            <option value="All">All categories</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
          <button type="button" @click="toggleSort" class="sort-btn">
            Sort: {{ sortNewest ? 'Newest' : 'Oldest' }}
          </button>
        </div>
      </div>

      <div class="stats-strip">
        <div class="stat-pill">Records <strong>{{ expenses.length }}</strong></div>
        <div class="stat-pill">Shown <strong>{{ filteredExpenses.length }}</strong></div>
        <div class="stat-pill">Categories <strong>{{ categories.length }}</strong></div>
      </div>

      <ul v-if="filteredExpenses.length" class="history-list">
        <li v-for="expense in filteredExpenses" :key="expense.id">
          <div>
            <span class="expense-meta">{{ expense.date }} • {{ expense.category }}</span>
            <p class="expense-note">{{ expense.note || 'No note added' }}</p>
          </div>
          <strong>${{ expense.amount }}</strong>
        </li>
      </ul>
      <div v-else class="empty-state">No expenses match this filter. Try another category or search term.</div>

      <div class="history-actions">
        <router-link class="button-secondary" to="/dashboard">Back to Dashboard</router-link>
        <router-link class="button-primary" to="/finish">Finish & Exit</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useExpenseStore } from '../store/expenses';

const { expenses, categories } = useExpenseStore();
const filterCategory = ref('All');
const searchTerm = ref('');
const sortNewest = ref(true);

const filteredExpenses = computed(() => {
  const query = searchTerm.value.trim().toLowerCase();
  const list = expenses.slice().filter((expense) => {
    const matchesCategory = filterCategory.value === 'All' || expense.category === filterCategory.value;
    const matchesSearch = !query || [expense.category, expense.note, expense.date]
      .some((field) => String(field || '').toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return list.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return sortNewest.value ? bDate - aDate : aDate - bDate;
  });
});

function toggleSort() {
  sortNewest.value = !sortNewest.value;
}
</script>

<style scoped>
.history-page {
  display: flex;
  justify-content: center;
}

.hero-card {
  width: 100%;
  max-width: 760px;
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1);
}

.history-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.history-header h2 {
  margin: 0 0 8px;
  font-size: 2rem;
}

.history-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.history-controls input,
.history-controls select,
.sort-btn {
  padding: 12px 16px;
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #f8fafc;
  color: #0f172a;
  cursor: pointer;
}

.history-controls input {
  min-width: 220px;
}

.sort-btn {
  background: white;
}

.stats-strip {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.stat-pill {
  padding: 10px 14px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 700;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
}

.history-list li {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 18px;
  border-radius: 18px;
  background: #f8fafc;
}

.expense-meta {
  display: block;
  color: #475569;
  font-weight: 600;
}

.expense-note {
  margin: 4px 0 0;
  color: #64748b;
}

.empty-state {
  padding: 28px;
  border-radius: 20px;
  background: #f8fafc;
  color: #64748b;
  text-align: center;
}

.history-actions {
  margin-top: 28px;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.button-primary,
.button-secondary {
  padding: 14px 22px;
  border-radius: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button-primary {
  color: white;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
}

.button-secondary {
  color: #0f172a;
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.12);
}

.button-primary:hover,
.button-secondary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.12);
}

@media (max-width: 720px) {
  .hero-card {
    padding: 24px;
  }

  .history-list li {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
