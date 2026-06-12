<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Контрагенты</h3>
      <div class="contractors-list">
        <div
          v-for="(contractor, idx) in formData.contractors"
          :key="contractor.tempId || idx"
          class="contractor-card"
        >
          <div class="card-header">
            <span>Контрагент {{ idx + 1 }}</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeContractor(idx)"
            >
              ✕
            </button>
          </div>

          <div class="form-grid">
            <div class="form-field">
              <label>Комментарий</label>
              <input v-model="contractor.comment" type="text" />
            </div>

            <div class="form-field">
              <label>Вид контрагента</label>
              <select v-model="contractor.counterparty_type_id">
                <option :value="1">Юридическое лицо</option>
                <option :value="2">Физическое лицо</option>
                <option :value="3">Индивидуальный предприниматель (ИП)</option>
                <option :value="4">
                  Общество с ограниченной ответственностью (ООО)
                </option>
                <option :value="5">Акционерное общество (АО)</option>
                <option :value="6">Публичное акционерное общество (ПАО)</option>
                <option :value="7">
                  Крестьянское фермерское хозяйство (КФХ)
                </option>
                <option :value="8">
                  Сельскохозяйственный производственный кооператив (СПК)
                </option>
                <option :value="9">
                  Государственное унитарное предприятие (ГУП)
                </option>
                <option :value="10">
                  Муниципальное унитарное предприятие (МУП)
                </option>
                <option :value="11">Некоммерческая организация</option>
                <option :value="12">Простое товарищество</option>
              </select>
            </div>

            <div class="form-field">
              <label>Наименование для документа</label>
              <input v-model="contractor.name_for_doc" type="text" />
            </div>

            <div class="form-field">
              <label>Наименование в программе</label>
              <input v-model="contractor.name_program" type="text" />
            </div>

            <div class="form-field">
              <label>Страна регистрации</label>
              <input v-model="contractor.country_registration" type="text" />
            </div>

            <div class="form-field">
              <label>ИНН</label>
              <input v-model="contractor.inn" type="text" />
            </div>

            <div class="form-field">
              <label>КПП</label>
              <input v-model="contractor.kpp" type="text" />
            </div>

            <div class="form-field">
              <label>ОГРН</label>
              <input v-model="contractor.ogrn" type="text" />
            </div>

            <div class="form-field">
              <label>Банк</label>
              <input v-model="contractor.bank" type="text" />
            </div>

            <div class="form-field">
              <label>Расчетный счет</label>
              <input v-model="contractor.checking_account" type="text" />
            </div>

            <div class="form-field full-width">
              <label>Юридический адрес</label>
              <input v-model="contractor.legal_address" type="text" />
            </div>

            <div class="form-field full-width">
              <label>Фактический адрес</label>
              <input v-model="contractor.actual_address" type="text" />
            </div>

            <div class="form-field">
              <label>Телефон</label>
              <input v-model="contractor.phone" type="tel" autocomplete="off" />
            </div>

            <div class="form-field">
              <label>Email</label>
              <input
                v-model="contractor.email"
                type="email"
                autocomplete="off"
              />
            </div>
          </div>
        </div>

        <button type="button" class="add-btn" @click="addContractor">
          + Добавить контрагента
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
  name: "CounterpartyForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        contractors: [],
      },
    };
  },
  computed: {
    ...mapState("counterparty", {
      storeCounterparties: (state) => state.counterparties,
      storeLoading: (state) => state.loading,
    }),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("counterparty", ["fetchCounterparties", "saveCounterparty"]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await this.fetchCounterparties();

      if (this.storeCounterparties && this.storeCounterparties.length > 0) {
        this.formData.contractors = this.storeCounterparties.map((cp) => {
          return {
            ...cp,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.addContractor();
      }

      this.loading = false;
    },

    addContractor() {
      this.formData.contractors.push({
        tempId: this.generateTempId(),
        comment: "",
        counterparty_type_id: 1,
        name_for_doc: "",
        name_program: "",
        country_registration: "",
        inn: "",
        kpp: "",
        ogrn: "",
        bank: "",
        checking_account: "",
        legal_address: "",
        actual_address: "",
        phone: "",
        email: "",
      });
    },

    removeContractor(index) {
      if (confirm("Вы уверены, что хотите удалить этого контрагента?")) {
        this.formData.contractors.splice(index, 1);
        if (this.formData.contractors.length === 0) {
          this.addContractor();
        }
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.contractors.length; i++) {
        const contractor = this.formData.contractors[i];

        if (!contractor.name_program && !contractor.name_for_doc && !contractor.counterparty_id) {
          console.log(`Контрагент ${i + 1} не имеет имени, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in contractor) {
          if (key !== 'tempId') {
            cleanData[key] = contractor[key];
          }
        }

        await this.saveCounterparty(cleanData);
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

.contractor-card {
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
}
</style>
