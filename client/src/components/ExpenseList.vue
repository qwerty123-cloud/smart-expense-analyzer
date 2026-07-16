<template>
  <div class="expense-list">
    <div v-if="expenses.length" class="expense-table">
      <div class="expense-row header-row">
        <span>Date</span>
        <span>Category</span>
        <span>Note</span>
        <span>Amount</span>
        <span></span>
      </div>
      <div v-for="(e, i) in expenses" :key="e.id || i" class="expense-row">
        <span>{{ e.date }}</span>
        <span class="pill">{{ e.category }}</span>
        <span class="note-cell">{{ e.note || '—' }}</span>
        <strong>${{ e.amount }}</strong>
        <button @click="requestDelete(e.id)" class="delete-btn">Delete</button>
      </div>
    </div>
    <div v-else class="empty-state">
      No expenses added yet. Add one to start tracking your budget.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  expenses: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['deleteExpense']);

function requestDelete(id) {
  emit('deleteExpense', id);
}
</script>

<style scoped>
.expense-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.expense-table {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;
  overflow: hidden;
  background: #ffffff;
}

.expense-row {
  display: grid;
  grid-template-columns: 1.1fr 1fr 1.6fr 0.9fr 0.7fr;
  gap: 16px;
  padding: 14px 22px;
  align-items: center;
}

.header-row {
  background: #f8fafc;
  color: #475569;
  font-weight: 700;
}

.expense-row:not(.header-row) {
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}

.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 700;
  width: fit-content;
}

.note-cell {
  color: #475569;
  font-size: 0.95rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.delete-btn {
  border: none;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 14px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 700;
}

.delete-btn:hover {
  background: #fca5a5;
}

.empty-state {
  padding: 32px 24px;
  border: 1px dashed rgba(15, 23, 42, 0.16);
  border-radius: 20px;
  text-align: center;
  color: #64748b;
}

@media (max-width: 920px) {
  .expense-row {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .header-row {
    display: none;
  }
  .expense-row {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
  }
  .note-cell {
    min-width: 0;
  }
}

@media (max-width: 640px) {
  .expense-row {
    grid-template-columns: 1fr;
  }
  .expense-row button {
    width: 100%;
  }
}
</style>
