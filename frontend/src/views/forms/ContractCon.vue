<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Договоры с контрагентами</h3>
      <div class="contracts-list">
        <div
          v-for="(contract, idx) in formData.contracts"
          :key="contract.tempId || idx"
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
              <label>Контрагент</label>
              <select v-model="contract.counterparty_id" required>
                <option :value="null">Выберите контрагента</option>
                <option
                  v-for="counterparty in counterparties"
                  :key="counterparty.counterparty_id"
                  :value="counterparty.counterparty_id"
                >
                  {{
                    counterparty.name_program ||
                    counterparty.name_for_doc ||
                    "Без названия"
                  }}
                </option>
              </select>
            </div>

            <div class="form-field">
              <label>Вид договора</label>
              <select v-model="contract.contract_type_id">
                <option value="">Выберите вид договора</option>
                <option value="С поставщиком">С поставщиком</option>
                <option value="С покупателем">С покупателем</option>
                <option value="Прочее">Прочее</option>
              </select>
            </div>
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="contract.name" type="text" />
            </div>
            <div class="form-field">
              <label>Дата договора</label>
              <input v-model="contract.date" type="date" />
            </div>
            <div class="form-field">
              <label>Срок действия, лет</label>
              <input
                v-model.number="contract.validity_period"
                type="number"
                step="1"
              />
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
  name: "ContractsForm",
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
    ...mapState("contract", {
      storeContracts: (state) => state.contracts,
      storeLoading: (state) => state.loading,
    }),
    ...mapState("counterparty", {
      storeCounterparties: (state) => state.counterparties,
    }),
    counterparties() {
      return this.storeCounterparties || [];
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("contract", ["fetchContracts", "saveContract"]),
    ...mapActions("counterparty", ["fetchCounterparties"]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await Promise.all([this.fetchContracts(), this.fetchCounterparties()]);

      this.formData.contracts = this.storeContracts.map((c) => {
        return {
          ...c,
          tempId: this.generateTempId(),
        };
      });

      this.loading = false;
    },

    addContract() {
      this.formData.contracts.push({
        tempId: this.generateTempId(),
        contract_type_id: "",
        name: "",
        date: "",
        validity_period: "",
        counterparty_id: null,
      });
    },

    removeContract(index) {
      if (confirm("Вы уверены, что хотите удалить этот договор?")) {
        this.formData.contracts.splice(index, 1);
        if (this.formData.contracts.length === 0) {
          this.addContract();
        }
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.contracts.length; i++) {
        const contract = this.formData.contracts[i];

        if (!contract.counterparty_id) {
          console.log(`Договор ${i + 1} не имеет контрагента, пропускаем`);
          continue;
        }

        if (!contract.name && !contract.contract_id) {
          console.log(`Договор ${i + 1} не имеет названия, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in contract) {
          if (key !== "tempId") {
            cleanData[key] = contract[key];
          }
        }

        await this.saveContract(cleanData);
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
  grid-template-columns: 180px 1fr;
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
    gap: 8px;
  }
  .form-field label {
    font-weight: 600;
  }
}
</style>
