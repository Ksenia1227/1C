<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Материалы и товары — остатки</h3>
      <div class="filter-bar">
        <input type="text" placeholder="Поиск по номенклатуре..." v-model="searchQuery" />
        <select v-model="categoryFilter">
          <option value="">Все категории</option>
          <option>ГСМ</option>
          <option>Удобрения</option>
          <option>Семена</option>
          <option>Стройматериалы</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Номенклатура</th>
              <th>Счет</th>
              <th>Склад</th>
              <th>Количество</th>
              <th>Ед. изм.</th>
              <th>Стоимость, руб</th>
              <th>Подразделение</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in filteredMaterials" :key="idx">
              <td><input v-model="item.name" placeholder="Наименование" /></td>
              <td><input v-model="item.account" placeholder="Счет" /></td>
              <td><input v-model="item.warehouse" placeholder="Склад" /></td>
              <td><input v-model.number="item.quantity" type="number" placeholder="0" /></td>
              <td><select v-model="item.unit"><option>шт</option><option>кг</option><option>л</option><option>т</option></select></td>
              <td><input v-model.number="item.cost" type="number" placeholder="0" /></td>
              <td><input v-model="item.division" placeholder="Подразделение" /></td>
              <td><button class="remove-small" @click="removeMaterial(idx)">✕</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="add-btn" @click="addMaterial">+ Добавить позицию</button>
    </div>
    <div class="form-actions">
      <button class="save-btn">Сохранить остатки</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaterialsForm',
  data() {
    return {
      searchQuery: '',
      categoryFilter: '',
      materials: [
        { name: '', account: '10.03', warehouse: 'Основной', quantity: null, unit: 'шт', cost: null, division: 'Основное' }
      ]
    }
  },
  computed: {
    filteredMaterials() {
      return this.materials.filter(item => {
        const matchSearch = !this.searchQuery || item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchCategory = !this.categoryFilter || item.category === this.categoryFilter
        return matchSearch && matchCategory
      })
    }
  },
  methods: {
    addMaterial() {
      this.materials.push({ name: '', account: '10.03', warehouse: 'Основной', quantity: null, unit: 'шт', cost: null, division: 'Основное' })
    },
    removeMaterial(index) {
      this.materials.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.filter-bar input,
.filter-bar select {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
  color: var(--color-text);
}

.filter-bar input {
  flex: 2;
}

.filter-bar select {
  flex: 1;
}

.table-wrapper {
  overflow-x: auto;
  margin-bottom: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th,
td {
  padding: 10px 8px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

td input,
td select {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.3);
  color: var(--color-text);
}

.remove-small {
  background: rgba(244, 67, 54, 0.2);
  border: none;
  color: #f44336;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
}
</style>