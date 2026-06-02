<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Остатки растениеводства</h3>
      <div class="ost-list">
        <div v-for="(ost, idx) in formData.ost" :key="idx" class="ost-card">
          <div class="card-header">
            <span>Остаток {{ idx + 1 }} </span>
            <button class="remove-btn" @click="removeOst(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="ost.name" type="text" />
            </div>
            <div class="form-field">
              <label>Счет</label>
              <input v-model="ost.account" type="text" />
            </div>
            <div class="form-field">
              <label>Склад</label>
              <input v-model="ost.warehouse" type="text" />
            </div>
            <div class="form-field">
              <label>Серия (партия)</label>
              <input v-model="ost.series" type="text" />
            </div>
            <div class="form-field">
              <label>Количество</label>
              <input v-model.number="ost.quantity" type="number" step="0.01" />
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
              <input v-model="ost.unit" type="text" />
            </div>
            <div class="form-field">
              <label>Код номенклатуры</label>
              <input v-model="ost.code" type="text" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <input v-model="ost.division" type="text" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addOst">+ Добавить остаток</button>
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
  name: 'CropOstForm',
  data() {
    return {
      formData: {
        ost: [
          { 
            name: '', account: '', warehouse: '', series: '', 
            quantity: null, unit: '', code: '', division: '' 
          }
        ]
      }
    }
  },
  methods: {
    addOst() {
      this.formData.ost.push({ 
        name: '', account: '', warehouse: '', series: '', 
        quantity: null, unit: '', code: '', division: '' 
      })
    },
    removeOst(index) {
      this.formData.ost.splice(index, 1)
    },
    resetForm() {
      this.formData = {
        ost: [
          { 
            name: '', account: '', warehouse: '', series: '', 
            quantity: null, unit: '', code: '', division: '' 
          }
        ]
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