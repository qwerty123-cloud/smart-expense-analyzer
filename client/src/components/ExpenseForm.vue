<template>
  <form class="expense-form" @submit.prevent="submitForm">
    <p class="form-note">Add a new expense in seconds.</p>

    <div class="field-row">
      <input v-model.number="amount" type="number" min="0" step="0.01" placeholder="Amount" required />
      <select v-model="category" required>
        <option disabled value="">Select category</option>
        <option v-for="c in categories" :key="c">{{ c }}</option>
      </select>
    </div>

    <div class="field-row">
      <input v-model="date" type="date" required />
      <input v-model="note" type="text" placeholder="Add a note (optional)" />
    </div>

    <button type="submit">Add Expense</button>
    <p v-if="savedMessage" class="success-message">{{ savedMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['saveExpense']);
const amount = ref('');
const category = ref('');
const date = ref(new Date().toISOString().slice(0, 10));
const note = ref('');
const savedMessage = ref('');

function submitForm() {
  emit('saveExpense', {
    amount: amount.value,
    category: category.value,
    date: date.value,
    note: note.value.trim()
  });
  savedMessage.value = 'Expense saved successfully.';
  setTimeout(() => {
    savedMessage.value = '';
  }, 1800);
  amount.value = '';
  category.value = '';
  date.value = new Date().toISOString().slice(0, 10);
  note.value = '';
}
</script>

<style scoped>
.expense-form {
  display: grid;
  gap: 18px;
}

.form-note {
  margin: 0;
  color: #64748b;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field-row input,
.field-row select {
  width: 100%;
  padding: 16px 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 18px;
  background: #f8fafc;
  font-size: 1rem;
}

.field-row select {
  appearance: none;
}

button {
  padding: 16px 18px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(37, 99, 235, 0.18);
}

button:hover {
  transform: translateY(-1px);
}

.success-message {
  margin: 0;
  color: #059669;
  font-weight: 700;
  text-align: center;
}

@media (max-width: 720px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>
