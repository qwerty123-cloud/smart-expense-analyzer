<template>
  <aside class="sidebar-shell">
    <div class="sidebar-header">
      <div class="logo-wrap">
        <!-- simple inline SVG logo so every sidebar shows the Smart Expense Analyzer mark -->
        <svg class="logo" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="48" height="48" rx="10" fill="url(#g)" />
          <path d="M14 30L20 21L28 28L36 16" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#6C5CE7" />
              <stop offset="1" stop-color="#00B894" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div>
        <span class="brand">SEA</span>
        <h2>Smart Expense</h2>
      </div>
    </div>

    <nav class="sidebar-nav">
      <RouterLink v-for="item in navItems" :key="item.path" :to="item.path" class="nav-link">
        <span>{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <!-- user info removed per request -->
    </div>

    <button class="back-button" type="button" @click="goBack">← Back</button>
  </aside>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();

const navItems = [
  { label: 'Menu', path: '/menu', icon: '🏠' },
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Reports', path: '/reports', icon: '📈' },
  { label: 'History', path: '/history', icon: '🕘' },
  { label: 'Account', path: '/account', icon: '👤' },
  { label: 'Finish', path: '/finish', icon: '✅' }
];

function goBack() {
  router.back();
}
</script>

<style scoped>
.sidebar-shell {
  position: relative;
  width: 260px;
  min-height: 100vh;
  padding: 18px 16px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  box-shadow: 0 6px 30px rgba(2,6,23,0.03);
}

.sidebar-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), #7c3aed);
  color: white;
  font-weight: 800;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1rem;
}

.back-button {
  position: absolute;
  right: 12px;
  bottom: 12px;
  border: none;
  background: transparent;
  color: var(--accent);
  font-weight: 700;
  cursor: pointer;
}

.logo {
  display: block;
  width: 48px;
  height: 48px;
  margin-right: 8px;
}

.logo-wrap { display:inline-flex; align-items:center; justify-content:center; }

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-h);
  background: transparent;
  font-weight: 600;
}

.router-link-active,
.nav-link:hover {
  background: var(--accent-bg);
  color: var(--text-h);
  transform: translateX(6px);
}

.sidebar-footer {
  display: grid;
  gap: 6px;
  min-height: 22px;
}

.user-block span {
  display: block;
  color: var(--muted);
  font-size: 0.95rem;
}

.user-block strong {
  display: block;
  margin-top: 4px;
}

.logout-button {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 10px 12px;
  background: #fee2e2;
  color: #b91c1c;
  font-weight: 700;
  cursor: pointer;
}
</style>
