<template>
  <div class="register-container">
    <form class="register-form" @submit.prevent="registration">
      <h2>Регистрация</h2>
      <input
        v-model="formData.name"
        class="input-field"
        placeholder="ФИО"
        required
      />
      <input
        v-model="formData.email"
        class="input-field"
        placeholder="Логин"
        required
      />
      <input
        type="password"
        v-model="formData.password"
        class="input-field"
        placeholder="Пароль"
        required
      />
      <input
        type="password"
        v-model="confirmPassword"
        class="input-field"
        placeholder="Повторите пароль"
        required
      />
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
    // handleFileUpload() {
    //   this.file = this.$refs.avatar.files[0];
    // },
    async registration() {
      if (this.formData.password !== this.confirmPassword) {
        alert("Пароли не совпадают");
        return;
      }

      const formData = new FormData();
      Object.entries(this.formData).forEach(([key, value]) =>
        formData.append(key, value)
      );
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
  background-color: var(--color-card);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
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
  border: 1px solid var(--color-input);
  background-color: var(--color-card);
  border-radius: 6px;
  font-size: 16px;
  color: var(--color-text);
  font-family: var(--font-main);
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

.register-button {
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

.register-button:hover {
  background: var(--color-buttn);
}

.login-text {
  margin-top: 20px;
  color: var(--color-text);
  font-family: var(--font-main);
}

.login-text a {
  color: var(--color-buttn);
  font-family: var(--font-main);
  text-decoration: underline;
  text-decoration: none;
  font-weight: bold;
}

.login-text a:hover {
  text-decoration: underline;
}

// input[type="date"]::-webkit-calendar-picker-indicator {
//   filter: invert(1); 
//   opacity: 0.5;
//   cursor: pointer;
// }

.custom-file-upload {
  background-color: var(--color-card);
  border: 1px solid var(--color-input);
  border-radius: 6px;
  padding: 10px 12px;
  cursor: pointer;
  color: var(--color-placeholder); 
  font-family: var(--font-main);
  margin: 10px 0;
  text-align: left;
}

.hidden-input {
  display: none;
}
</style>
