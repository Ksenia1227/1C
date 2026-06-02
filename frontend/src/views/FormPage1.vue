<template>
  <div class="two-panel-page">
    <div class="tech-card-panel">
      <div class="tech-card-header">
        <h2>Технологическая карта</h2>
      </div>

      <div class="buttons-group">
        <div
          v-for="button in mainButtons"
          :key="button.id"
          class="tech-button"
          :class="{ active: currentMainButton === button.id }"
          @click="selectMainButton(button.id)"
        >
          <div
            class="dot"
            :class="{ active: currentMainButton === button.id }"
          ></div>
          <span class="button-text">{{ button.label }}</span>
        </div>
      </div>
    </div>

    <div class="form-panel">
      <div class="form-header">
        <div class="task-block">
          <span class="task-label">Задание:</span>
          <span class="task-text">{{ currentTaskText }}</span>
        </div>
      </div>

      <div class="form-content">
        <div v-if="currentMainButton === 'cropOst'">
          <CropOstForm />
        </div>

        <div v-else-if="currentMainButton === 'animalOst'">
          <AnimalOstForm />
        </div>

        <div v-else-if="currentMainButton === 'materials'">
          <MaterialsForm />
        </div>
      </div>

      <div class="nav-header">
        <div class="nav-arrows">
          <button class="nav-arrow" @click="prevForm" :disabled="!hasPrev">
            ←
          </button>
          <span class="form-counter"
            >{{ currentFormIndex + 1 }} / {{ totalFormsCount }}</span
          >
          <button class="nav-arrow" @click="nextForm" :disabled="!hasNext">
            →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CropOstForm from "./forms/CropOstForm.vue";
import AnimalOstForm from "./forms/AnimalOstForm.vue";
import MaterialsForm from "./forms/MaterialsForm.vue";

export default {
  name: "FormPage1",

  components: {
    CropOstForm,
    AnimalOstForm,
    MaterialsForm,
  },

  data() {
    return {
      currentMainButton: "cropOst",

      mainButtons: [
        { id: "cropOst", label: "Остатки растениеводства" },
        { id: "animalOst", label: "Остатки животноводства" },
        { id: "materials", label: "Материалы и товары" },
      ],

      taskTexts: {
        cropOst: "заполнить остатки по растениеводству (семена, удобрения, ГСМ)",
        animalOst: "заполнить остатки по животноводству",
        materials: "заполнить номенклатуру и остатки материалов и товаров",
      },
    };
  },

  computed: {
    currentTaskText() {
      return this.taskTexts[this.currentMainButton] || "заполнить необходимые данные";
    },

    allFormsList() {
      return ["cropOst", "animalOst", "materials"];
    },

    currentFormIndex() {
      return this.allFormsList.findIndex((id) => id === this.currentMainButton);
    },

    totalFormsCount() {
      return this.allFormsList.length;
    },

    hasPrev() {
      return this.currentFormIndex > 0;
    },

    hasNext() {
      return this.currentFormIndex < this.totalFormsCount - 1;
    },
  },

  methods: {
    selectMainButton(buttonId) {
      this.currentMainButton = buttonId;
    },

    nextForm() {
      if (!this.hasNext) return;
      this.currentMainButton = this.allFormsList[this.currentFormIndex + 1];
    },

    prevForm() {
      if (!this.hasPrev) return;
      this.currentMainButton = this.allFormsList[this.currentFormIndex - 1];
    },
  },
};
</script>

<style scoped>
.two-panel-page {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 44px);
  background: var(--color-bg);
  font-family: var(--font-main);
  gap: 24px;
  padding: 24px;
}

.tech-card-panel {
  width: 280px;
  background: var(--color-block);
  border: 1px solid rgba(156, 39, 176, 0.3);
  border-radius: 16px;
  padding: 24px 16px;
  flex-shrink: 0;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.tech-card-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-text);
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.buttons-group {
  margin-bottom: 28px;
}

.tech-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.tech-button:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tech-button.active {
  background: rgba(156, 39, 176, 0.15);
  border: 1px solid rgba(156, 39, 176, 0.3);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
}

.dot.active {
  background: #9c27b0;
  box-shadow: 0 0 6px #9c27b0;
}

.button-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.form-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: var(--color-block);
  border: 1px solid rgba(156, 39, 176, 0.3);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: rgba(156, 39, 176, 0.05);
  border-bottom: 1px solid rgba(156, 39, 176, 0.2);
  border-radius: 16px 16px 0 0;
  flex-wrap: wrap;
  gap: 16px;
}

.task-block {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  padding: 12px 16px;
}

.task-label {
  font-size: 14px;
  font-weight: 600;
  color: #9c27b0;
  text-transform: uppercase;
}

.task-text {
  font-size: 16px;
  font-weight: 500;
  color: black;
}

.nav-header {
  padding: 20px 32px;
  margin-top: auto;
  background: var(--color-block);
  border-top: 1px solid rgba(156, 39, 176, 0.2);
}

.nav-arrows {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.nav-arrow {
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: #9c27b0;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.nav-arrow:hover:not(:disabled) {
  background: rgba(156, 39, 176, 0.3);
  transform: scale(1.05);
  border-color: #9c27b0;
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.form-counter {
  font-size: 14px;
  color: #000000;
  font-weight: 500;
}

.form-content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

.form-content :deep(.form-section) {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid rgba(156, 39, 176, 0.15);
}

.form-content :deep(.form-section h3) {
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(156, 39, 176, 0.2);
  color: #9c27b0;
}

@media (max-width: 768px) {
  .two-panel-page {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .tech-card-panel {
    width: 100%;
  }

  .buttons-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tech-button {
    flex: 0 0 auto;
  }

  .form-header {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }

  .form-content {
    padding: 16px;
  }
}
</style>