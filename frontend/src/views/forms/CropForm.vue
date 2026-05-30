<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Поля</h3>
      <div class="form-grid">
        <div v-for="(field, idx) in formData.fields" :key="idx" class="field-card">
          <div class="field-card-header">
            <span>Поле {{ idx + 1 }}</span>
            <button class="remove-field" @click="removeField(idx)">✕</button>
          </div>
          <div class="form-field">
            <label>Наименование поля</label>
            <input v-model="field.name" type="text" />
          </div>
          <div class="form-field">
            <label>Группа</label>
            <input v-model="field.group" type="text" />
          </div>
          <div class="form-field">
            <label>Площадь, га</label>
            <input v-model.number="field.area" type="number" step="0.01" />
          </div>
          <div class="form-field">
            <label>Код</label>
            <input v-model="field.code" type="text" />
          </div>
        </div>
        <button class="add-card-btn" @click="addField">+ Добавить поле</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Культуры</h3>
      <div class="form-grid two-columns">
        <div v-for="(crop, idx) in formData.crops" :key="idx" class="crop-item">
          <input v-model="crop.name" placeholder="Наименование культуры" />
          <select v-model="crop.group">
            <option>Зерновые</option>
            <option>Зернобобовые</option>
            <option>Технические</option>
            <option>Овощные</option>
            <option>Кормовые</option>
          </select>
          <button class="remove-crop" @click="removeCrop(idx)">✕</button>
        </div>
        <button class="add-btn" @click="addCrop">+ Добавить культуру</button>
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
          { name: '', group: '', area: null, code: '', division: 'Основное' }
        ],
        crops: [
          { name: '', group: 'Зерновые' }
        ]
      }
    }
  },
  methods: {
    addField() {
      this.formData.fields.push({ name: '', group: '', area: null, code: '', division: 'Основное' })
    },
    removeField(index) {
      this.formData.fields.splice(index, 1)
    },
    addCrop() {
      this.formData.crops.push({ name: '', group: 'Зерновые' })
    },
    removeCrop(index) {
      this.formData.crops.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.form-field {
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 16px;
}

.form-field label {
  margin: 0;
}

.form-field input,
.form-field select {
  width: 100%;
}

.field-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.field-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  margin-bottom: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.remove-field {
  background: rgba(244, 67, 54, 0.2);
  border: none;
  color: #f44336;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
}

.add-card-btn {
  grid-column: span 2;
  padding: 14px;
  border-radius: 12px;
  background: rgba(156, 39, 176, 0.15);
  border: 1px dashed rgba(156, 39, 176, 0.4);
  color: #9c27b0;
  cursor: pointer;
}

.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.crop-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.crop-item input,
.crop-item select {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
  color: var(--color-text);
}

.remove-crop {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(244, 67, 54, 0.2);
  border: none;
  color: #f44336;
  cursor: pointer;
}

@media (max-width: 768px) {
  .two-columns {
    grid-template-columns: 1fr;
  }
  .add-card-btn {
    grid-column: span 1;
  }
}
</style>