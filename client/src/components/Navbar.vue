<template>
  <nav class="topbar">
    <div class="nav-left">
      <div class="brand">Smart Expense Analyzer</div>
    </div>

    <div class="nav-right">
      <span class="user-chip">Hi, {{ user?.name || 'User' }}</span>
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const { logout, user } = useAuthStore();

function handleLogout() {
  logout();
  router.push('/');
}
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 20px;
  background: linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.55));
  border-bottom: 1px solid var(--border);
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(8px) saturate(120%);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.brand {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-h);
  white-space: nowrap;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.user-chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--text-h);
  font-weight: 700;
}

.logout-btn {
  color: #b91c1c;
  background: transparent;
  border: none;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;
}

.logout-btn:hover { background: rgba(220,38,38,0.06); }
</style>
