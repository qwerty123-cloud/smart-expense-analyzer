import { computed, reactive } from 'vue';
import { api } from '../api/axios';

const TOKEN_KEY = 'token';
const USER_KEY = 'expense-analyzer-user';

function loadCachedUser() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    return null;
  }
}

// On app load, if a token is already saved, optimistically mark the user as
// logged in right away. refreshSession() then confirms in the background
// whether that token is still valid.
const state = reactive({
  isAuthenticated: typeof window !== 'undefined' && Boolean(localStorage.getItem(TOKEN_KEY)),
  user: loadCachedUser()
});

function persistSession(token, user) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function refreshSession() {
  if (typeof window === 'undefined') return;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return;

  try {
    const { data } = await api.get('/auth/me');
    state.isAuthenticated = true;
    state.user = data.user;
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  } catch (error) {
    state.isAuthenticated = false;
    state.user = null;
    clearSession();
  }
}

refreshSession();

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function useAuthStore() {
  async function login(email, password) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(normalizedEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    try {
      const { data } = await api.post('/auth/login', { email: normalizedEmail, password });
      state.isAuthenticated = true;
      state.user = data.user;
      persistSession(data.token, data.user);
      return { success: true, message: data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to log in. Please check your connection and try again.';
      return { success: false, message };
    }
  }

  async function register(name, email, password, mobile, dob) {
    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !mobile || !dob || !password) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(normalizedEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const digitsOnly = String(mobile).replace(/\D/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return { success: false, message: 'Please enter a valid mobile number.' };
    }

    if (String(password).length < 8) {
      return { success: false, message: 'Password must be at least 8 characters long.' };
    }

    try {
      const { data } = await api.post('/auth/register', {
        name: String(name).trim(),
        email: normalizedEmail,
        password: String(password),
        mobile: String(mobile).trim(),
        dob: String(dob)
      });
      state.isAuthenticated = true;
      state.user = data.user;
      persistSession(data.token, data.user);
      return { success: true, message: data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to create account. Please check your connection and try again.';
      return { success: false, message };
    }
  }

  function logout() {
    state.isAuthenticated = false;
    state.user = null;
    clearSession();
  }

  return {
    isAuthenticated: computed(() => state.isAuthenticated),
    user: computed(() => state.user),
    login,
    register,
    logout
  };
}
