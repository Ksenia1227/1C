<template>
  <div class="page-container">
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
    <div v-if="generated" class="data-report">
      <h1 class="report-title">Данные организации</h1>

      <details class="data-section">
        <summary>Карточка остатка (растениеводство)</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Счет</th>
                <th>Склад</th>
                <th>Серия (партия)</th>
                <th>Количество</th>
                <th>Ед. изм.</th>
                <th>Код номенклатуры</th>
                <th>Подразделение</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in generated.crop_ost" :key="index">
                <td>{{ item[0] }}</td>
                <td>{{ item[1] }}</td>
                <td>{{ item[2] }}</td>
                <td>{{ item[3] }}</td>
                <td>{{ item[4] }}</td>
                <td>{{ item[5] }}</td>
                <td>{{ item[6] }}</td>
                <td>{{ item[7] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Ввод остатков животноводство</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Счет</th>
                <th>Инвентарный номер</th>
                <th>Подразделение</th>
                <th>Склад</th>
                <th>Живая масса, кг</th>
                <th>Сумма, руб</th>
                <th>Первоначальная стоимость, руб</th>
                <th>Срок полезного использования, мес</th>
                <th>Дата принятия к учету</th>
                <th>Количество голов</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(liveOst, index) in generated.livestock.ani_ost"
                :key="index"
              >
                <td>{{ liveOst[0] }}</td>
                <td>{{ liveOst[1] }}</td>
                <td>{{ liveOst[2] }}</td>
                <td>{{ liveOst[3] }}</td>
                <td>{{ liveOst[4] }}</td>
                <td>{{ liveOst[5] }}</td>
                <td>{{ liveOst[6] }}</td>
                <td>{{ liveOst[7] }}</td>
                <td>{{ liveOst[8] }}</td>
                <td>{{ liveOst[9] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Материалы и товары</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Вид номенклатуры</th>
                <th>Наименование</th>
                <th>Полное Наименование</th>
                <th>Единица</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in generated.materials.materials_table"
                :key="index"
              >
                <td>{{ item[0] }}</td>
                <td>{{ item[1] }}</td>
                <td>{{ item[2] }}</td>
                <td>{{ item[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Остатки материалов и товаров</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Номенклатура</th>
                <th>Счет</th>
                <th>Склад</th>
                <th>Количество</th>
                <th>Ед. изм.</th>
                <th>Номер</th>
                <th>Контрагент</th>
                <th>Стоимость, руб</th>
                <th>Подразделение</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in generated.materials.materials_ost_table"
                :key="index"
              >
                <td>{{ item[0] }}</td>
                <td>{{ item[1] }}</td>
                <td>{{ item[2] }}</td>
                <td>{{ item[3] }}</td>
                <td>{{ item[4] }}</td>
                <td>{{ item[5] }}</td>
                <td>{{ item[6] }}</td>
                <td>{{ item[7] }}</td>
                <td>{{ item[8] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
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
        cropOst:
          "заполнить остатки по растениеводству (семена, удобрения, ГСМ)",
        animalOst: "заполнить остатки по животноводству",
        materials: "заполнить номенклатуру и остатки материалов и товаров",
      },
    };
  },

  computed: {
    generated() {
      return this.$store.state.generator?.data;
    },

    currentTaskText() {
      return (
        this.taskTexts[this.currentMainButton] || "заполнить необходимые данные"
      );
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

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
  async mounted() {
    if (!this.generated) {
      await this.$store.dispatch("generator/loadData");
    }
  },
};
</script>

<style scoped>
.page-container {
  width: 100%;
  background: var(--color-bg);
}

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

.data-report {
  margin: 24px;
  padding: 24px;
  background: var(--color-bg);
  border-radius: 16px;
  border: 1px solid rgba(156, 39, 176, 0.3);
}

.report-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-text);
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.data-section {
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(156, 39, 176, 0.15);
}

.data-section summary {
  padding: 14px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  user-select: none;
  color: #9c27b0;
  background: rgba(0, 0, 0, 0.1);
}

.data-card {
  padding: 20px;
  border-top: 1px solid rgba(156, 39, 176, 0.15);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 24px;
}

.info-item {
  font-size: 14px;
  color: #000;
}

.info-item.full-width {
  grid-column: span 2;
}

.info-item strong {
  color: #9c27b0;
}

.table-wrapper {
  overflow-x: auto;
  padding: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid rgba(156, 39, 176, 0.15);
  color: #000;
}

th {
  background: rgba(156, 39, 176, 0.1);
  font-weight: 600;
  color: #9c27b0;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
  color: #000;
}

pre {
  background: rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  color: #000;
  white-space: pre-wrap;
  margin: 0;
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

  .data-report {
    margin: 16px;
    padding: 16px;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
  .info-item.full-width {
    grid-column: span 1;
  }
}
</style>
