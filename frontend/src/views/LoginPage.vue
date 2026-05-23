<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="go_login">
      <h2>Вход</h2>
      <input
        v-model="email"
        class="input-field"
        placeholder="Имя пользователя"
        required
      />
      <input
        type="password"
        v-model="password"
        class="input-field"
        placeholder="Пароль"
        required
      />
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
  margin-bottom: 24px;
  color: var(--color-text);
  font-family: var(--font-main);
}

.input-field {
  width: 100%;
  padding: 10px 12px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid var(--color-input);
  background-color: var(--color-card);
  font-family: var(--font-main);
  font-size: 16px;
  color: var(--color-text);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-sth);
  box-shadow: 0 0 6px var(--color-sth);
  background-color: var(--color-card);
}

input::placeholder {
  /* color: var(--color-text); */
  /* color: rgba(187, 225, 250, 0.6); */
  color: var(--color-placeholder);
  font-family: var(--font-main);
}

.login-button {
  width: 100%;
  padding: 10px 24px;
  background-color: var(--color-buttndis);
  color: var(--color-text);
  font-family: var(--font-main);
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.login-button:hover {
  background: var(--color-buttn);
}

.register-text {
  margin-top: 20px;
  color: var(--color-text);
  font-family: var(--font-main);
}

.register-text a {
  color: var(--color-buttn);
  text-decoration: underline;
  text-decoration: none;
  font-weight: bold;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>
