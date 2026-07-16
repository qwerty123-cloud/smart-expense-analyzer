<template>
  <div class="app-shell">
    <Navbar v-if="showNavbar" />
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();
const showNavbar = computed(() => !['/', '/login', '/register'].includes(route.path));
</script>

<style>
:root {
  color-scheme: light;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background: #eff2fb;
  color: #101828;
  --surface: #ffffff;
  --surface-soft: #f8fafc;
  --text-muted: #667085;
  --border: rgba(15, 23, 42, 0.08);
  --shadow: 0 22px 50px rgba(15, 23, 42, 0.08);
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
}

body {
  background: radial-gradient(circle at top left, rgba(20, 184, 166, 0.16), transparent 22%),
    radial-gradient(circle at bottom right, rgba(99, 102, 241, 0.14), transparent 24%),
    #eef2ff;
  color: #0f172a;
}

.app-shell {
  min-height: 100vh;
}

.page-content {
  padding: 32px 32px 48px;
  max-width: 1188px;
  margin: 0 auto;
}

button,
input,
select {
  font: inherit;
}

button {
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid rgba(59, 130, 246, 0.3);
  outline-offset: 2px;
}

.page-content {
  padding: 32px 28px 48px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 880px) {
  .page-content {
    padding: 24px 18px 36px;
  }
}
</style>
