<template>
  <div class="container">
    <div class="image-container">
      <img :src="welcomeImage" alt="Агропромышленный комплекс" class="welcome-image" />
    </div>
    <div class="content">
      <h1>
        <span class="highlight-name">«Генератор справочных и оперативных данных сквозного контрольного примера»</span>
      </h1>
      <h2>
        Обучающая платформа, которая помогает понять внутреннюю структуру агропромышленного комплекса и освоить работу в «1С:Бухгалтерия сельскохозяйственного предприятия». Система автоматически создаёт уникальные учебные примеры со всеми справочниками, остатками и документами. Вам остаётся лишь следовать технологической карте и заполнять данные шаг за шагом.
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
import welcomeImage from "@/assets/111.png"

const store = useStore()

const isAuth = computed(() => store.state.auth.isAuth)
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 44px);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-main);
  padding: 0 8%;
  position: relative;
  gap: 60px;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-image {
  max-width: 100%;
  height: auto;
}

.content {
  flex: 1;
  max-width: 50%;
  z-index: 1;
  position: relative;
}

h1 {
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #000;
  line-height: 1.3;
}

h2 {
  font-size: clamp(1rem, 3vw, 1.2rem);
  margin-bottom: 2rem;
  font-weight: 400;
  color: #4a4a6a;
  line-height: 1.6;
  letter-spacing: 0.3px;
}

.highlight-name {
  font-size: clamp(1.3rem, 3.8vw, 2.2rem);
  margin-top: 0.3rem;
  line-height: 1.2;
  background: linear-gradient(135deg, #9c27b0, #e91e63);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  display: inline-block;
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

@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    justify-content: center;
    padding: 40px 5%;
    gap: 30px;
  }
  
  .content {
    max-width: 100%;
    text-align: center;
  }
  
  .image-container {
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    justify-content: center;
    padding: 20px;
  }

  .content {
    text-align: center; 
    max-width: 100%; 
  }
  
  .image-container {
    max-width: 70%;
  }

  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1rem;
  }

  .highlight-name {
    font-size: 1.5rem;
  }

  button {
    padding: 10px 24px;
    font-size: 14px;
  }
}
</style>
