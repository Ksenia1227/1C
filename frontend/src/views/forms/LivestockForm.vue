<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Группы животных</h3>
      <div class="groups-list">
        <div class="group-summary">
          <p><strong>КРС (молочное)</strong> — 120 голов</p>
          <p><strong>КРС (мясное)</strong> — 85 голов</p>
          <p><strong>Свиньи</strong> — 240 голов</p>
          <p><strong>Птица</strong> — 1500 голов</p>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Добавить животное</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Инвентарный номер</label>
          <input v-model="newAnimal.invNumber" type="text" />
        </div>
        <div class="form-field">
          <label>Пол</label>
          <select v-model="newAnimal.gender">
            <option>Самец</option>
            <option>Самка</option>
          </select>
        </div>
        <div class="form-field">
          <label>Дата рождения</label>
          <input v-model="newAnimal.birthDate" type="date" />
        </div>
        <div class="form-field">
          <label>Порода</label>
          <input v-model="newAnimal.breed" type="text" />
        </div>
        <div class="form-field">
          <label>Группа</label>
          <select v-model="newAnimal.group">
            <option>КРС (молочное)</option>
            <option>КРС (мясное)</option>
            <option>Свиньи</option>
            <option>Птица</option>
          </select>
        </div>
        <div class="form-field">
          <label>Живая масса, кг</label>
          <input v-model.number="newAnimal.weight" type="number" />
        </div>
      </div>
      <button class="add-btn" @click="addAnimal">+ Добавить животное</button>
    </div>

    <div class="form-section">
      <h3>Список животных ({{ animals.length }})</h3>
      <div class="animals-table">
        <table>
          <thead>
            <tr>
              <th>Инв. номер</th>
              <th>Пол</th>
              <th>Дата рождения</th>
              <th>Порода</th>
              <th>Группа</th>
              <th>Масса, кг</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(animal, idx) in animals" :key="idx">
              <td>{{ animal.invNumber }}</td>
              <td>{{ animal.gender }}</td>
              <td>{{ animal.birthDate }}</td>
              <td>{{ animal.breed }}</td>
              <td>{{ animal.group }}</td>
              <td>{{ animal.weight }}</td>
              <td><button class="remove-small" @click="removeAnimal(idx)">✕</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="form-actions">
      <button class="save-btn">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LivestockForm',
  data() {
    return {
      newAnimal: {
        invNumber: '',
        gender: 'Самец',
        birthDate: '',
        breed: '',
        group: 'КРС (молочное)',
        weight: null
      },
      animals: []
    }
  },
  methods: {
    addAnimal() {
      if (this.newAnimal.invNumber && this.newAnimal.breed) {
        this.animals.push({ ...this.newAnimal })
        this.newAnimal = {
          invNumber: '',
          gender: 'Самец',
          birthDate: '',
          breed: '',
          group: 'КРС (молочное)',
          weight: null
        }
      }
    },
    removeAnimal(index) {
      this.animals.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.group-summary {
  background: rgba(156, 39, 176, 0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.group-summary p {
  margin: 0;
}

.animals-table {
  overflow-x: auto;
}

.animals-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.animals-table th,
.animals-table td {
  padding: 10px 8px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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