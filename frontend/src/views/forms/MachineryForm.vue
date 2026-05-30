<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Машинно-тракторный парк</h3>
      <div class="form-grid">
        <div v-for="(machine, idx) in machines" :key="idx" class="machine-card">
          <div class="machine-header">
            <span>{{ machine.name || 'Новая единица' }}</span>
            <button class="remove" @click="removeMachine(idx)">✕</button>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="machine.name" type="text" />
            </div>
            <div class="form-field">
              <label>Марка</label>
              <input v-model="machine.brand" type="text" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Изготовитель</label>
              <input v-model="machine.manufacturer" type="text" />
            </div>
            <div class="form-field">
              <label>Мощность, л.с.</label>
              <input v-model.number="machine.power" type="number" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Дата выпуска</label>
              <input v-model="machine.manufactureDate" type="date" />
            </div>
            <div class="form-field">
              <label>Срок службы, мес</label>
              <input v-model.number="machine.serviceLife" type="number" />
            </div>
          </div>
          <div class="form-field">
            <label>Первоначальная стоимость</label>
            <input v-model.number="machine.initialCost" type="number" />
          </div>
        </div>
        <button class="add-card-btn" @click="addMachine">+ Добавить технику</button>
      </div>
    </div>
    <div class="form-actions">
      <button class="save-btn">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MachineryForm',
  data() {
    return {
      machines: [
        { name: '', brand: '', manufacturer: '', power: null, manufactureDate: '', serviceLife: null, initialCost: null }
      ]
    }
  },
  methods: {
    addMachine() {
      this.machines.push({ name: '', brand: '', manufacturer: '', power: null, manufactureDate: '', serviceLife: null, initialCost: null })
    },
    removeMachine(index) {
      this.machines.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.machine-card {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.machine-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;
}
</style>