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
                <option :value="4">Общество с ограниченной ответственностью (ООО)</option>
                <option :value="5">Акционерное общество (АО)</option>
                <option :value="6">Публичное акционерное общество (ПАО)</option>
                <option :value="7">Крестьянское фермерское хозяйство (КФХ)</option>
                <option :value="8">Сельскохозяйственный производственный кооператив (СПК)</option>
                <option :value="9">Государственное унитарное предприятие (ГУП)</option>
                <option :value="10">Муниципальное унитарное предприятие (МУП)</option>
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
              <input v-model="contractor.email" type="email" autocomplete="off" />
            </div>
          </div>

          <div class="sub-section">
            <h4>Договоры</h4>
            <div class="repeating-fields">
              <div
                v-for="(contract, cidx) in contractor.contracts"
                :key="contract.tempId || cidx"
                class="repeating-row"
              >
                <div class="contract-fields">
                  <select v-model="contract.contract_type_id">
                    <option value="">Выберите вид договора</option>
                    <option value="С поставщиком">С поставщиком</option>
                    <option value="С покупателем">С покупателем</option>
                    <option value="Прочее">Прочее</option>
                  </select>
                  <input
                    v-model="contract.name"
                    type="text"
                    placeholder="Наименование"
                  />
                  <input
                    v-model="contract.date"
                    type="date"
                    placeholder="Дата"
                  />
                  <input
                    v-model.number="contract.validity_period"
                    type="number"
                    step="1"
                    placeholder="Срок действия, лет"
                  />
                </div>
                <button
                  type="button"
                  class="remove-btn small"
                  @click="removeContractFromArray(contractor, cidx)"
                >
                  ✕
                </button>
              </div>
              <button
                type="button"
                class="add-btn"
                @click="addContractToArray(contractor)"
              >
                + Добавить договор
              </button>
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
        contractors: []
      }
    };
  },
  computed: {
    ...mapState("counterparty", {
      storeCounterparties: state => state.counterparties,
      storeContracts: state => state.contracts,
      storeLoading: state => state.loading
    })
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("counterparty", [
      "fetchCounterparties",
      "fetchContracts",
      "saveCounterpartyWithContracts"
    ]),
    
    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },
    
    async loadData() {
      this.loading = true;
      
      await Promise.all([
        this.fetchCounterparties(),
        this.fetchContracts()
      ]);
      
      if (this.storeCounterparties && this.storeCounterparties.length > 0) {
        this.formData.contractors = this.storeCounterparties.map(cp => {
          // Используем деструктуризацию без объявления неиспользуемых переменных
          const counterpartyData = { ...cp };
          return {
            ...counterpartyData,
            tempId: this.generateTempId(),
            contracts: this.storeContracts
              .filter(c => c.counterparty_id === cp.counterparty_id)
              .map(c => {
                const contractData = { ...c };
                return {
                  ...contractData,
                  tempId: this.generateTempId()
                };
              })
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
        contracts: []
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
    
    addContractToArray(contractor) {
      if (!contractor.contracts) {
        contractor.contracts = [];
      }
      contractor.contracts.push({
        tempId: this.generateTempId(),
        contract_type_id: "",
        name: "",
        date: "",
        validity_period: ""
      });
      console.log("Добавлен новый договор:", contractor.contracts[contractor.contracts.length - 1]);
    },
    
    removeContractFromArray(contractor, index) {
      contractor.contracts.splice(index, 1);
    },
    
    prepareDataForBackend() {
      const result = [];
      
      for (const contractor of this.formData.contractors) {
        // Создаем копию без tempId
        const cleanCounterparty = {};
        for (const key in contractor) {
          if (key !== 'tempId') {
            cleanCounterparty[key] = contractor[key];
          }
        }
        
        // Обрабатываем договоры
        const cleanContracts = (contractor.contracts || [])
          .filter(c => c.name && c.name.trim())
          .map(c => {
            const cleanContract = {};
            for (const key in c) {
              if (key !== 'tempId') {
                cleanContract[key] = c[key];
              }
            }
            return cleanContract;
          });
        
        if (cleanCounterparty.counterparty_id || 
            cleanCounterparty.name_program || 
            cleanCounterparty.name_for_doc) {
          result.push({
            counterparty: cleanCounterparty,
            contracts: cleanContracts
          });
        }
      }
      
      return result;
    },
    
    async sendForm() {
      console.log("=== НАЧАЛО ОТПРАВКИ ФОРМЫ ===");
      this.loading = true;
      
      const allData = this.prepareDataForBackend();
      console.log("Данные для отправки:", allData);
      
      let hasErrors = false;
      let successCount = 0;
      
      for (let i = 0; i < allData.length; i++) {
        const data = allData[i];
        
        if (!data.counterparty.name_program && !data.counterparty.name_for_doc && !data.counterparty.counterparty_id) {
          console.log(`Контрагент ${i + 1} не имеет имени, пропускаем`);
          continue;
        }
        
        const success = await this.saveCounterpartyWithContracts(data);
        console.log(`Результат сохранения контрагента ${i + 1}:`, success);
        
        if (success) {
          successCount++;
        } else {
          hasErrors = true;
          break;
        }
      }
      
      this.loading = false;
      
      if (!hasErrors && successCount > 0) {
        await this.loadData();
        alert(`Данные успешно сохранены (${successCount} контрагентов)`);
      } else if (successCount === 0) {
        alert("Нет данных для сохранения");
      }
    },
    
    resetForm() {
      if (confirm("Вы уверены, что хотите сбросить все изменения?")) {
        this.loadData();
      }
    },
    
    debugForm() {
      console.log("=== ТЕКУЩЕЕ СОСТОЯНИЕ ФОРМЫ ===");
      console.log("formData:", JSON.parse(JSON.stringify(this.formData)));
      const prepared = this.prepareDataForBackend();
      console.log("Подготовленные данные:", JSON.parse(JSON.stringify(prepared)));
    }
  }
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

.sub-section {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px dashed rgba(156, 39, 176, 0.2);
}

.sub-section h4 {
  margin: 0 0 16px 0;
  color: #7b1fa2;
  font-size: 16px;
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

.repeating-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.repeating-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.contract-fields {
  flex: 1;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.contract-fields select,
.contract-fields input {
  flex: 1;
  min-width: 150px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
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

.remove-btn.small {
  width: 32px;
  height: 32px;
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
  .contract-fields {
    flex-direction: column;
  }
  .contract-fields select,
  .contract-fields input {
    width: 100%;
  }
}
</style>