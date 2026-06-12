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
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #000;
}

h2 {
  font-size: clamp(1rem, 3vw, 1.2rem);
  margin-bottom: 2rem;
  font-weight: 400;
  color: #555;
  line-height: 1.5;
}

.highlight-name {
  font-weight: 600;
}

button {
  padding: 12px 32px;
  background: #9c27b0;
  color: white;
  font-family: var(--font-main);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(156, 39, 176, 0.3);
}

button:hover {
  background: #7b1fa2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(156, 39, 176, 0.4);
}

@media (max-width: 768px) {
  .container {
    align-items: center; 
    padding-right: 0; 
    text-align: center;
  }

  .content {
    text-align: center; 
    max-width: 90%; 
  }

  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1rem;
  }

  .button {
    padding: 10px 24px;
    font-size: 14px;
  }
}
</style>
