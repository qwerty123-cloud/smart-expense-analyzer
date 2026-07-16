<template>
  <div class="report-page">
    <div class="hero-card card">
      <div class="header-row">
        <div>
          <h2>Expense breakdown</h2>
          <p>Review which categories cost you most and where to adjust your budget.</p>
        </div>
        <div class="report-summary">
          <span>Total spent</span>
          <strong>${{ totalExpenses }}</strong>
        </div>
      </div>

      <div v-if="!categoryEntries.length" class="empty-state">
        No expense data yet. Add expenses to see category analytics.
      </div>

      <div v-else class="report-content">
        <div class="chart-card card">
          <canvas ref="barCanvas" width="600" height="320" aria-label="Category bar chart"></canvas>
        </div>

        <div class="insight-list">
          <div class="insight-card highlight card">
            <span>Top category</span>
            <strong>{{ topCategory?.category || 'None' }}</strong>
            <p>{{ topCategory ? `${topCategory.percent}% of total spending` : 'Add expenses to see updates' }}</p>
            <div style="height:180px; margin-top:12px;">
              <canvas ref="pieCanvas" width="320" height="180" aria-label="Category breakdown chart"></canvas>
            </div>
          </div>

          <div v-for="entry in categoryEntries" :key="entry.category" class="entry-row">
            <div>
              <strong>{{ entry.category }}</strong>
              <span>{{ entry.percent }}% of spending</span>
            </div>
            <strong>${{ entry.amount }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useExpenseStore } from '../store/expenses';
import Chart from 'chart.js/auto';

const { totalExpenses, getCategoryTotals, getCategoryPercentages } = useExpenseStore();
const categoryEntries = computed(() => {
  const totals = getCategoryTotals();
  const percentages = getCategoryPercentages();
  return Object.keys(totals)
    .map((category) => ({ category, amount: totals[category], percent: percentages[category] }))
    .sort((a, b) => b.amount - a.amount);
});
const topCategory = computed(() => categoryEntries.value[0] || null);

const barCanvas = ref(null);
const pieCanvas = ref(null);
let barChart = null;
let pieChart = null;

function buildCharts() {
  if (!categoryEntries.value.length) return;
  const labels = categoryEntries.value.map((e) => e.category);
  const amounts = categoryEntries.value.map((e) => e.amount);
  const colors = labels.map((_, i) => `hsl(${(i * 57) % 360} 70% 55%)`);

  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();

  if (barCanvas.value) {
    barChart = new Chart(barCanvas.value.getContext('2d'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Amount', data: amounts, backgroundColor: colors }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
  }

  if (pieCanvas.value) {
    pieChart = new Chart(pieCanvas.value.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data: categoryEntries.value.map((e) => e.percent), backgroundColor: colors }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    });
  }
}

onMounted(() => buildCharts());
watch(categoryEntries, () => buildCharts());
onBeforeUnmount(() => {
  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();
});
</script>

<style scoped>
.report-page {
  display: flex;
  justify-content: center;
}

.hero-card {
  width: 100%;
  max-width: 860px;
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.08);
}

.header-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.header-row h2 {
  margin: 0;
}

.report-summary {
  background: #f8fafc;
  padding: 16px 20px;
  border-radius: 20px;
  min-width: 180px;
}

.report-summary span {
  display: block;
  color: #64748b;
  margin-bottom: 8px;
}

.report-content {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
}

.chart-card {
  background: #f8fbff;
  border-radius: 20px;
  padding: 24px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 14px;
  height: 220px;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.bar-track {
  width: 100%;
  height: 160px;
  background: #e2e8f0;
  border-radius: 999px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #60a5fa, #2563eb);
  border-radius: 999px;
}

.chart-bar span {
  font-size: 0.9rem;
  color: #475569;
  text-align: center;
}

.insight-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.insight-card,
.entry-row {
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 18px;
  padding: 14px 16px;
}

.insight-card.highlight {
  background: linear-gradient(135deg, #eff6ff, #f8fafc);
}

.insight-card span {
  display: block;
  color: #64748b;
  margin-bottom: 6px;
}

.insight-card strong {
  font-size: 1.05rem;
}

.insight-card p {
  margin: 6px 0 0;
  color: #475569;
}

.entry-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.entry-row span {
  display: block;
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 4px;
}

.empty-state {
  padding: 32px;
  border-radius: 20px;
  background: #f8fafc;
  color: #64748b;
  text-align: center;
}

@media (max-width: 860px) {
  .report-content {
    grid-template-columns: 1fr;
  }
}
</style>
