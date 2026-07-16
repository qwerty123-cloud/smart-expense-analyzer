<template>
  <div class="auth-page">
    <div class="auth-card card">
      <div class="auth-header">
        <p class="step-label">Create account</p>
        <h1>Create your account</h1>
        <p>Set up your profile and get started with a smart expense plan.</p>
      </div>

      <form class="auth-form" @submit.prevent="handleRegister" autocomplete="off">
        <input v-model="name" name="name" type="text" placeholder="Full Name" autocomplete="name" required />
        <input v-model="email" name="email" type="email" placeholder="Email" autocomplete="email" required />
        <input v-model="mobile" name="mobile" type="tel" placeholder="Mobile No" autocomplete="tel" required />
        <input v-model="dob" name="dob" type="date" placeholder="Date of Birth" autocomplete="bday" required />
        <input v-model="password" name="password" type="password" placeholder="Password" autocomplete="new-password" required />
        <input v-model="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" autocomplete="new-password" required />
        <button type="submit">Register</button>
      </form>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

      <p class="switch-text">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const { register } = useAuthStore();
const name = ref('');
const email = ref('');
const mobile = ref('');
const dob = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

async function handleRegister() {
  if (!name.value || !email.value || !mobile.value || !dob.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Please fill in every field.';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  const result = await register(name.value, email.value, password.value, mobile.value, dob.value);
  if (result.success) {
    successMessage.value = result.message;
    errorMessage.value = '';
    setTimeout(() => {
      router.push('/menu');
    }, 900);
  } else {
    successMessage.value = '';
    errorMessage.value = result.message;
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.auth-card {
  width: 100%;
  max-width: 430px;
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
}

.auth-header h1 {
  margin: 0 0 8px;
  font-size: 2rem;
  color: #14213d;
}

.step-label {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 999px;
  background: #dcfce7;
  color: #15803d;
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.auth-header p {
  color: #64748b;
  margin-bottom: 24px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form input {
  padding: 14px 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 14px;
  font-size: 1rem;
  background: #f8fafc;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.auth-form input:focus {
  border-color: rgba(37, 99, 235, 0.45);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
}

.auth-form button {
  padding: 14px 16px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: #ffffff !important;
  font-weight: 800;
  font-size: 1rem;
  text-align: center;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.18);
}

.switch-text {
  margin-top: 16px;
  text-align: center;
  color: #64748b;
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

.success-message {
  margin-top: 10px;
  text-align: center;
  color: #059669;
  font-weight: 700;
}
</style>
