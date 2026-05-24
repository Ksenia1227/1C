<template>
  <div class="container">
    <div class="content">
      <h1>
        Добро пожаловать на наш сайт 
        <span class="highlight-name">«Название»</span>
      </h1>
      <h2>
        Описание
      </h2>
      <router-link v-if="isAuth" to="/practice"
          ><button>Приступить к практике</button></router-link
        >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()

const isAuth = computed(() => store.state.auth.isAuth)
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: calc(100vh - 44px);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-main);
  padding-right: 5%;
  position: relative;
}

.content {
  max-width: 50%;
  z-index: 1;
  position: relative;
}

h1 {
  margin-bottom: 1rem;
  font-weight: 500;
}

h2 {
  font-size: clamp(1rem, 3vw, 1.2rem);
  margin-bottom: 1rem;
  font-weight: 500;
}

.highlight-name {
  font-weight: 600;
}

button {
  padding: 10px 24px;
  background-color: var(--color-buttndis);
  color: var(--color-text);
  font-family: var(--font-main);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--color-buttn);
}

@media (max-width: 768px) {
  .container {
    align-items: center; 
    padding-right: 0; 
  }

  .content {
    text-align: center; 
    max-width: 90%; 
  }

  .bottom-left-image {
    width: clamp(150px, 60%, 750px); 
  }
}
</style>
