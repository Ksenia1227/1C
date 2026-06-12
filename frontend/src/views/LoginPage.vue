<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="go_login">
      <h2>Вход</h2>
      <div class="form-field">
        <input
          v-model="email"
          class="input-field"
          placeholder="Имя пользователя"
          required
        />
      </div>
      <div class="form-field">
        <input
          type="password"
          v-model="password"
          class="input-field"
          placeholder="Пароль"
          required
        />
      </div>
      <button type="submit" class="login-button">Войти</button>
    </form>
    <p class="register-text">
      Нет аккаунта? <router-link to="/register">Зарегистрируйтесь!</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async go_login() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      await this.login(formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 44px);
  background: var(--color-bg);
  font-family: var(--font-main);
}

.login-form {
  background-color: var(--color-card);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(156, 39, 176, 0.2);
  color: #9c27b0;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  font-family: var(--font-main);
}

.form-field {
  margin-bottom: 20px;
}

.form-field label {
  display: block;
  margin-bottom: 8px;
  color: #000000;
  font-weight: 500;
  font-size: 14px;
}

.input-field {
  width: 100%;
  padding: 10px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #000;
  font-family: var(--font-main);
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #9c27b0;
  box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.2);
}

.input-field::placeholder {
  color: #999;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 12px 24px;
  background: #9c27b0;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-main);
  transition: all 0.2s ease;
  margin-top: 8px;
}

.login-button:hover {
  background: #7b1fa2;
  transform: translateY(-1px);
}

.login-button:active {
  transform: translateY(0);
}

.register-text {
  margin-top: 20px;
  text-align: center;
  color: #000;
  font-family: var(--font-main);
}

.register-text a {
  color: #9c27b0;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.register-text a:hover {
  color: #7b1fa2;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-form {
    margin: 20px;
    padding: 24px;
  }
  
  h2 {
    font-size: 20px;
  }
  
  .input-field {
    font-size: 14px;
  }
}
</style>
