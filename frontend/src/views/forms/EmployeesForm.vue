<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Сотрудники</h3>
      <div class="employees-list">
        <div v-for="(employee, idx) in formData.employees" :key="idx" class="employee-card">
          <div class="card-header">
            <span>Сотрудник {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeEmployee(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <label>ФИО</label>
              <input v-model="employee[0]" type="text" />
            </div>
            <div class="form-field">
              <label>Пол</label>
              <select v-model="employee[1]">
                <option>Мужской</option>
                <option>Женский</option>
              </select>
            </div>
            <div class="form-field">
              <label>Дата рождения</label>
              <input v-model="employee[2]" type="date" />
            </div>
            <div class="form-field">
              <label>ИНН</label>
              <input v-model="employee[3]" type="text" autocomplete="off"/>
            </div>
            <div class="form-field">
              <label>СНИЛС</label>
              <input v-model="employee[4]" type="text" autocomplete="off"/>
            </div>
            <div class="form-field">
              <label>Гражданство</label>
              <input v-model="employee[5]" type="text" />
            </div>
            <div class="form-field">
              <label>Паспорт</label>
              <input v-model="employee[6]" type="text" autocomplete="off"/>
            </div>
            <div class="form-field">
              <label>Кем выдан</label>
              <input v-model="employee[7]" type="text" />
            </div>
            <div class="form-field">
              <label>Дата выдачи</label>
              <input v-model="employee[8]" type="date" />
            </div>
            <div class="form-field full-width">
              <label>Адрес по прописке</label>
              <input v-model="employee[9]" type="text" />
            </div>
            <div class="form-field">
              <label>Телефон</label>
              <input v-model="employee[10]" type="tel" />
            </div>
            <div class="form-field">
              <label>Email</label>
              <input v-model="employee[11]" type="email" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addEmployee">+ Добавить сотрудника</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Договоры с сотрудниками</h3>
      <div class="contracts-list">
        <div v-for="(contract, idx) in formData.contracts" :key="idx" class="contract-card">
          <div class="card-header">
            <span>Договор {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeContract(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Номер</label>
              <input v-model.number="contract[0]" type="number" />
            </div>
            <div class="form-field">
              <label>Дата приема на работу</label>
              <input v-model="contract[1]" type="date" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="contract[2]">
                <option>Растениеводство</option>
                <option>Животноводство</option>
                <option>Механизация</option>
                <option>Бухгалтерия</option>
                <option>Администрация</option>
                <option>Ветеринарная служба</option>
                <option>Агрономическая служба</option>
                <option>ИТ-отдел</option>
              </select>
            </div>
            <div class="form-field">
              <label>Должность</label>
              <input v-model="contract[3]" type="text" />
            </div>
            <div class="form-field">
              <label>Оклад, ₽</label>
              <input v-model.number="contract[4]" type="number" />
            </div>
            <div class="form-field">
              <label>Ставка</label>
              <input v-model="contract[5]" type="text" />
            </div>
            <div class="form-field">
              <label>Вид занятости</label>
              <select v-model="contract[6]">
                <option>Основное место работы</option>
              </select>
            </div>
            <div class="form-field">
              <label>Тип документа</label>
              <select v-model="contract[7]">
                <option>Прием на работу</option>
              </select>
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
  name: 'EmployeesForm',
  data() {
    return {
      formData: {
        employees: [
          ['', '', '', '', '', '', '', '', '', '', '', '']
        ],
        contracts: [
          [null, '', '', '', null, '', '', '']
        ]
      }
    }
  },
  methods: {
    addEmployee() {
      this.formData.employees.push(['', '', '', '', '', '', '', '', '', '', '', ''])
    },
    removeEmployee(index) {
      this.formData.employees.splice(index, 1)
    },
    addContract() {
      this.formData.contracts.push([null, '', '', '', null, '', '', ''])
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

.employee-card,
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
  .form-field {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>