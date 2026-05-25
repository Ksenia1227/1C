<template>
  <div class="page">
    <div class="steps-wrapper">

      <div class="line"></div>

      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        @click="goTo('/form')"
      >
        <div class="circle">
          {{ index + 1 }}
        </div>

        <p class="label">
          {{ step.title }}
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {
          title: "НСИ"
        },
        {
          title: "Ведомость остатков"
        },
        {
          title: "Процессы"
        },
        {
          title: "Оборотно-сальдовая ведомость"
        }
      ]
    }
  },

  methods: {
    goTo(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.page {
  width: 100%;
  min-height: calc(100vh - 44px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-main);
  padding: 20px;
  box-sizing: border-box;
}

.steps-wrapper {
  position: relative;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.line {
  position: absolute;
  top: 28px;
  left: 1%;
  right: 8%;
  height: 4px;
  background: var(--color-buttndis);
  z-index: 1;
  border-radius: 10px;
}

.step {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-align: center;
}

.step:hover {
  transform: scale(1.05);
}

.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-buttn);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.label {
  margin-top: 12px;
  font-size: 14px;
  max-width: 140px;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .steps-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .line {
    display: none;
  }
}
</style>