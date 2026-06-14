<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Договоры с сотрудниками</h3>
      <div class="contracts-list">
        <div
          v-for="(contract, idx) in formData.contracts"
          :key="idx"
          class="contract-card"
        >
          <div class="card-header">
            <span>Договор {{ idx + 1 }}</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeContract(idx)"
            >
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <label>Сотрудник</label>
              <select v-model="contract.employee_id" required>
                <option :value="null">Выберите сотрудника</option>
                <option
                  v-for="employee in employees"
                  :key="employee.employee_id"
                  :value="employee.employee_id"
                >
                  {{ employee.last_name }} {{ employee.name }}
                  {{ employee.middle_name || "" }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Номер договора</label>
              <input v-model="contract.code" type="text" />
            </div>
            <div class="form-field">
              <label>Дата приема на работу</label>
              <input v-model="contract.hire_date" type="date" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="contract.department_id">
                <option :value="null">Выберите подразделение</option>
                <option 
                  v-for="division in divisions" 
                  :key="division.division_id"
                  :value="division.division_id"
                >
                  {{ division.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Должность</label>
              <select v-model="contract.position_id">
                <option :value="1">Агроном</option>
                <option :value="2">Полевод</option>
                <option :value="3">Механизатор</option>
                <option :value="4">Тракторист</option>
                <option :value="5">Комбайнер</option>
                <option :value="6">Зоотехник</option>
                <option :value="7">Ветеринарный врач</option>
                <option :value="8">Скотник</option>
                <option :value="9">Доярка</option>
                <option :value="10">Инженер-механик</option>
                <option :value="11">Слесарь-ремонтник</option>
                <option :value="12">Водитель</option>
                <option :value="13">Главный бухгалтер</option>
                <option :value="14">Бухгалтер</option>
                <option :value="15">Директор</option>
                <option :value="16">Заместитель директора</option>
                <option :value="17">Менеджер</option>
                <option :value="18">Главный ветврач</option>
                <option :value="19">Главный агроном</option>
                <option :value="20">Агрохимик</option>
                <option :value="21">Программист 1С</option>
                <option :value="22">Системный администратор</option>
              </select>
            </div>
            <div class="form-field">
              <label>Оклад, ₽</label>
              <input
                v-model.number="contract.salary"
                type="number"
                step="0.01"
              />
            </div>
            <div class="form-field">
              <label>Ставка</label>
              <input v-model.number="contract.rate" type="number" step="0.1" />
            </div>
            <div class="form-field">
              <label>Вид занятости</label>
              <select v-model="contract.employment_type">
                <option value="Основное место работы">
                  Основное место работы
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Тип документа</label>
              <select v-model="contract.document_type">
                <option value="Прием на работу">Прием на работу</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addContract">
          + Добавить договор
        </button>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="save-btn" :disabled="loading">
        {{ loading ? "Сохранение..." : "Сохранить" }}
      </button>
      <button type="button" class="reset-btn" @click="resetForm">
        Сбросить
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EmployeeContractsForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        contracts: [],
      },
    };
  },
  computed: {
    ...mapState("employeeContract", {
      storeContracts: (state) => state.contracts,
      storeLoading: (state) => state.loading,
    }),
    ...mapState("organization", {
      storeDivisions: (state) => state.divisions,
    }),
    ...mapState("employee", {
      storeEmployees: (state) => state.employees,
    }),
    divisions() {
      return this.storeDivisions || [];
    },
    employees() {
      return this.storeEmployees || [];
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("employeeContract", [
      "fetchEmployeeContracts",
      "saveEmployeeContract",
    ]),
    ...mapActions("employee", ["fetchEmployees"]),
    ...mapActions("organization", ["fetchDivisions"]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await Promise.all([this.fetchEmployeeContracts(), this.fetchDivisions(), this.fetchEmployees()]);

      if (this.storeContracts && Array.isArray(this.storeContracts)) {
        this.formData.contracts = this.storeContracts.map((c) => {
          return {
            ...c,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.contracts = [];
      }

      this.loading = false;
    },

    addContract() {
      this.formData.contracts.push({
        tempId: this.generateTempId(),
        code: "",
        hire_date: "",
        department_id: "",
        position_id: "",
        salary: null,
        rate: null,
        employment_type: "",
        document_type: "",
        employee_id: null,
      });
    },

    removeContract(index) {
      if (confirm("Вы уверены, что хотите удалить этот договор?")) {
        this.formData.contracts.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.contracts.length; i++) {
        const contract = this.formData.contracts[i];

        if (!contract.employee_id) {
          console.log(`Договор ${i + 1} не имеет сотрудника, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in contract) {
          if (key !== "tempId") {
            cleanData[key] = contract[key];
          }
        }

        await this.saveEmployeeContract(cleanData);
      }

      this.loading = false;
      await this.loadData();
      alert("Данные сохранены");
    },

    resetForm() {
      if (confirm("Вы уверены, что хотите сбросить все изменения?")) {
        this.loadData();
      }
    },
  },
};
</script>

<style scoped>
.dynamic-form {
  max-width: 100%;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h3 {
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(156, 39, 176, 0.2);
  color: #9c27b0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-field {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 12px;
}

.form-field.full-width {
  grid-column: span 2;
}

.form-field label {
  margin: 0;
  color: #000000;
  font-weight: normal;
}

.form-field input,
.form-field select {
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
}

.contract-card {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(156, 39, 176, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(156, 39, 176, 0.2);
  font-weight: 600;
  color: #9c27b0;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  cursor: pointer;
  font-size: 16px;
}

.add-btn {
  padding: 12px 20px;
  border-radius: 10px;
  background: rgba(156, 39, 176, 0.15);
  border: 1px solid rgba(156, 39, 176, 0.3);
  color: #9c27b0;
  cursor: pointer;
  width: fit-content;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(156, 39, 176, 0.2);
}

.save-btn {
  padding: 10px 24px;
  border-radius: 8px;
  background: #9c27b0;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-btn {
  padding: 10px 24px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(156, 39, 176, 0.3);
  color: #000;
  cursor: pointer;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-field.full-width {
    grid-column: span 1;
  }
  .form-field {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
