<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Номенклатура материалов и товаров</h3>
      <div class="materials-list">
        <div v-for="(material, idx) in formData.materials" :key="idx" class="material-card">
          <div class="card-header">
            <span>Материал {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeMaterial(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Вид номенклатуры</label>
              <select v-model="material.type">
                <option>Материалы</option>
                <option>Продукция</option>
              </select>
            </div>
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="material.name" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Полное наименование</label>
              <input v-model="material.fullName" type="text" />
            </div>
            <div class="form-field">
              <label>Единица</label>
              <select v-model="material.unit">
                <option>шт</option>
                <option>кг</option>
                <option>л</option>
                <option>комплект</option>
              </select>
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addMaterial">+ Добавить материал</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Остатки материалов и товаров</h3>
      <div class="ost-list">
        <div v-for="(ost, idx) in formData.materialsOst" :key="idx" class="ost-card">
          <div class="card-header">
            <span>Остаток {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeMaterialOst(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Номенклатура</label>
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
              <label>Количество</label>
              <input v-model="ost.quantity" type="text" />
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
              <select v-model="ost.unit">
                <option>шт</option>
                <option>кг</option>
                <option>л</option>
                <option>комплект</option>
              </select>
            </div>
            <div class="form-field">
              <label>Номер</label>
              <input v-model="ost.number" type="text" />
            </div>
            <div class="form-field">
              <label>Контрагент</label>
              <input v-model="ost.contractor" type="text" />
            </div>
            <div class="form-field">
              <label>Стоимость, руб</label>
              <input v-model="ost.cost" type="text" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <input v-model="ost.division" type="text" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addMaterialOst">+ Добавить остаток</button>
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
  name: 'MaterialsForm',
  data() {
    return {
      formData: {
        materials: [
          { type: 'Материалы', name: '', fullName: '', unit: '' }
        ],
        materialsOst: [
          {
            name: '',
            account: '',
            warehouse: '',
            quantity: '',
            unit: '',
            number: '',
            contractor: '',
            cost: '',
            division: ''
          }
        ]
      }
    }
  },
  methods: {
    // Номенклатура
    addMaterial() {
      this.formData.materials.push({ type: '', name: '', fullName: '', unit: '' })
    },
    removeMaterial(index) {
      this.formData.materials.splice(index, 1)
    },
    // Остатки
    addMaterialOst() {
      this.formData.materialsOst.push({
        name: '',
        account: '',
        warehouse: '',
        quantity: '',
        unit: '',
        number: '',
        contractor: '',
        cost: '',
        division: ''
      })
    },
    removeMaterialOst(index) {
      this.formData.materialsOst.splice(index, 1)
    },
    // Сброс
    resetForm() {
      this.formData = {
        materials: [
          { type: '', name: '', fullName: '', unit: '' }
        ],
        materialsOst: [
          {
            name: '',
            account: '',
            warehouse: '',
            quantity: '',
            unit: 'кг',
            number: '',
            contractor: '',
            cost: '',
            division: ''
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