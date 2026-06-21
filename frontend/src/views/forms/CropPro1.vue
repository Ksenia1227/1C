<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Путевой лист</h3>
      <div class="items-list">
        <div
          v-for="(item, idx) in formData.waybills"
          :key="idx"
          class="item-card"
        >
          <div class="card-header">
            <span>Запись {{ idx + 1 }}</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeWaybill(idx)"
            >
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Дата</label>
              <input v-model="item.date" type="date" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="item.department_id">
                <option :value="null">Выберите подразделение</option>
                <option
                  v-for="d in divisions"
                  :key="d.division_id"
                  :value="d.division_id"
                >
                  {{ d.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Сотрудник</label>
              <select v-model="item.employee_id">
                <option :value="null">Выберите сотрудника</option>
                <option
                  v-for="e in employees"
                  :key="e.employee_id"
                  :value="e.employee_id"
                >
                  {{ e.last_name }} {{ e.name }} {{ e.middle_name || '' }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Техника (ОС)</label>
              <select v-model="item.fixed_asset_id">
                <option :value="null">Выберите технику</option>
                <option
                  v-for="a in fixedAssets"
                  :key="a.fixed_asset_id"
                  :value="a.fixed_asset_id"
                >
                  {{ a.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Вид работы</label>
              <select v-model="item.work_type_id">
                <option :value="null">Выберите вид работы</option>
                <option
                  v-for="w in workTypes"
                  :key="w.work_type_id"
                  :value="w.work_type_id"
                >
                  {{ w.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Прицеп</label>
              <select v-model="item.trailer">
                <option :value="null">Выберите технику</option>
                <option
                  v-for="a in fixedAssets"
                  :key="a.fixed_asset_id"
                  :value="a.fixed_asset_id"
                >
                  {{ a.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Структура посевных площадей</label>
              <select v-model="item.structure_acreage_id">
                <option :value="null">Выберите структуру</option>
                <option
                  v-for="s in structureAcreages"
                  :key="s.structure_acreage_id"
                  :value="s.structure_acreage_id"
                >
                  {{ s.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
              <select v-model="item.unit_id">
                <option :value="null">Выберите единицу</option>
                <option
                  v-for="u in units"
                  :key="u.unit_id"
                  :value="u.unit_id"
                >
                  {{ u.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Выработано</label>
              <input
                v-model.number="item.produced_quantity"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            <div class="form-field">
              <label>Счёт затрат</label>
              <select v-model="item.cost_account_id">
                <option :value="null">Выберите счет</option>
                <option
                  v-for="a in accounts"
                  :key="a.account_id"
                  :value="a.account_id"
                >
                  {{ a.code }} - {{ a.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addWaybill">
          + Добавить запись
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
  name: "WaybillForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        waybills: [],
      },
    };
  },
  computed: {
    ...mapState("waybill", {
      storeWaybills: (state) => state.waybills,
      divisions: (state) => state.divisions,
      employees: (state) => state.employees,
      fixedAssets: (state) => state.fixedAssets,
      workTypes: (state) => state.workTypes,
      structureAcreages: (state) => state.structureAcreages,
      units: (state) => state.units,
      accounts: (state) => state.accounts,
    }),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("waybill", [
      "fetchWaybills",
      "saveWaybill",
      "fetchDivisions",
      "fetchEmployees",
      "fetchFixedAssets",
      "fetchWorkTypes",
      "fetchStructureAcreages",
      "fetchUnits",
      "fetchAccounts",
    ]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;
      await Promise.all([
        this.fetchWaybills(),
        this.fetchDivisions(),
        this.fetchEmployees(),
        this.fetchFixedAssets(),
        this.fetchWorkTypes(),
        this.fetchStructureAcreages(),
        this.fetchUnits(),
        this.fetchAccounts(),
      ]);

      if (this.storeWaybills && Array.isArray(this.storeWaybills)) {
        this.formData.waybills = this.storeWaybills.map((i) => ({
          ...i,
          tempId: this.generateTempId(),
        }));
      } else {
        this.formData.waybills = [];
      }

      this.loading = false;
    },

    addWaybill() {
      this.formData.waybills.push({
        tempId: this.generateTempId(),
        date: "",
        department_id: null,
        employee_id: null,
        fixed_asset_id: null,
        work_type_id: null,
        trailer: "",
        structure_acreage_id: null,
        unit_id: null,
        produced_quantity: null,
        cost_account_id: null,
      });
    },

    removeWaybill(index) {
      if (confirm("Удалить запись?")) {
        this.formData.waybills.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (const item of this.formData.waybills) {
        if (!item.employee_id && !item.waybill_id) continue;

        const cleanData = {};
        for (const key in item) {
          if (key !== "tempId") {
            cleanData[key] = item[key];
          }
        }
        await this.saveWaybill(cleanData);
      }

      this.loading = false;
      await this.loadData();
      alert("Данные сохранены");
    },

    resetForm() {
      if (confirm("Сбросить все изменения?")) {
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
  grid-template-columns: 150px 1fr;
  align-items: center;
  gap: 12px;
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

.item-card {
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
  font-size: 16px;
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
  .form-field {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .form-field label {
    font-weight: 600;
  }
}
</style>
