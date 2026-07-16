<template>
  <section class="intro-shell">
    <div class="intro-card card">
      <div class="intro-left">
        <div class="intro-header">
          <div class="brand-mark">SEA</div>
          <div>
            <p class="eyebrow">Smart finance made simple</p>
            <h1>See every expense. Stay in control.</h1>
            <p>Smart Expense Analyzer helps you track spending, compare categories, and finish your budget tasks quickly with a polished and easy workflow.</p>
          </div>
        </div>

        <!-- stepper removed per request: only action buttons remain -->

        <div class="intro-actions">
          <router-link class="button-primary" to="/login">Get Started</router-link>
          <router-link class="button-secondary" to="/register">Create Account</router-link>
        </div>
      </div>

      <div class="intro-right">
        <div class="intro-grid">
          <article class="intro-panel">
            <h2>Organize Expenses</h2>
            <p>Add transactions in seconds and keep every expense neatly categorized.</p>
          </article>
          <article class="intro-panel">
            <h2>Track Your Progress</h2>
            <p>Monitor your monthly totals and quickly spot where your money goes.</p>
          </article>
          <article class="intro-panel">
            <h2>Finish with Confidence</h2>
            <p>Complete your work, review history, and exit when your session is complete.</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.intro-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
  background: linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%);
}

.intro-card {
  width: min(95vw, 1080px);
  aspect-ratio: 3 / 2; /* landscape rectangle (3:2) */
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 20px;
  box-shadow: 0 30px 90px rgba(15, 23, 42, 0.10);
  padding: 28px;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 28px;
  align-items: center;
}

.intro-left {
  padding: 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.intro-right {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-header {
  display: flex;
  gap: 24px;
  align-items: center;
}

.brand-mark {
  width: 82px;
  height: 82px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  font-size: 1.6rem;
}

/* stepper removed - no sequence shown on intro page */

.eyebrow {
  margin: 0 0 12px;
  font-size: 0.88rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #2563eb;
  font-weight: 700;
}

.intro-header h1 {
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 3.75rem);
  line-height: 1.02;
}

.intro-header p {
  margin: 16px 0 0;
  max-width: 680px;
  color: #475569;
  font-size: 1.05rem;
  line-height: 1.8;
}

.intro-grid {
  display: grid;
  grid-auto-rows: 1fr;
  gap: 18px;
  width: 100%;
}

.intro-panel {
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 24px;
  padding: 28px;
}

.intro-panel h2 {
  margin: 0 0 10px;
  font-size: 1.25rem;
}

.intro-panel p {
  margin: 0;
  color: #64748b;
  line-height: 1.7;
}

.intro-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.button-primary,
.button-secondary {
  padding: 16px 26px;
  border-radius: 18px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button-primary:hover,
.button-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(37, 99, 235, 0.16);
}

.button-primary {
  background: linear-gradient(135deg, #2563eb, #8b5cf6);
  color: white;
}

.button-secondary {
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: #0f172a;
}

.button-secondary:hover,
.button-primary:hover {
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .intro-card {
    grid-template-columns: 1fr;
    aspect-ratio: auto;
    padding: 20px;
  }

  .intro-right {
    order: -1;
  }

  .intro-grid {
    grid-template-columns: 1fr;
  }
}
</style>
