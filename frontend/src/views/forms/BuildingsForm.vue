<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Здания и сооружения</h3>
      <div class="buildings-list">
        <div v-for="(building, idx) in formData.buildings" :key="building.tempId || idx" class="building-card">
          <div class="card-header">
            <span>Здание {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeBuilding(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <label>Наименование</label>
              <input v-model="building.name" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Назначение</label>
              <textarea v-model="building.purpose" rows="2"></textarea>
            </div>
            <div class="form-field">
              <label>Площадь, м²</label>
              <input v-model.number="building.area" type="number" step="1" />
            </div>
            <div class="form-field">
              <label>Стоимость, млн ₽</label>
              <input v-model.number="building.cost" type="number" step="0.1" />
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addBuilding">+ Добавить здание</button>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="save-btn" :disabled="loading">
        {{ loading ? "Сохранение..." : "Сохранить" }}
      </button>
      <button type="button" class="reset-btn" @click="resetForm">
        Сбросить
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BuildingsForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        buildings: [],
      },
    };
  },
  computed: {
    ...mapState("building", {
      storeBuildings: (state) => state.buildings,
      storeLoading: (state) => state.loading,
    }),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("building", ["fetchBuildings", "saveBuilding"]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await this.fetchBuildings();

      if (this.storeBuildings && Array.isArray(this.storeBuildings) && this.storeBuildings.length > 0) {
        this.formData.buildings = this.storeBuildings.map((b) => {
          return {
            ...b,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.buildings = [];
      }

      this.loading = false;
    },

    addBuilding() {
      this.formData.buildings.push({
        tempId: this.generateTempId(),
        name: "",
        purpose: "",
        area: null,
        cost: null,
      });
    },

    removeBuilding(index) {
      if (confirm("Вы уверены, что хотите удалить это здание?")) {
        this.formData.buildings.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.buildings.length; i++) {
        const building = this.formData.buildings[i];

        if (!building.name && !building.building_id) {
          console.log(`Здание ${i + 1} не имеет названия, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in building) {
          if (key !== 'tempId') {
            cleanData[key] = building[key];
          }
        }
        
        await this.saveBuilding(cleanData);
      }

      this.loading = false;
      await this.loadData();
      alert("Данные сохранены");
    },

    resetForm() {
      if (confirm("Вы уверены, что хотите сбросить все изменения?")) {
        this.loadData();
      }
    },
  },
};
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
  grid-template-columns: 140px 1fr;
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
.form-field textarea {
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
  font-family: inherit;
  resize: vertical;
}

.form-field textarea {
  min-height: 60px;
}

.building-card {
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

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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