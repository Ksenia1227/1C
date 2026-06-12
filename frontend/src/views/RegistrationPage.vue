<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="registration">
      <h2>Регистрация</h2>
      <div class="form-field">
        <input
          v-model="formData.name"
          class="input-field"
          placeholder="ФИО"
          required
        />
      </div>
      <div class="form-field">
        <input
          v-model="formData.email"
          class="input-field"
          placeholder="Логин"
          required
        />
      </div>
      <div class="form-field">
        <input
          type="password"
          v-model="formData.password"
          class="input-field"
          placeholder="Пароль"
          required
        />
      </div>
      <div class="form-field">
        <input
          type="password"
          v-model="confirmPassword"
          class="input-field"
          placeholder="Повторите пароль"
          required
        />
      </div>
      <button type="submit" class="register-button">Зарегистрироваться</button>
    </form>
    <p class="login-text">
      Уже есть аккаунт? <router-link to="/login">Войти в аккаунт!</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        birthDate: "",
        password: "",
      },
      confirmPassword: "",
    };
  },
  methods: {
    ...mapActions({
      registr: "auth/registr",
    }),
    validatePassword(password) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    },
    async registration() {
      if (this.formData.password !== this.confirmPassword) {
        alert("Пароли не совпадают");
        return;
      }

      if (!this.validatePassword(this.formData.password)) {
        alert("Пароль должен содержать минимум 8 символов, включая латинские буквы, цифры и спецсимволы @$!%*?&");
        return;
      }
      await this.registr({ endpoint: "api/auth/signup", formData: this.formData });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 44px);
  background: var(--color-bg);
  font-family: var(--font-main);
}

.register-form {
  background: var(--color-block);
  border: 1px solid rgba(156, 39, 176, 0.3);
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

.input-field[type="date"] {
  color: #000;
}

.input-field[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
}

.input-field[type="date"]::-webkit-calendar-picker-indicator:hover {
  filter: invert(0.3);
}

.register-button {
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

.register-button:hover {
  background: #7b1fa2;
  transform: translateY(-1px);
}

.register-button:active {
  transform: translateY(0);
}

.login-text {
  margin-top: 20px;
  text-align: center;
  color: #000;
  font-family: var(--font-main);
}

.login-text a {
  color: #9c27b0;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.login-text a:hover {
  color: #7b1fa2;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-form {
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
