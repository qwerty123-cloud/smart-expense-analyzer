<template>
  <div class="auth-page">
    <div class="auth-card card">
      <div class="auth-header">
        <p class="step-label">Secure access</p>
        <h1>Login to continue</h1>
        <p>Sign in to reach your dashboard and manage your expenses instantly.</p>
      </div>

      <div class="auth-right">
        <form class="auth-form" @submit.prevent="handleLogin" autocomplete="off">
          <input v-model="email" name="email" type="email" placeholder="Email" autocomplete="email" required />
          <input v-model="password" name="password" type="password" placeholder="Password" autocomplete="current-password" required />
          <button type="submit" class="login-btn">Login</button>
        </form>

        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

        <p class="switch-text">
          New here?
          <router-link to="/register">Create an account</router-link>
        </p>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const { login } = useAuthStore();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');

async function handleLogin() {
  const result = await login(email.value, password.value);
  if (result.success) {
    successMessage.value = result.message;
    errorMessage.value = '';
    setTimeout(() => {
      router.push('/menu');
    }, 800);
  } else {
    successMessage.value = '';
    errorMessage.value = result.message;
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: linear-gradient(180deg, #f5f8ff 0%, #eef6ff 100%);
}

.auth-card {
  width: min(95vw, 960px);
  background: white;
  border-radius: 24px;
  padding: 36px 44px;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 28px;
  align-items: center;
  justify-items: center;
}

.auth-header h1 {
  margin: 0 0 12px;
  font-size: 2.2rem;
  color: #14213d;
}

.step-label {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.auth-header p {
  color: #64748b;
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form input {
  padding: 12px 14px;
  border: 1px solid #e6eefb;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
}

.auth-right {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
}

.auth-form button,
.login-btn {
  padding: 14px 16px;
  border: 2px solid #1e40af;
  border-radius: 12px;
  background: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.18);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.auth-form button:hover,
.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(37, 99, 235, 0.22);
}

.switch-text {
  margin-top: 12px;
  text-align: center;
  color: #64748b;
}

.success-message {
  margin-top: 10px;
  text-align: center;
  color: #059669;
  font-weight: 700;
}

.switch-text a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

.error-message {
  margin-top: 12px;
  color: #dc2626;
  text-align: center;
}

@media (max-width: 880px) {
  .auth-card {
    grid-template-columns: 1fr;
    padding: 28px;
  }
}
</style>
