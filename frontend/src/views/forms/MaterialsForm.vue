<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Номенклатура</h3>
      <div class="nomenclatures-list">
        <div v-for="(nomenclature, idx) in formData.nomenclatures" :key="idx" class="nomenclature-card">
          <div class="card-header">
            <span>Номенклатура  {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeNomenclature(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Вид номенклатуры</label>
              <select v-model="nomenclature.item_type">
                <option :value="1">Продукция</option>
                <option :value="2">Животные</option>
                <option :value="3">Материалы</option>
                <option :value="4">Оборудование</option>
                <option :value="5">Спецодежда</option>
                <option :value="6">Топливо</option>
                <option :value="7">Услуги</option>
                <option :value="8">Товары на ответственном хранении</option>
                <option :value="9">Товары на комиссии</option>
              </select>
            </div>
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="nomenclature.name" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Полное наименование</label>
              <input v-model="nomenclature.full_name" type="text" />
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
              <select v-model="nomenclature.unit_id">
                <option :value="1">Штука</option>
                <option :value="2">Литр</option>
                <option :value="3">Комплект</option>
                <option :value="4">Килограмм</option>
                <option :value="5">Тонна</option>
                <option :value="6">Грамм</option>
                <option :value="7">Центнер</option>
                <option :value="8">Голова</option>
                <option :value="9">Гектар</option>
                <option :value="10">Метр</option>
                <option :value="11">Квадратный метр</option>
                <option :value="12">Кубический метр</option>
                <option :value="13">Мешок</option>
                <option :value="14">Рулон</option>
                <option :value="15">Доза</option>
                <option :value="16">Упаковка</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addNomenclature">+ Добавить номенклатуру</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Остатки материалов и товаров</h3>
      <div class="ost-list">
        <div v-for="(ost, idx) in formData.balances" :key="idx" class="ost-card">
          <div class="card-header">
            <span>Остаток {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeBalance(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Номенклатура</label>
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
              <label>Количество</label>
              <input v-model.number="ost.quantity" type="number" step="0.01" />
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
              <select v-model="ost.unit_id">
                <option :value="null">Выберите единицу</option>
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
              <label>Номер</label>
              <input v-model="ost.code" type="text" />
            </div>
            <div class="form-field">
              <label>Контрагент</label>
              <select v-model="ost.counterparty_id">
                <option :value="null">Выберите контрагента</option>
                <option
                  v-for="counterparty in counterparties"
                  :key="counterparty.counterparty_id"
                  :value="counterparty.counterparty_id"
                >
                  {{ counterparty.name_program || counterparty.name_for_doc }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Стоимость, руб</label>
              <input v-model.number="ost.cost" type="number" step="0.01" />
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
  name: "MaterialsForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        nomenclatures: [],
        balances: [],
      },
    };
  },
  computed: {
    ...mapState("crop", {
      storeNomenclatures: (state) => state.nomenclatures,
      storeNomenclaturesLoading: (state) => state.loading,
    }),
    ...mapState("goodsBalance", {
      storeBalances: (state) => state.balances,
      storeAccounts: (state) => state.accounts,
      storeBuildings: (state) => state.buildings,
      storeUnits: (state) => state.units,
      storeCounterparties: (state) => state.counterparties,
      storeDivisions: (state) => state.divisions,
      storeBalancesLoading: (state) => state.loading,
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
    counterparties() {
      return this.storeCounterparties || [];
    },
    divisions() {
      return this.storeDivisions || [];
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("crop", [
      "fetchNomenclatures",
      "saveNomenclature",
    ]),
    ...mapActions("goodsBalance", [
      "fetchBalances",
      "saveBalance",
      "fetchAccounts",
      "fetchBuildings",
      "fetchUnits",
      "fetchCounterparties",
      "fetchDivisions",
    ]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await Promise.all([
        this.fetchNomenclatures(),
        this.fetchBalances(),
        this.fetchAccounts(),
        this.fetchBuildings(),
        this.fetchUnits(),
        this.fetchCounterparties(),
        this.fetchDivisions(),
      ]);

      if (this.storeNomenclatures && Array.isArray(this.storeNomenclatures)) {
        this.formData.nomenclatures = this.storeNomenclatures.map((n) => {
          return {
            ...n,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.nomenclatures = [];
      }

      if (this.storeBalances && Array.isArray(this.storeBalances) && this.storeBalances.length > 0) {
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

    addNomenclature() {
      this.formData.nomenclatures.push({
        tempId: this.generateTempId(),
        item_type: null,
        name: "",
        full_name: "",
        unit_id: null,
      });
    },

    removeNomenclature(index) {
      if (confirm("Вы уверены, что хотите удалить эту номенклатуру?")) {
        this.formData.nomenclatures.splice(index, 1);
      }
    },

    addBalance() {
      this.formData.balances.push({
        tempId: this.generateTempId(),
        nomenclature_id: null,
        account_id: null,
        building_id: null,
        quantity: null,
        unit_id: null,
        code: "",
        counterparty_id: null,
        cost: null,
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

      for (let i = 0; i < this.formData.nomenclatures.length; i++) {
        const nomenclature = this.formData.nomenclatures[i];
        if (!nomenclature.name && !nomenclature.nomenclature_id) {
          console.log(`Номенклатура ${i + 1} не имеет названия, пропускаем`);
          continue;
        }
        const cleanData = {};
        for (const key in nomenclature) {
          if (key !== "tempId") {
            cleanData[key] = nomenclature[key];
          }
        }
        await this.saveNomenclature(cleanData);
      }

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

.material-card,
.nomenclature-card,
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
  .form-field.full-width {
    grid-column: span 1;
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