<template>
  <div class="auth-shell">
    <main class="auth-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.auth-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px 24px;
  background: transparent;
}

.auth-content {
  width: 100%;
  max-width: 520px;
}
</style>
