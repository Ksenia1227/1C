<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Остатки растениеводства</h3>
      <div class="ost-list">
        <div v-for="(ost, idx) in formData.balances" :key="idx" class="ost-card">
          <div class="card-header">
            <span>Остаток {{ idx + 1 }} </span>
            <button type="button" class="remove-btn" @click="removeBalance(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Наименование</label>
              <select v-model="ost.nomenclature_id">
                <option :value="null">Выберите номенклатуру</option>
                <option
                  v-for="nomenclature in nomenclatures"
                  :key="nomenclature.nomenclature_id"
                  :value="nomenclature.nomenclature_id"
                >
                  {{ nomenclature.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Счет</label>
              <select v-model="ost.account_id">
                <option :value="null">Выберите счет</option>
                <option
                  v-for="account in accounts"
                  :key="account.account_id"
                  :value="account.account_id"
                >
                  {{ account.code }} - {{ account.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Склад</label>
              <select v-model="ost.building_id">
                <option :value="null">Выберите склад</option>
                <option
                  v-for="building in buildings"
                  :key="building.building_id"
                  :value="building.building_id"
                >
                  {{ building.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Серия (партия)</label>
              <input v-model="ost.batch" type="text" />
            </div>
            <div class="form-field">
              <label>Количество</label>
              <input v-model.number="ost.quantity" type="number" step="0.01" />
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
               <select v-model="ost.unit_id">
                <option :value="null">Выберите единицу измерения</option>
                <option
                  v-for="unit in units"
                  :key="unit.unit_id"
                  :value="unit.unit_id"
                >
                  {{ unit.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Код номенклатуры</label>
              <input v-model="ost.code" type="text" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="ost.department_id">
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
          </div>
        </div>
        <button type="button" class="add-btn" @click="addBalance">+ Добавить остаток</button>
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
  name: "CropOstForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        balances: [],
      },
    };
  },
  computed: {
    ...mapState("plantBalance", {
      storeBalances: (state) => state.balances,
      storeNomenclatures: (state) => state.nomenclatures,
      storeAccounts: (state) => state.accounts,
      storeBuildings: (state) => state.buildings,
      storeUnits: (state) => state.units,
      storeDivisions: (state) => state.divisions,
      storeLoading: (state) => state.loading,
    }),
    nomenclatures() {
      return this.storeNomenclatures || [];
    },
    accounts() {
      return this.storeAccounts || [];
    },
    buildings() {
      return this.storeBuildings || [];
    },
    units() {
      return this.storeUnits || [];
    },
    divisions() {
      return this.storeDivisions || [];
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("plantBalance", [
      "fetchBalances",
      "saveBalance",
      "fetchNomenclatures",
      "fetchAccounts",
      "fetchBuildings",
      "fetchUnits",
      "fetchDivisions",
    ]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await Promise.all([
        this.fetchBalances(),
        this.fetchNomenclatures(),
        this.fetchAccounts(),
        this.fetchBuildings(),
        this.fetchUnits(),
        this.fetchDivisions(),
      ]);

      if (
        this.storeBalances &&
        Array.isArray(this.storeBalances) &&
        this.storeBalances.length > 0
      ) {
        this.formData.balances = this.storeBalances.map((b) => {
          return {
            ...b,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.balances = [];
      }

      this.loading = false;
    },

    addBalance() {
      this.formData.balances.push({
        tempId: this.generateTempId(),
        nomenclature_id: null,
        account_id: null,
        building_id: null,
        batch: "",
        quantity: null,
        unit_id: null,
        code: "",
        department_id: null,
      });
    },

    removeBalance(index) {
      if (confirm("Вы уверены, что хотите удалить этот остаток?")) {
        this.formData.balances.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.balances.length; i++) {
        const balance = this.formData.balances[i];

        if (!balance.nomenclature_id && !balance.balance_id) {
          console.log(`Остаток ${i + 1} не имеет номенклатуры, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in balance) {
          if (key !== "tempId") {
            cleanData[key] = balance[key];
          }
        }

        await this.saveBalance(cleanData);
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

.ost-card {
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
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: rgba(244, 67, 54, 0.3);
  transform: scale(1.02);
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
  transition: all 0.2s ease;
  margin-top: 8px;
}

.add-btn:hover {
  background: rgba(156, 39, 176, 0.25);
  transform: translateY(-1px);
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
  .form-actions {
    flex-direction: column;
  }
  .save-btn,
  .reset-btn {
    width: 100%;
  }
}
</style>