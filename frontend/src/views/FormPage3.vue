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
            :class="{ active: isActiveMainButton(button.id) }"
            @click="selectMainButton(button.id)"
          >
            <div
              class="dot"
              :class="{ active: isActiveMainButton(button.id) }"
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
          <div v-if="currentMainButton === 'crop'">
            <CropPro />
          </div>

          <div v-else-if="currentMainButton === 'animal'">
            <AnimalPro />
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
        <summary>Оприходование (животноводство)</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Подразделение</th>
                <th>Вид движения</th>
                <th>Номенклатура (группа)</th>
                <th>Количество голов</th>
                <th>Инвентарный номер</th>
                <th>Масса, кг</th>
                <th>Цена, руб</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in generated.processes.process_buy_animal"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item.Подразделение }}</td>
                <td>{{ item["Вид движения"] }}</td>
                <td>{{ item["Номенклатура (группа)"] }}</td>
                <td>{{ item["Количество голов"] }}</td>
                <td>{{ item["Инвентарный номер"] }}</td>
                <td>{{ item["Масса, кг"] }}</td>
                <td>{{ item["Цена, руб"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Приплод</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Счёт затрат</th>
                <th>Вид движения животных</th>
                <th>Склад</th>
                <th>Подразделение</th>
                <th>Продукция</th>
                <th>Инвентарный номер матери</th>
                <th>Инвентарный номер</th>
                <th>Масса, кг</th>
                <th>Счёт учёта</th>
                <th>Пол</th>
                <th>Работник</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in generated.processes.process_birth"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item["Счёт затрат"] }}</td>
                <td>{{ item["Вид движения животных"] }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item.Подразделение }}</td>
                <td>{{ item.Продукция }}</td>
                <td>{{ item["Инвентарный номер матери"] }}</td>
                <td>{{ item["Инвентарный номер"] }}</td>
                <td>{{ item["Масса, кг"] }}</td>
                <td>{{ item["Счёт учёта"] }}</td>
                <td>{{ item.Пол }}</td>
                <td>{{ item.Работник }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Привес</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Счёт затрат</th>
                <th>Подразделение</th>
                <th>Вид движения животных</th>
                <th>Склад</th>
                <th>Инвентарный номер</th>
                <th>Количество голов</th>
                <th>Масса, кг</th>
                <th>Счёт учёта</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes.process_weight_gain"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item["Счёт затрат"] }}</td>
                <td>{{ item.Подразделение }}</td>
                <td>{{ item["Вид движения животных"] }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item["Инвентарный номер"] }}</td>
                <td>{{ item["Количество голов"] }}</td>
                <td>{{ item["Масса, кг"] }}</td>
                <td>{{ item["Счёт учёта"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Перевод животных из одной группы в другую</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Склад до</th>
                <th>Номенклатура отправитель</th>
                <th>Вид движения животных</th>
                <th>Склад</th>
                <th>Подразделение</th>
                <th>Инвентарный номер</th>
                <th>Номенклатура получатель</th>
                <th>Количество голов</th>
                <th>Масса, кг</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes.process_transfer"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item["Склад до"] }}</td>
                <td>{{ item["Номенклатура отправитель"] }}</td>
                <td>{{ item["Вид движения животных"] }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item.Подразделение }}</td>
                <td>{{ item["Инвентарный номер"] }}</td>
                <td>{{ item["Номенклатура получатель"] }}</td>
                <td>{{ item["Количество голов"] }}</td>
                <td>{{ item["Масса, кг"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Надой</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Счёт затрат</th>
                <th>Склад</th>
                <th>Количество доек</th>
                <th>Продукция</th>
                <th>Инвентарный номер</th>
                <th>Количество голов</th>
                <th>Надоено молока за день, л</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes.process_milk_yield"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item["Счёт затрат"] }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item["Количество доек"] }}</td>
                <td>{{ item.Продукция }}</td>
                <td>{{ item["Инвентарный номер"] }}</td>
                <td>{{ item["Количество голов"] }}</td>
                <td>{{ item["Надоено молока за день, л"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Продажа продукции</summary>

        <div class="table-wrapper">
          <h4>Продажа молока</h4>
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Номер</th>
                <th>Контрагент</th>
                <th>Склад</th>
                <th>Номенклатура</th>
                <th>Количество</th>
                <th>Ед. изм.</th>
                <th>Цена, руб/л</th>
                <th>Сумма, руб</th>
                <th>Банковский счёт</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes
                  .process_sale_products.milk_sales"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item.Номер }}</td>
                <td>{{ item.Контрагент }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item.Номенклатура }}</td>
                <td>{{ item.Количество }}</td>
                <td>{{ item["Ед. изм."] }}</td>
                <td>{{ item["Цена, руб/л"] }}</td>
                <td>{{ item["Сумма, руб"] }}</td>
                <td>{{ item["Банковский счёт"] }}</td>
                <td>{{ item.Статус }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-wrapper">
          <h4>Продажа животных</h4>
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Номер</th>
                <th>Контрагент</th>
                <th>Склад</th>
                <th>Инвентарный номер</th>
                <th>Масса</th>
                <th>Ед. изм.</th>
                <th>Цена, руб/кг</th>
                <th>Сумма, руб</th>
                <th>Банковский счёт</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes
                  .process_sale_products.animal_sales"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item.Номер }}</td>
                <td>{{ item.Контрагент }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item["Инвентарный номер"] }}</td>
                <td>{{ item.Масса }}</td>
                <td>{{ item["Ед. изм."] }}</td>
                <td>{{ item["Цена, руб/кг"] }}</td>
                <td>{{ item["Сумма, руб"] }}</td>
                <td>{{ item["Банковский счёт"] }}</td>
                <td>{{ item.Статус }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Оприходование (растениеводство)</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Контагент</th>
                <th>Склад</th>
                <th>Вид движения</th>
                <th>Номенклатура</th>
                <th>Количество, кг</th>
                <th>Цена, руб/кг</th>
                <th>Сумма</th>
                <th>Счёт учёта</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes
                  .process_seed_receipt"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item.Контагент }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item["Вид движения"] }}</td>
                <td>{{ item.Номенклатура }}</td>
                <td>{{ item["Количество, кг"] }}</td>
                <td>{{ item["Цена, руб/кг"] }}</td>
                <td>{{ item.Сумма }}</td>
                <td>{{ item["Счёт учёта"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Путевой лист</summary>

        <!-- Вспашка -->
        <div class="table-wrapper">
          <h4>Вспашка</h4>
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Документ</th>
                <th>Подразделение</th>
                <th>Сотрудник</th>
                <th>Техника</th>
                <th>Прицеп</th>
                <th>Вид работы</th>
                <th>Структура посевных площадей</th>
                <th>Единица измерения</th>
                <th>Выработано, га</th>
                <th>Счёт затрат</th>
                <th>Номенклатура</th>
                <th>Количество, л</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes.process_waybill
                  .top_data"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item.Документ }}</td>
                <td>{{ item.Подразделение }}</td>
                <td>{{ item.Сотрудник }}</td>
                <td>{{ item.Техника }}</td>
                <td>{{ item.Прицеп }}</td>
                <td>{{ item["Вид работы"] }}</td>
                <td>{{ item["Структура посевных площадей"] }}</td>
                <td>{{ item["Единица измерения"] }}</td>
                <td>{{ item["Выработано, га"] }}</td>
                <td>{{ item["Счёт затрат"] }}</td>
                <td>{{ item.Номенклатура }}</td>
                <td>{{ item["Количество, л"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Посев/Удобрения -->
        <div class="table-wrapper">
          <h4>Посев и внесение удобрений</h4>
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Документ</th>
                <th>Подразделение</th>
                <th>Сотрудник</th>
                <th>Техника</th>
                <th>Прицеп</th>
                <th>Вид работы</th>
                <th>Структура посевных площадей</th>
                <th>Единица измерения</th>
                <th>Выработано, га</th>
                <th>Счёт затрат</th>
                <th>Номенклатура (топливо)</th>
                <th>Количество, л</th>
                <th>Склад</th>
                <th>Номенклатура</th>
                <th>Количество, кг</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes.process_waybill
                  .ydob_data"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item.Документ }}</td>
                <td>{{ item.Подразделение }}</td>
                <td>{{ item.Сотрудник }}</td>
                <td>{{ item.Техника }}</td>
                <td>{{ item.Прицеп }}</td>
                <td>{{ item["Вид работы"] }}</td>
                <td>{{ item["Структура посевных площадей"] }}</td>
                <td>{{ item["Единица измерения"] }}</td>
                <td>{{ item["Выработано, га"] }}</td>
                <td>{{ item["Счёт затрат"] }}</td>
                <td>{{ item["Номенклатура (топливо)"] }}</td>
                <td>{{ item["Количество, л"] }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item.Номенклатура }}</td>
                <td>{{ item["Количество, кг"] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Оприходование (основные средства)</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Контагент</th>
                <th>Склад</th>
                <th>Вид движения</th>
                <th>Номенклатура</th>
                <th>Количество</th>
                <th>Цена, руб</th>
                <th>Сумма</th>
                <th>Счёт учёта</th>
                <th>Сотрудник</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in generated.processes
                  .process_fuel_receipt"
                :key="index"
              >
                <td>{{ item.Дата }}</td>
                <td>{{ item.Контагент }}</td>
                <td>{{ item.Склад }}</td>
                <td>{{ item["Вид движения"] }}</td>
                <td>{{ item.Номенклатура }}</td>
                <td>{{ item.Количество }}</td>
                <td>{{ item["Цена, руб"] }}</td>
                <td>{{ item.Сумма }}</td>
                <td>{{ item["Счёт учёта"] }}</td>
                <td>{{ item.Сотрудник }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import AnimalPro from "./forms/AnimalPro.vue";
import CropPro from "./forms/CropPro.vue";

export default {
  name: "DataEntryView",

  components: {
    AnimalPro,
    CropPro
  },

  data() {
    return {
      currentMainButton: "crop",

      mainButtons: [
        { id: "crop", label: "Растениеводство" },
        { id: "animal", label: "Животноводство" }
      ],

      taskTexts: {
        crop:
          "заполнить процессы растениеводства",
        animal: "заполнить процессы животноводства"
      },
    };
  },

  computed: {
    generated() {
      return this.$store.state.generator?.data;
    },

    // Текущий текст задания
    currentTaskText() {
      return (
        this.taskTexts[this.currentMainButton] || "заполнить необходимые данные"
      );
    },

    // Общий список всех форм в порядке навигации
    allFormsList() {
      return [
        "crop",
        "animal"
      ];
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
    isActiveMainButton(buttonId) {
      if (buttonId === "crop") {
        return (
          this.currentMainButton === "crop" 
        );
      } 
      return this.currentMainButton === buttonId;
    },

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

h4 {
  margin: 25px 0 15px 0;
  padding-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #9c27b0;
  border-bottom: 1px solid rgba(156, 39, 176, 0.3);
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
