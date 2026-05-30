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
  </div>
</template>

<script>
export default {
  name: 'OrganizationForm',
  data() {
    return {
      formData: {
        organizationType: 'ООО',
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
        divisions: ['']
      }
    }
  },
  methods: {
    addDivision() {
      this.formData.divisions.push('')
    },
    removeDivision(index) {
      this.formData.divisions.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.dynamic-form {
  max-width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 32px;
}

.form-field {
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: center;
  gap: 16px;
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
}

.repeating-row input {
  flex: 1;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
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

.form-section {
  margin-bottom: 24px;
}

.form-section h3 {
  margin: 0 0 24px 0;
  color: #000;
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
}
</style>