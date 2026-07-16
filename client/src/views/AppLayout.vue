<template>
  <div class="app-layout">
    <Sidebar />
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import { useExpenseStore } from '../store/expenses';

const { fetchExpenses } = useExpenseStore();

onMounted(() => {
  fetchExpenses();
});
</script>

<style scoped>
.app-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
  align-items: start;
  background: transparent;
  padding: 18px 24px;
  box-sizing: border-box;
}

.app-content {
  padding: 20px;
  width: 100%;
  max-width: 1088px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 96px); /* fill vertical space so content and sidebar align */
}

@media (max-width: 900px) {
  .app-layout {
    grid-template-columns: 1fr;
    padding: 12px;
  }

  .app-content {
    padding: 16px;
    min-height: auto;
  }
}
</style>
