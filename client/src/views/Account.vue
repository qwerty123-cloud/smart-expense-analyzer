<template>
  <div class="account-page">
    <section class="account-shell">
      <div class="account-header">
        <div class="profile-chip">
          <div class="profile-avatar">
            <span>{{ profileInitial }}</span>
            <span class="status-dot" title="Active"></span>
          </div>
          <div class="profile-meta">
            <div class="name-row">
              <h2>{{ user?.name || 'Guest User' }}</h2>
              <span class="badge">Personal</span>
            </div>
            <p>{{ user?.email || 'No email available' }}</p>
          </div>
        </div>

        <div class="summary-strip">
          <div class="summary-item">
            <span>Status</span>
            <strong class="status-active">● Active</strong>
          </div>
          <div class="summary-item">
            <span>Account type</span>
            <strong>Personal</strong>
          </div>
          <div class="summary-item">
            <span>Member since</span>
            <strong>{{ memberSince }}</strong>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <div class="info-card card">
          <div class="card-head">
            <h3>👤 Profile details</h3>
            <p>Personal information linked to your account.</p>
          </div>

          <div class="detail-list">
            <div class="detail-row">
              <span>🧑 Full name</span>
              <strong>{{ user?.name || 'Not set' }}</strong>
            </div>
            <div class="detail-row">
              <span>✉️ Email address</span>
              <strong>{{ user?.email || 'Not set' }}</strong>
            </div>
            <div class="detail-row">
              <span>📱 Mobile number</span>
              <strong>{{ user?.mobile || 'Not added' }}</strong>
            </div>
            <div class="detail-row">
              <span>🎂 Date of birth</span>
              <strong>{{ formattedDob }}</strong>
            </div>
          </div>
        </div>

        <div class="info-card card">
          <div class="card-head">
            <h3>🔒 Security &amp; settings</h3>
            <p>Helpful reminders to keep your account safe.</p>
          </div>

          <ul class="tips-list">
            <li>
              <strong>🔑 Strong password</strong>
              <p>Use a unique password and keep it updated.</p>
            </li>
            <li>
              <strong>🛡️ Secure access</strong>
              <p>Enable extra verification whenever possible.</p>
            </li>
            <li>
              <strong>🔄 Profile updates</strong>
              <p>Keep your mobile and email details current.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../store/auth';

const { user } = useAuthStore();

const profileInitial = computed(() => {
  const name = user.value?.name || 'User';
  return name.charAt(0).toUpperCase();
});

const formattedDob = computed(() => {
  if (!user.value?.dob) return 'Not added';
  const date = new Date(user.value.dob);
  if (Number.isNaN(date.getTime())) return user.value.dob;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
});

const memberSince = computed(() => {
  if (!user.value?.joinedAt) return '2024';
  const date = new Date(user.value.joinedAt);
  if (Number.isNaN(date.getTime())) return '2024';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
});
</script>

<style scoped>
.account-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 0 18px;
  min-height: calc(100vh - 140px);
}

.account-shell {
  width: 100%;
  max-width: 1100px;
  display: grid;
  gap: 18px;
  min-height: calc(100vh - 180px);
  grid-auto-rows: 1fr;
  align-content: center;
  justify-items: center;
}

.account-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  padding: 14px 18px;
  border-radius: 24px;
  background: linear-gradient(135deg, #ffffff, #f8fbff);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
  width: 100%;
}

.profile-chip {
  display: flex;
  align-items: center;
  gap: 14px;
}

.profile-avatar {
  position: relative;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  font-size: 1.4rem;
  font-weight: 800;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.22);
  overflow: hidden;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #22c55e;
  border: 3px solid #ffffff;
}

.profile-meta h2 {
  margin: 2px 0 4px;
  font-size: 1.2rem;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.profile-meta p {
  margin: 0;
  color: #64748b;
}

.eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  color: #2563eb;
  font-weight: 700;
}

.summary-strip {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.summary-item {
  min-width: 110px;
  padding: 10px 12px;
  border-radius: 16px;
  background: #f8fafc;
}

.summary-item span {
  display: block;
  color: #64748b;
  font-size: 0.8rem;
  margin-bottom: 4px;
}

.summary-item strong {
  font-size: 0.95rem;
}

.status-active {
  color: #16a34a;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: stretch;
}

.info-card {
  background: white;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-head h3 {
  margin: 0;
  font-size: 1.2rem;
}

.card-head p {
  margin: 6px 0 0;
  color: #64748b;
}

.detail-list {
  display: grid;
  gap: 10px;
  margin-top: 14px;
  flex: 1 1 auto;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  border-radius: 16px;
  background: #f8fafc;
}

.detail-row span {
  color: #64748b;
  font-size: 0.9rem;
}

.detail-row strong {
  text-align: right;
  color: #0f172a;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
  display: grid;
  gap: 10px;
  flex: 1 1 auto;
}

.tips-list li {
  padding: 12px 14px;
  border-radius: 16px;
  background: #f8fafc;
}

.tips-list strong {
  display: block;
  margin-bottom: 4px;
}

.tips-list p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

@media (max-width: 780px) {
  .account-header {
    align-items: flex-start;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .account-page {
    min-height: auto;
    overflow: visible;
    padding: 12px 0 24px;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-row strong {
    text-align: left;
  }
}
</style>
