<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Поля</h3>
      <div class="fields-list">
        <div v-for="(field, idx) in formData.fields" :key="idx" class="field-card">
          <div class="card-header">
            <span>Поле {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeField(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Группа</label>
              <input v-model="field.group" type="text" />
            </div>
            <div class="form-field">
              <label>Наименование поля</label>
              <input v-model="field.name" type="text" />
            </div>
            <div class="form-field">
              <label>Площадь поля, га</label>
              <input v-model.number="field.area" type="number" step="0.01" />
            </div>
            <div class="form-field">
              <label>Код</label>
              <input v-model="field.code" type="text" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <input v-model="field.division" type="text" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addField">+ Добавить поле</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Номенклатура растениеводства</h3>
      <div class="cultures-list">
        <div v-for="(crop, idx) in formData.crops" :key="idx" class="culture-card">
          <div class="card-header">
            <span>Культура {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeCrop(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Вид номенклатуры</label>
              <input v-model="crop.type" type="text" />
            </div>
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="crop.name" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Полное наименование</label>
              <input v-model="crop.fullname" type="text" />
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
              <input v-model="crop.unit" type="text" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addCrop">+ Добавить культуру</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Культуры</h3>
      <div class="crop-table-list">
        <div v-for="(cropTable, idx) in formData.cropTable" :key="idx" class="crop-table-card">
          <div class="card-header">
            <span>Культура {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeCropTable(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="cropTable.name" type="text" />
            </div>
            <div class="form-field">
              <label>Группа</label>
              <input v-model="cropTable.group" type="text" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addCropTable">+ Добавить культуру</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Структура посевных площадей</h3>
      <div class="posev-list">
        <div v-for="(posev, idx) in formData.posev" :key="idx" class="posev-card">
          <div class="card-header">
            <span>Посев {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removePosev(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <label>Наименование</label>
              <input v-model="posev.name" type="text" />
            </div>
            <div class="form-field">
              <label>Год</label>
              <input v-model.number="posev.year" type="number" />
            </div>
            <div class="form-field">
              <label>Поле</label>
              <input v-model="posev.field" type="text" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <input v-model="posev.division" type="text" />
            </div>
            <div class="form-field">
              <label>Культура</label>
              <input v-model="posev.crop" type="text" />
            </div>
            <div class="form-field">
              <label>Площадь поля, га</label>
              <input v-model.number="posev.area" type="number" step="0.01" />
            </div>
            <div class="form-field">
              <label>Год</label>
              <input v-model="posev.year1" type="number" />
            </div>
            <div class="form-field">
              <label>Состав почв</label>
              <input v-model="posev.soil" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Рекомендации по удобрениям</label>
              <input v-model="posev.fertilizers" type="text"/>
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addPosev">+ Добавить запись</button>
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
  name: 'CropForm',
  data() {
    return {
      formData: {
        fields: [
          { group: '', name: '', area: null, code: '', division: '' }
        ],
        crops: [
          { type: '', name: '', fullname: '', unit: '' }
        ],
        cropTable: [
          { name: '', group: '' }
        ],
        posev: [
          { 
            name: '', year: null, field: '', division: '', 
            crop: '', area: null, year1: null, soil: '', fertilizers: '' 
          }
        ]
      }
    }
  },
  methods: {
    addField() {
      this.formData.fields.push({ group: '', name: '', area: null, code: '', division: '' })
    },
    removeField(index) {
      this.formData.fields.splice(index, 1)
    },
    addCrop() {
      this.formData.crops.push({ type: '', name: '', fullname: '', unit: '' })
    },
    removeCrop(index) {
      this.formData.crops.splice(index, 1)
    },
    addCropTable() {
      this.formData.cropTable.push({ name: '', group: '' })
    },
    removeCropTable(index) {
      this.formData.cropTable.splice(index, 1)
    },
    addPosev() {
      this.formData.posev.push({ 
        name: '', year: null, field: '', division: '', 
        crop: '', area: null, year1: null, soil: '', fertilizers: '' 
      })
    },
    removePosev(index) {
      this.formData.posev.splice(index, 1)
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

.field-card,
.culture-card,
.posev-card,
.crop-table-card {
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
}
</style>