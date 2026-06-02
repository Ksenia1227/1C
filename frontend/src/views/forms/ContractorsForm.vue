<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Контрагенты</h3>
      <div class="contractors-list">
        <div v-for="(contractor, idx) in formData.contractors" :key="idx" class="contractor-card">
          <div class="card-header">
            <span>Контрагент {{ idx + 1 }} </span>
            <button class="remove-btn" @click="removeContractor(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Комментарий</label>
              <input v-model="contractor[0]" type="text" />
            </div>
            <div class="form-field">
              <label>Вид контрагента</label>
              <input v-model="contractor[1]" type="text" />
            </div>
            <div class="form-field">
              <label>Наименование для документа</label>
              <input v-model="contractor[2]" type="text" />
            </div>
            <div class="form-field">
              <label>Наименование в программе</label>
              <input v-model="contractor[3]" type="text" />
            </div>
            <div class="form-field">
              <label>Страна регистрации</label>
              <input v-model="contractor[4]" type="text" />
            </div>
            <div class="form-field">
              <label>ИНН</label>
              <input v-model="contractor[5]" type="text" />
            </div>
            <div class="form-field">
              <label>КПП</label>
              <input v-model="contractor[6]" type="text" />
            </div>
            <div class="form-field">
              <label>ОГРН</label>
              <input v-model="contractor[7]" type="text" />
            </div>
            <div class="form-field">
              <label>Банк</label>
              <input v-model="contractor[8]" type="text" />
            </div>
            <div class="form-field">
              <label>Расчетный счет</label>
              <input v-model="contractor[9]" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Юридический адрес</label>
              <input v-model="contractor[10]" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Фактический адрес</label>
              <input v-model="contractor[11]" type="text"/>
            </div>
            <div class="form-field">
              <label>Телефон</label>
              <input v-model="contractor[12]" type="tel" autocomplete="off" />
            </div>
            <div class="form-field">
              <label>Email</label>
              <input v-model="contractor[13]" type="email" autocomplete="off" />
            </div>
            <div class="form-field">
              <label>Контактное лицо</label>
              <input v-model="contractor[14]" type="text" autocomplete="off" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addContractor">+ Добавить контрагента</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Договоры с контрагентами</h3>
      <div class="contracts-list">
        <div v-for="(contract, idx) in formData.contracts" :key="idx" class="contract-card">
          <div class="card-header">
            <span>Договор {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeContract(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Вид договора</label>
              <select v-model="contract[0]">
                <option>С поставщиком</option>
                <option>С покупателем</option>
                <option>Прочее</option>
              </select>
            </div>
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="contract[1]" type="text" />
            </div>
            <div class="form-field">
              <label>Дата</label>
              <input v-model="contract[2]" type="date" />
            </div>
            <div class="form-field">
              <label>Срок действия, лет</label>
              <input v-model.number="contract[3]" type="number" step="1" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addContract">+ Добавить договор</button>
      </div>
    </div>

    <div class="form-actions">
      <button class="save-btn">Сохранить</button>
      <button class="reset-btn">Сбросить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractorsForm',
  data() {
    return {
      formData: {
        contractors: [
          [
            '', '', '', '', '', '', '', '', '', '', 
            '', '', '', '', ''
          ]
        ],
        contracts: [
          ['', '', '', null]
        ]
      }
    }
  },
  methods: {
    addContractor() {
      this.formData.contractors.push([
        '', '', '', '', '', '', '', '', '', '', 
        '', '', '', '', ''
      ])
    },
    removeContractor(index) {
      this.formData.contractors.splice(index, 1)
    },
    addContract() {
      this.formData.contracts.push(['', '', '', null])
    },
    removeContract(index) {
      this.formData.contracts.splice(index, 1)
    }
  }
}
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

.contractor-card,
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
}
</style>