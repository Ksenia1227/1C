<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Организация</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Вид организации</label>
          <select v-model="formData.organizationType">
            <option>Юридическое лицо</option>
            <option>Крестьянское фермерское хозяйство</option>
            <option>Индивидуальный предприниматель</option>
          </select>
        </div>

        <div class="form-field">
          <label>Сокращенное наименование</label>
          <input v-model="formData.shortName" type="text" />
        </div>

        <div class="form-field full-width">
          <label>Полное наименование</label>
          <input v-model="formData.fullName" type="text" />
        </div>

        <div class="form-field">
          <label>ИНН</label>
          <input v-model="formData.inn" type="text" />
        </div>

        <div class="form-field">
          <label>КПП</label>
          <input v-model="formData.kpp" type="text" />
        </div>

        <div class="form-field">
          <label>ОГРН</label>
          <input v-model="formData.ogrn" type="text" />
        </div>

        <div class="form-field">
          <label>Дата регистрации</label>
          <input v-model="formData.regDate" type="date" />
        </div>

        <div class="form-field">
          <label>Регистрирующий орган</label>
          <input v-model="formData.registr" type="text" />
        </div>

        <div class="form-field full-width">
          <label>Юридический адрес</label>
          <input v-model="formData.legalAddress" type="text" />
        </div>

        <div class="form-field full-width">
          <label>Фактический адрес</label>
          <input v-model="formData.actualAddress" type="text" />
        </div>

        <div class="form-field">
          <label>Телефон</label>
          <input v-model="formData.phone" type="tel" />
        </div>

        <div class="form-field">
          <label>Электронная почта</label>
          <input v-model="formData.email" type="email" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Подразделения</h3>
      <div class="repeating-fields">
        <div v-for="(div, idx) in formData.divisions" :key="idx" class="repeating-row">
          <input v-model="formData.divisions[idx]" type="text" placeholder="Название подразделения" />
          <button class="remove-btn" @click="removeDivision(idx)">✕</button>
        </div>
        <button class="add-btn" @click="addDivision">+ Добавить подразделение</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Банковские реквизиты</h3>
      <div class="repeating-fields">
        <div v-for="(bank, idx) in formData.banks" :key="idx" class="repeating-row">
          <input v-model="formData.banks[idx].bank" type="text" placeholder="Банк" />
          <input v-model="formData.banks[idx].account" type="text" placeholder="Расчетный счет" />
          <button class="remove-btn" @click="removeBank(idx)">✕</button>
        </div>
        <button class="add-btn" @click="addBank">+ Добавить банк</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Налоговая инспекция</h3>
      <div class="repeating-fields">
        <div v-for="(tax, idx) in formData.tax" :key="idx" class="repeating-card">
          <div class="form-grid">
            <div class="form-field">
              <label>Код инспекции</label>
              <input v-model="formData.tax[idx].code" type="text" />
            </div>
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="formData.tax[idx].name" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Полное наименование</label>
              <input v-model="formData.tax[idx].fullName" type="text" />
            </div>
            <div class="form-field">
              <label>ОКТМО</label>
              <input v-model="formData.tax[idx].oktmo" type="text" />
            </div>
            <div class="form-field">
              <label>ОКАТО</label>
              <input v-model="formData.tax[idx].okato" type="text" />
            </div>
          </div>
          <div class="card-actions">
            <button class="remove-btn-card" @click="removeTax(idx)">✕ Удалить</button>
          </div>
        </div>
        <button class="add-btn" @click="addTax">+ Добавить налоговую инспекцию</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Пенсионный фонд (ПФР)</h3>
      <div class="repeating-fields">
        <div v-for="(pfr, idx) in formData.pfr" :key="idx" class="repeating-row">
          <input v-model="formData.pfr[idx].regNumber" type="text" placeholder="Регистрационный номер" />
          <input v-model="formData.pfr[idx].code" type="text" placeholder="Код территориального органа" />
          <input v-model="formData.pfr[idx].name" type="text" placeholder="Наименование территориального органа" />
          <button class="remove-btn" @click="removePfr(idx)">✕</button>
        </div>
        <button class="add-btn" @click="addPfr">+ Добавить ПФР</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Фонд социального страхования (ФСС)</h3>
      <div class="repeating-fields">
        <div v-for="(fss, idx) in formData.fss" :key="idx" class="repeating-row">
          <input v-model="formData.fss[idx].regNumber" type="text" placeholder="Регистрационный номер" />
          <input v-model="formData.fss[idx].code" type="text" placeholder="Код подчиненности" />
          <input v-model="formData.fss[idx].name" type="text" placeholder="Территориальный орган" />
          <button class="remove-btn" @click="removeFss(idx)">✕</button>
        </div>
        <button class="add-btn" @click="addFss">+ Добавить ФСС</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Коды статистики</h3>
      <div class="repeating-fields">
        <div v-for="(stat, idx) in formData.statistics" :key="idx" class="repeating-card">
          <div class="form-grid">
            <div class="form-field">
              <label>ОКОПФ</label>
              <input v-model="formData.statistics[idx].okopf" type="text" />
            </div>
            <div class="form-field">
              <label>ОКФС</label>
              <input v-model="formData.statistics[idx].okfs" type="text" />
            </div>
            <div class="form-field">
              <label>ОКВЭД</label>
              <input v-model="formData.statistics[idx].okved" type="text" />
            </div>
            <div class="form-field">
              <label>ОКПО</label>
              <input v-model="formData.statistics[idx].okpo" />
            </div>
            <div class="form-field full-width">
              <label>Код территориального органа Росстата</label>
              <input v-model="formData.statistics[idx].rosstatCode" />
            </div>
          </div>
          <div class="card-actions">
            <button class="remove-btn-card" @click="removeStatistics(idx)">✕ Удалить</button>
          </div>
        </div>
        <button class="add-btn" @click="addStatistics">+ Добавить коды статистики</button>
      </div>
    </div>

    <div class="form-actions">
      <button class="save-btn">Сохранить</button>
      <button class="reset-btn" @click="resetForm">Сбросить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizationForm',
  data() {
    return {
      formData: {
        organizationType: 'Юридическое лицо',
        shortName: '',
        fullName: '',
        inn: '',
        kpp: '',
        ogrn: '',
        regDate: '',
        registr: '',
        legalAddress: '',
        actualAddress: '',
        phone: '',
        email: '',
        divisions: [''],
        banks: [{ bank: '', account: '' }],
        tax: [{ code: '', name: '', fullName: '', oktmo: '', okato: '' }],
        pfr: [{ regNumber: '', code: '', name: '' }],
        fss: [{ regNumber: '', code: '', name: '' }],
        statistics: [{ okopf: '', okfs: '', okved: '', okpo: '', rosstatCode: '' }]
      }
    }
  },
  methods: {
    addDivision() {
      this.formData.divisions.push('')
    },
    removeDivision(index) {
      this.formData.divisions.splice(index, 1)
    },
    addBank() {
      this.formData.banks.push({ bank: '', account: '' })
    },
    removeBank(index) {
      this.formData.banks.splice(index, 1)
    },
    addTax() {
      this.formData.tax.push({ code: '', name: '', fullName: '', oktmo: '', okato: '' })
    },
    removeTax(index) {
      this.formData.tax.splice(index, 1)
    },
    addPfr() {
      this.formData.pfr.push({ regNumber: '', code: '', name: '' })
    },
    removePfr(index) {
      this.formData.pfr.splice(index, 1)
    },
    addFss() {
      this.formData.fss.push({ regNumber: '', code: '', name: '' })
    },
    removeFss(index) {
      this.formData.fss.splice(index, 1)
    },
    addStatistics() {
      this.formData.statistics.push({ okopf: '', okfs: '', okved: '', okpo: '', rosstatCode: '' })
    },
    removeStatistics(index) {
      this.formData.statistics.splice(index, 1)
    },
    resetForm() {
      this.formData = {
        organizationType: 'Юридическое лицо',
        shortName: '',
        fullName: '',
        inn: '',
        kpp: '',
        ogrn: '',
        regDate: '',
        registr: '',
        legalAddress: '',
        actualAddress: '',
        phone: '',
        email: '',
        divisions: [''],
        banks: [{ bank: '', account: '' }],
        tax: [{ code: '', name: '', fullName: '', oktmo: '', okato: '' }],
        pfr: [{ regNumber: '', code: '', name: '' }],
        fss: [{ regNumber: '', code: '', name: '' }],
        statistics: [{ okopf: '', okfs: '', okved: '', okpo: '', rosstatCode: '' }]
      }
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

.repeating-row input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.repeating-card {
  background: rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(156, 39, 176, 0.15);
}

.remove-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: rgba(244, 67, 54, 0.3);
  transform: scale(1.02);
}

.remove-btn-card {
  padding: 8px 20px;
  border-radius: 8px;
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.remove-btn-card:hover {
  background: rgba(244, 67, 54, 0.3);
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
    gap: 16px;
  }
  
  .form-field {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .form-field.full-width {
    grid-column: span 1;
  }
  
  .repeating-row {
    flex-direction: column;
  }
  
  .repeating-row input {
    width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .save-btn,
  .reset-btn {
    width: 100%;
  }
  
  .card-actions {
    justify-content: stretch;
  }
  
  .remove-btn-card {
    width: 100%;
    text-align: center;
  }
}
</style>