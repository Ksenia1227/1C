<template>
  <div class="dynamic-form">
    <div class="form-section">
      <h3>Поголовье по группам</h3>
      <div class="summary-block">
        <div class="summary-grid">
          <div v-for="(group, idx) in summaryGroups" :key="idx" class="summary-item">
            <label>{{ group.name }}</label>
            <input 
              v-model.number="group.count" 
              type="number" 
              min="0" 
              step="1"
              class="summary-input"
              @input="updateSummary"
            />
            <span>голов</span>
          </div>
        </div>
        <div class="summary-total">
          <strong>Итого голов:</strong> {{ totalAnimals }}
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Животные</h3>
      <div class="animals-list">
        <div v-for="(animal, idx) in formData.animals" :key="idx" class="animal-card">
          <div class="card-header">
            <span>Животное {{ idx + 1 }}</span>
            <button class="remove-btn" @click="removeAnimal(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Инвентарный номер</label>
              <input v-model="animal[0]" type="text" />
            </div>
            <div class="form-field">
              <label>Пол</label>
              <select v-model="animal[1]">
                <option>Бычок</option>
                <option>Телка</option>
                <option>Корова</option>
                <option>Корова (нетель)</option>
              </select>
            </div>
            <div class="form-field">
              <label>Дата рождения</label>
              <input v-model="animal[2]" type="date" />
            </div>
            <div class="form-field">
              <label>Порода</label>
              <input v-model="animal[3]" type="text" />
            </div>
            <div class="form-field">
              <label>Группа</label>
              <input v-model="animal[4]" type="text" />
            </div>
          </div>
        </div>
        <button class="add-btn" @click="addAnimal">+ Добавить животное</button>
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
  name: 'LivestockForm',
  data() {
    return {
      formData: {
        animals: [
          ['', '', '', '', '']
        ]
      },
      summaryGroups: [
        { name: 'Дойные коровы', key: 'doynye', count: 1 },
        { name: 'Сухостойные коровы', key: 'suhostoynye', count: 2 },
        { name: 'Нетели (стельные)', key: 'neteli', count: 1 },
        { name: 'Бычки старше 1 года', key: 'bychki_star', count: 3 },
        { name: 'Телки до 1 года', key: 'telki_do', count: 2 },
        { name: 'Бычки до 1 года', key: 'bychki_do', count: 3 },
        { name: 'Телки новорожденные (0–2 мес)', key: 'telki_nov', count: 2 },
        { name: 'Бычки новорожденные (0–2 мес)', key: 'bychki_nov', count: 1 }
      ]
    }
  },
  computed: {
    totalAnimals() {
      return this.summaryGroups.reduce((sum, group) => sum + (group.count || 0), 0)
    }
  },
  methods: {
    addAnimal() {
      this.formData.animals.push(['', '', '', '', ''])
    },
    removeAnimal(index) {
      this.formData.animals.splice(index, 1)
    },
    updateSummary() {
      console.log('Summary updated:', this.summaryGroups)
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
  grid-template-columns: 180px 1fr;
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

.animal-card {
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

.summary-block {
  background: rgba(156, 39, 176, 0.08);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(156, 39, 176, 0.2);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.summary-item label {
  flex: 1;
  font-weight: 500;
  color: #000;
  margin: 0;
}

.summary-input {
  width: 80px;
  padding: 6px 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.summary-item span {
  color: #666;
  font-size: 14px;
}

.summary-total {
  padding-top: 16px;
  border-top: 1px solid rgba(156, 39, 176, 0.2);
  text-align: right;
  font-size: 16px;
}

.summary-total strong {
  color: #9c27b0;
  font-size: 18px;
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
  .summary-grid {
    grid-template-columns: 1fr;
  }
  .summary-item {
    flex-wrap: wrap;
  }
  .summary-item label {
    width: 100%;
  }
}
</style>