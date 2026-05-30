<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Здания и сооружения</h3>
      <div class="form-grid">
        <div v-for="(building, idx) in buildings" :key="idx" class="building-card">
          <div class="building-header">
            <span>{{ building.name || 'Новое здание' }}</span>
            <button class="remove" @click="removeBuilding(idx)">✕</button>
          </div>
          <div class="form-field">
            <label>Наименование</label>
            <input v-model="building.name" type="text" />
          </div>
          <div class="form-field">
            <label>Назначение</label>
            <input v-model="building.purpose" type="text" />
          </div>
          <div class="form-field">
            <label>Площадь, м²</label>
            <input v-model.number="building.area" type="number" />
          </div>
          <div class="form-field">
            <label>Стоимость, млн ₽</label>
            <input v-model.number="building.cost" type="number" step="0.1" />
          </div>
        </div>
        <button class="add-card-btn" @click="addBuilding">+ Добавить здание</button>
      </div>
    </div>
    <div class="form-actions">
      <button class="save-btn">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildingsForm',
  data() {
    return {
      buildings: [
        { name: '', purpose: '', area: null, cost: null }
      ]
    }
  },
  methods: {
    addBuilding() {
      this.buildings.push({ name: '', purpose: '', area: null, cost: null })
    },
    removeBuilding(index) {
      this.buildings.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.building-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.building-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: 600;
}

.remove {
  background: rgba(244, 67, 54, 0.2);
  border: none;
  color: #f44336;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
}
</style>