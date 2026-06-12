<template>
  <header class="main-header">
    <router-link to="/" class="home-link">
    </router-link>

    <div class="auth-actions">
      <template v-if="!isAuth">
        <router-link
          to="/login"
          exact-active-class="active"
          class="auth-button"
        >
          Войти
        </router-link>
      </template>

      <template v-else>
        <button class="logout-button auth-button" @click="logout">
          Выйти
        </button>
      </template>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    const uid = localStorage.getItem("uid");
    const role = localStorage.getItem("role");
    if (uid) {
      this.$store.commit("auth/setAuth", true);
      this.$store.commit("auth/setModerator", role === "moderator");
    } else {
      this.$store.commit("auth/setAuth", false);
      this.$store.commit("auth/setModerator", false);
    }
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.auth.isAuth,
      isModerator: (state) => state.auth.isModerator,
    }),
  },
};
</script>

<style scoped>
.main-header {
  background-color: var(--color-bg);
  height: 44px;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px color-mix(in srgb, var(--color-sth) 30%, transparent);
}

.home-link {
  text-decoration: none;
  color: var(--color-text);
  font-size: 18px;
  font-weight: 600;
}
 
.auth-actions {
  z-index: 1001;
  margin-left: auto;
  margin-right: 20px;
}

.auth-button {
  color: var(--color-text);
  font-family: var(--font-main);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.logout-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  font-family: var(--font-main);
}
</style>
