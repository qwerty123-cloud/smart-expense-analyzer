<template>
  <div class="finish-page">
    <div class="finish-card card">
      <div class="finish-icon">✓</div>
      <h1>Save & Close</h1>
      <p>Your expenses are saved automatically. When you’re ready, close the session and return later with everything preserved.</p>
      <!-- step label removed per request -->
      <div class="finish-actions">
        <router-link class="button-secondary" to="/dashboard">Back to Dashboard</router-link>
        <router-link class="button-primary" to="/">Exit to Home</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.finish-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.12), transparent 28%),
    radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.12), transparent 28%),
    #eff2fb;
}

.finish-card {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 30px;
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 30px 90px rgba(15, 23, 42, 0.12);
  text-align: center;
}

.step-label {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-strong);
  font-size: 0.88rem;
  font-weight: 700;
  margin: 10px 0 22px;
}

.finish-icon {
  width: 76px;
  height: 76px;
  margin: 0 auto 24px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  background: #dbeafe;
  color: #2563eb;
  font-size: 2.4rem;
}

.finish-card h1 {
  margin: 0 0 16px;
  font-size: 2.1rem;
  color: #101828;
}

.finish-card p {
  margin: 0 0 28px;
  color: #475569;
  line-height: 1.75;
}

.finish-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.button-primary,
.button-secondary {
  padding: 14px 22px;
  border-radius: 16px;
  font-weight: 700;
  text-decoration: none;
}

.button-primary {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
}

.button-secondary {
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: #0f172a;
}
</style>
