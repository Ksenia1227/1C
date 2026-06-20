<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Оприходование</h3>
      <div class="items-list">
        <div
          v-for="(item, idx) in formData.receipts"
          :key="idx"
          class="item-card"
        >
          <div class="card-header">
            <span>Запись {{ idx + 1 }}</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeReceipt(idx)"
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
              <label>Контрагент</label>
              <select v-model="item.counterparty_id">
                <option :value="null">Выберите контрагента</option>
                <option v-for="c in counterparties" :key="c.counterparty_id" :value="c.counterparty_id">
                  {{ c.name_program || c.name_for_doc }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Склад</label>
              <select v-model="item.building_id">
                <option :value="null">Выберите склад</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">
                  {{ b.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Вид движения</label>
              <select v-model="item.movement_id">
                <option :value="null">Выберите вид движения</option>
                <option
                  v-for="m in movements"
                  :key="m.movement_id"
                  :value="m.movement_id"
                >
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Номенклатура</label>
              <select v-model="item.nomenclature_id">
                <option :value="null">Выберите номенклатуру</option>
                <option v-for="n in nomenclatures" :key="n.nomenclature_id" :value="n.nomenclature_id">
                  {{ n.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество</label>
              <input
                v-model.number="item.quantity"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            <div class="form-field">
              <label>Цена, руб</label>
              <input
                v-model.number="item.price"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            <div class="form-field">
              <label>Счёт учёта</label>
              <select v-model="item.account_id">
                <option :value="null">Выберите счет</option>
                <option v-for="a in accounts" :key="a.account_id" :value="a.account_id">
                  {{ a.code }} - {{ a.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addReceipt">
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
  name: "GoodsReceiptForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        receipts: [],
      },
    };
  },
  computed: {
    ...mapState("goodsReceipt", {
      storeReceipts: (state) => state.receipts,
      counterparties: (state) => state.counterparties,
      buildings: (state) => state.buildings,
      movements: (state) => state.movements,
      nomenclatures: (state) => state.nomenclatures,
      accounts: (state) => state.accounts,
    }),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("goodsReceipt", [
      "fetchReceipts",
      "saveReceipt",
      "fetchCounterparties",
      "fetchBuildings",
      "fetchMovements",
      "fetchNomenclatures",
      "fetchAccounts",
    ]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;
      await Promise.all([
        this.fetchReceipts(),
        this.fetchCounterparties(),
        this.fetchBuildings(),
        this.fetchMovements(),
        this.fetchNomenclatures(),
        this.fetchAccounts(),
      ]);

      if (this.storeReceipts && Array.isArray(this.storeReceipts)) {
        this.formData.receipts = this.storeReceipts.map((i) => ({
          ...i,
          tempId: this.generateTempId(),
        }));
      } else {
        this.formData.receipts = [];
      }

      this.loading = false;
    },

    addReceipt() {
      this.formData.receipts.push({
        tempId: this.generateTempId(),
        date: "",
        counterparty_id: null,
        building_id: null,
        movement_id: null,
        nomenclature_id: null,
        quantity: null,
        price: null,
        account_id: null,
      });
    },

    removeReceipt(index) {
      if (confirm("Удалить запись?")) {
        this.formData.receipts.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (const item of this.formData.receipts) {
        if (!item.nomenclature_id && !item.goods_receipt_id) continue;

        const cleanData = {};
        for (const key in item) {
          if (key !== "tempId") {
            cleanData[key] = item[key];
          }
        }
        await this.saveReceipt(cleanData);
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
