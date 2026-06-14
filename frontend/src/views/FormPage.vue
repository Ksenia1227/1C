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
          <div v-if="currentMainButton === 'organization'">
            <OrganizationForm />
          </div>

          <div v-else-if="currentMainButton === 'contractors'">
            <ContractorsForm />
          </div>

          <div v-else-if="currentMainButton === 'contract'">
            <ContractCon />
          </div>

          <div v-else-if="currentMainButton === 'employees'">
            <EmployeesForm />
          </div>

          <div v-else-if="currentMainButton === 'contractEmp'">
            <ContractEmp />
          </div>

          <div v-else-if="currentMainButton === 'crop'">
            <CropForm />
          </div>

          <div v-else-if="currentMainButton === 'cropPosev'">
            <CropFormPosev />
          </div>

          <div v-else-if="currentMainButton === 'livestock'">
            <LivestockForm />
          </div>

          <div v-else-if="currentMainButton === 'buildings'">
            <BuildingsForm />
          </div>

          <div v-else-if="currentMainButton === 'machinery'">
            <MachineryForm />
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
        <summary>Организация</summary>

        <div class="data-card">
          <div class="info-grid">
            <div class="info-item">
              <strong>Вид:</strong> {{ generated.organization?.[0] || "-" }}
            </div>
            <div class="info-item">
              <strong>Сокращенное наименование:</strong>
              {{ generated.organization?.[1] || "-" }}
            </div>
            <div class="info-item">
              <strong>Полное наименование:</strong>
              {{ generated.organization?.[2] || "-" }}
            </div>
            <div class="info-item">
              <strong>ИНН:</strong> {{ generated.organization?.[3] || "-" }}
            </div>
            <div class="info-item">
              <strong>КПП:</strong> {{ generated.organization?.[4] || "-" }}
            </div>
            <div class="info-item">
              <strong>ОГРН:</strong> {{ generated.organization?.[5] || "-" }}
            </div>
            <div class="info-item">
              <strong>Дата регистрации:</strong>
              {{ generated.organization?.[6] }}
            </div>
            <div class="info-item">
              <strong>Регистрирующий орган:</strong>
              {{ generated.organization?.[7] || "-" }}
            </div>
            <div class="info-item">
              <strong>Юридический адрес:</strong>
              {{ generated.organization?.[8] || "-" }}
            </div>
            <div class="info-item">
              <strong>Фактический адрес:</strong>
              {{ generated.organization?.[9] || "-" }}
            </div>
            <div class="info-item">
              <strong>Телефон:</strong>
              {{ generated.organization?.[10] || "-" }}
            </div>
            <div class="info-item">
              <strong>Электронная почта:</strong>
              {{ generated.organization?.[11] || "-" }}
            </div>
          </div>
        </div>
      </details>

      <details class="data-section">
        <summary>Подразделения</summary>

        <div class="data-card">
          <ul>
            <li v-for="division in generated.divisions" :key="division">
              {{ division }}
            </li>
          </ul>
        </div>
      </details>

      <details class="data-section">
        <summary>Банковские реквизиты</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Банк</th>
                <th>Расчетный счет</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(bank, index) in generated.banks" :key="index">
                <td>{{ bank[0] }}</td>
                <td>{{ bank[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Налоговая инспекция</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Код инспекции</th>
                <th>Наименование</th>
                <th>Полное наименование</th>
                <th>ОКТМО</th>
                <th>ОКАТО</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(tax, index) in generated.tax" :key="index">
                <td>{{ tax[0] }}</td>
                <td>{{ tax[1] }}</td>
                <td>{{ tax[2] }}</td>
                <td>{{ tax[3] }}</td>
                <td>{{ tax[4] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Пенсионный фонд (ПФР)</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Регистрационный номер</th>
                <th>Код территориального органа</th>
                <th>Наименование территориального органа</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(pfr, index) in generated.pfr" :key="index">
                <td>{{ pfr[0] }}</td>
                <td>{{ pfr[1] }}</td>
                <td>{{ pfr[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Фонд социального страхования (ФСС)</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Регистрационный номер</th>
                <th>Код подчиненности</th>
                <th>Территориальный орган</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(fss, index) in generated.fss" :key="index">
                <td>{{ fss[0] }}</td>
                <td>{{ fss[1] }}</td>
                <td>{{ fss[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Коды статистики</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ОКОПФ</th>
                <th>ОКФС</th>
                <th>ОКВЭД</th>
                <th>ОКПО</th>
                <th>Код территориального органа Росстата</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(stat, index) in generated.stat" :key="index">
                <td>{{ stat[0] }}</td>
                <td>{{ stat[1] }}</td>
                <td>{{ stat[2] }}</td>
                <td>{{ stat[3] }}</td>
                <td>{{ stat[4] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Номенклатура (растениеводство)</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Вид номенклатуры</th>
                <th>Наименование</th>
                <th>Полное наименование</th>
                <th>Единица</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in generated.nomenclature.table_data"
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
        <summary>Поля</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Группа</th>
                <th>Наименование</th>
                <th>Площадь поля, га</th>
                <th>Код</th>
                <th>Подразделение</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(field, index) in generated.fields" :key="index">
                <td>{{ field.group }}</td>
                <td>{{ field.name }}</td>
                <td>{{ field.area }}</td>
                <td>{{ field.code }}</td>
                <td>{{ field.division }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Культуры</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Группа</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(crop, index) in generated.posev.crop_table_data"
                :key="index"
              >
                <td>{{ crop.name }}</td>
                <td>{{ crop.group }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Карточка структуры посевных площадей</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Группа</th>
                <th>Поле</th>
                <th>Подразделение</th>
                <th>Культура</th>
                <th>Площадь поля, га</th>
                <th>Год</th>
                <th>Состав почв</th>
                <th>Рекомендации по удобрениям</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(posev, index) in generated.posev.posev_data"
                :key="index"
              >
                <td>{{ posev[0] }}</td>
                <td>{{ posev[1] }}</td>
                <td>{{ posev[2] }}</td>
                <td>{{ posev[3] }}</td>
                <td>{{ posev[4] }}</td>
                <td>{{ posev[5] }}</td>
                <td>{{ posev[6] }}</td>
                <td>{{ posev[7] }}</td>
                <td>{{ posev[8] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Поголовье по группам</summary>

        <div class="data-card">
          <pre>{{ generated.livestock.summary }}</pre>
        </div>
      </details>

      <details class="data-section">
        <summary>Животные</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Инвентарный номер</th>
                <th>Пол</th>
                <th>Дата рождения</th>
                <th>Порода</th>
                <th>Группа</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(live, index) in generated.livestock.livestock"
                :key="index"
              >
                <td>{{ live[0] }}</td>
                <td>{{ live[1] }}</td>
                <td>{{ formatDate(live[2]) }}</td>
                <td>{{ live[3] }}</td>
                <td>{{ live[4] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Здания и сооружения</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Назначение</th>
                <th>Площадь, м²</th>
                <th>Стоимость, млн ₽</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(building, index) in generated.buildings" :key="index">
                <td>{{ building[0] }}</td>
                <td>{{ building[1] }}</td>
                <td>{{ building[2] }}</td>
                <td>{{ building[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Машинно-тракторный парк</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Изготовитель</th>
                <th>Местонахождение</th>
                <th>Марка</th>
                <th>Дата выпуска</th>
                <th>Номер паспорта (регистрационный)</th>
                <th>Мощность, л.с</th>
                <th>Номер двигателя</th>
                <th>Заводской номер</th>
                <th>Срок службы, мес</th>
                <th>Первоначальная стоимость</th>
                <th>Дата покупки</th>
                <th>Дата ввода в эксплуатацию</th>
                <th>Дата снятия с учета</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(machine, index) in generated.machines" :key="index">
                <td>{{ machine[0] }}</td>
                <td>{{ machine[1] }}</td>
                <td>{{ machine[2] }}</td>
                <td>{{ machine[3] }}</td>
                <td>{{ machine[4] }}</td>
                <td>{{ machine[5] }}</td>
                <td>{{ machine[6] }}</td>
                <td>{{ machine[7] }}</td>
                <td>{{ machine[8] }}</td>
                <td>{{ machine[9] }}</td>
                <td>{{ machine[10] }}</td>
                <td>{{ machine[11] }}</td>
                <td>{{ machine[12] }}</td>
                <td>{{ machine[13] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Контрагенты</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Комментарий</th>
                <th>Вид контрагента</th>
                <th>Наименование для документа</th>
                <th>Наименование в программе</th>
                <th>Страна регистрации</th>
                <th>ИНН</th>
                <th>КПП</th>
                <th>ОГРН</th>
                <th>Банк</th>
                <th>Расчетный счет</th>
                <th>Юридический адрес</th>
                <th>Фактический адрес</th>
                <th>Телефон</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(contractor, index) in generated.contractors
                  .contractors_table"
                :key="index"
              >
                <td>{{ contractor[0] }}</td>
                <td>{{ contractor[1] }}</td>
                <td>{{ contractor[2] }}</td>
                <td>{{ contractor[3] }}</td>
                <td>{{ contractor[4] }}</td>
                <td>{{ contractor[5] }}</td>
                <td>{{ contractor[6] }}</td>
                <td>{{ contractor[7] }}</td>
                <td>{{ contractor[8] }}</td>
                <td>{{ contractor[9] }}</td>
                <td>{{ contractor[10] }}</td>
                <td>{{ contractor[11] }}</td>
                <td>{{ contractor[12] }}</td>
                <td>{{ contractor[13] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>Договоры с контрагентами</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Вид договора</th>
                <th>Наименование</th>
                <th>Дата</th>
                <th>Срок действия</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(contract, index) in generated.contractors
                  .contracts_table"
                :key="index"
              >
                <td>{{ contract[0] }}</td>
                <td>{{ contract[1] }}</td>
                <td>{{ contract[2] }}</td>
                <td>{{ contract[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details class="data-section">
        <summary>
          Сотрудники ({{ generated.employees.employees.length }})
        </summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Пол</th>
                <th>Дата рождения</th>
                <th>ИНН</th>
                <th>СНИЛС</th>
                <th>Гражданство</th>
                <th>Паспорт</th>
                <th>Кем выдан</th>
                <th>Дата выдачи</th>
                <th>Адрес по прописке</th>
                <th>Телефон</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(employee, index) in generated.employees.employees"
                :key="index"
              >
                <td>{{ employee[0] }}</td>
                <td>{{ employee[1] }}</td>
                <td>{{ employee[2] }}</td>
                <td>{{ employee[3] }}</td>
                <td>{{ employee[4] }}</td>
                <td>{{ employee[5] }}</td>
                <td>{{ employee[6] }}</td>
                <td>{{ employee[7] }}</td>
                <td>{{ employee[8] }}</td>
                <td>{{ employee[9] }}</td>
                <td>{{ employee[10] }}</td>
                <td>{{ employee[11] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
      <details class="data-section">
        <summary>Договоры с сотрудниками</summary>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Дата приема на работу</th>
                <th>Подразделение</th>
                <th>Должность</th>
                <th>Оклад</th>
                <th>Ставка</th>
                <th>Вид занятости</th>
                <th>Тип документа</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(contract, index) in generated.employees.contracts"
                :key="index"
              >
                <td>{{ contract[0] }}</td>
                <td>{{ contract[1] }}</td>
                <td>{{ contract[2] }}</td>
                <td>{{ contract[3] }}</td>
                <td>{{ contract[4] }} ₽</td>
                <td>{{ contract[5] }}</td>
                <td>{{ contract[6] }}</td>
                <td>{{ contract[7] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import OrganizationForm from "./forms/OrganizationForm.vue";
import ContractorsForm from "./forms/ContractorsForm.vue";
import EmployeesForm from "./forms/EmployeesForm.vue";
import CropForm from "./forms/CropForm.vue";
import CropFormPosev from "./forms/CropFormPosev.vue";
import LivestockForm from "./forms/LivestockForm.vue";
import BuildingsForm from "./forms/BuildingsForm.vue";
import MachineryForm from "./forms/MachineryForm.vue";
import ContractCon from "./forms/ContractCon.vue";
import ContractEmp from "./forms/ContractEmp.vue";

export default {
  name: "DataEntryView",

  components: {
    OrganizationForm,
    ContractorsForm,
    ContractCon,
    EmployeesForm,
    ContractEmp,
    CropForm,
    CropFormPosev,
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

      taskTexts: {
        organization:
          "заполнить основные сведения (организация, подразделения, банки, налоговая, ПФР, ФСС, статистика)",
        contractors: "заполнить сведения о контрагентах",
        contract: "заполнить сведения о договорах с контрагентами",
        employees: "заполнить сведения о сотрудниках",
        contractEmp: "заполнить сведения о договорах с сотрудниками",
        crop: "заполнить информацию о полях и культурах",
        cropPosev: "заполнить информацию о структуре посевных площадей",
        livestock: "заполнить данные о поголовье и животных",
        buildings: "заполнить сведения о зданиях и сооружениях",
        machinery: "заполнить данные машинно-тракторного парка",
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
        "organization",
        "contractors",
        "contract",
        "employees",
        "contractEmp",
        "crop",
        "cropPosev",
        "livestock",
        "buildings",
        "machinery",
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
      if (buttonId === "organization") {
        return (
          this.currentMainButton === "organization" ||
          this.currentMainButton === "contractors" ||
          this.currentMainButton === "contract" ||
          this.currentMainButton === "employees" ||
          this.currentMainButton === "contractEmp"
        );
      } else if (buttonId === "crop") {
        return (
          this.currentMainButton === "crop" ||
          this.currentMainButton === "cropPosev"
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
