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
        <component :is="currentFormComponent" />
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
// Импорт компонентов форм
import OrganizationForm from "./forms/OrganizationForm.vue";
import CropForm from "./forms/CropForm.vue";
import LivestockForm from "./forms/LivestockForm.vue";
import BuildingsForm from "./forms/BuildingsForm.vue";
import MachineryForm from "./forms/MachineryForm.vue";

export default {
  name: "DataEntryView",

  components: {
    OrganizationForm,
    CropForm,
    LivestockForm,
    BuildingsForm,
    MachineryForm,
  },

  data() {
    return {
      currentMainButton: "organization",
      mainButtons: [
        { id: "organization", label: "Общая информация" },
        { id: "crop", label: "Растениеводство" },
        { id: "livestock", label: "Животноводство" },
        { id: "buildings", label: "Здания и сооружения" },
        { id: "machinery", label: "Машино-тракторный парк" },
      ],

      mainForms: {
        organization: "OrganizationForm",
        crop: "CropForm",
        livestock: "LivestockForm",
        buildings: "BuildingsForm",
        machinery: "MachineryForm",
      },

      taskTexts: {
        organization:
          "заполнить сведения об организации, подразделениях, банковских реквизитах и контрагентах",
        crop: "заполнить информацию о полях, культурах и структуре посевных площадей",
        livestock:
          "заполнить данные о поголовье, группах животных и вводе остатков",
        buildings: "заполнить сведения о зданиях и сооружениях",
        machinery: "заполнить данные машинно-тракторного парка",
      },
    };
  },

  computed: {
    // Текущий ID активной кнопки
    currentActiveId() {
      return this.currentMainButton;
    },

    // Текущий компонент формы
    currentFormComponent() {
      return this.mainForms[this.currentMainButton];
    },

    // Текущий текст задания
    currentTaskText() {
      return (
        this.taskTexts[this.currentActiveId] || "заполнить необходимые данные"
      );
    },

    // Общий список всех форм в порядке навигации
    allFormsList() {
      return ["organization", "crop", "livestock", "buildings", "machinery"];
    },

    // Текущий индекс формы в общем списке
    currentFormIndex() {
      return this.allFormsList.findIndex((id) => id === this.currentMainButton);
    },

    // Общее количество форм
    totalFormsCount() {
      return this.allFormsList.length;
    },

    // Есть ли предыдущая форма
    hasPrev() {
      return this.currentFormIndex > 0;
    },

    // Есть ли следующая форма
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

.group-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
  padding-left: 8px;
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

.nav-header {
  padding: 20px 32px;
  margin-top: auto;
  background: var(--color-block);
  border-top: 1px solid rgba(156, 39, 176, 0.2);
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

.nav-arrows {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(156, 39, 176, 0.2);
}

.nav-arrow {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(156, 39, 176, 0.3);
  color: var(--color-text);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: rgba(255, 255, 255, 0.6);
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

/* Адаптивность */
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

  .group-title {
    width: 100%;
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

  .form-content :deep(.dynamic-form) {
    padding: 16px;
  }
}
</style>
