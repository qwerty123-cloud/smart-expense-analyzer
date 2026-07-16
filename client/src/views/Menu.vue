<template>
  <div class="menu-page">
    <div class="menu-card card">
      <div class="menu-header">
        <span class="eyebrow">Welcome</span>
        <h2>Choose your workspace</h2>
        <p>Hi {{ user?.name || 'there' }}, pick an area to manage your money smartly.</p>
      </div>

      <div class="menu-grid">
        <button
          v-for="option in options"
          :key="option.path"
          class="menu-item"
          type="button"
          @click="navigate(option.path)"
        >
          <span class="menu-icon">{{ option.icon }}</span>
          <span class="menu-title">{{ option.title }}</span>
          <span class="menu-desc">{{ option.desc }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const { user } = useAuthStore();

const options = [
  {
    title: 'Dashboard',
    desc: 'Add expenses and monitor your budget progress.',
    path: '/dashboard',
    icon: '📊'
  },
  {
    title: 'Reports',
    desc: 'View category-wise spending reports.',
    path: '/reports',
    icon: '📈'
  },
  {
    title: 'History',
    desc: 'Review recent expenses and sort your records.',
    path: '/history',
    icon: '🗂️'
  },
  {
    title: 'Account',
    desc: 'Manage your account information.',
    path: '/account',
    icon: '👤'
  }
];

function navigate(path) {
  router.push(path);
}
</script>

<style scoped>
.menu-page {
  min-height: auto;
  display: grid;
  place-items: center;
}

.menu-card {
  width: 100%;
  max-width: 860px;
  min-height: 520px;
  background: white;
  border-radius: 28px;
  padding: 32px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1);
}

.menu-header {
  margin-bottom: 24px;
}

.eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #2563eb;
  font-weight: 700;
  font-size: 0.82rem;
  margin-bottom: 10px;
}

.menu-header h2 {
  margin: 0 0 8px;
  font-size: 2rem;
}

.menu-header p {
  margin: 0;
  color: #64748b;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 20px;
  background: #f8fafc;
  cursor: pointer;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.menu-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);
}

.menu-icon {
  font-size: 1.4rem;
}

.menu-title {
  font-weight: 700;
  color: #0f172a;
}

.menu-desc {
  color: #64748b;
  line-height: 1.5;
}

@media (max-width: 720px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>
