<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Структура посевных площадей</h3>
      <div class="posev-list">
        <div v-for="(posev, idx) in formData.structures" :key="idx" class="posev-card">
          <div class="card-header">
            <span>Посев {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeStructure(idx)">✕</button>
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
              <select v-model="posev.field_id">
                <option :value="null">Выберите поле</option>
                <option 
                  v-for="field in fields" 
                  :key="field.field_id"
                  :value="field.field_id"
                >
                  {{ field.name }} 
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="posev.department_id">
                <option :value="null">Выберите подразделение</option>
                <option 
                  v-for="division in divisions" 
                  :key="division.division_id"
                  :value="division.division_id"
                >
                  {{ division.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Культура</label>
              <select v-model="posev.crop_id">
                <option :value="null">Выберите культуру</option>
                <option 
                  v-for="crop in crops" 
                  :key="crop.crop_id"
                  :value="crop.crop_id"
                >
                  {{ crop.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Группа</label>
              <input v-model="posev.group" type="text" placeholder="Группа" />
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addStructure">+ Добавить запись</button>
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
  name: "CropStructureForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        structures: [],
      },
    };
  },
  computed: {
    ...mapState("structure", {
      storeStructures: (state) => state.structures,
      storeFields: (state) => state.fields,
      storeCrops: (state) => state.crops,
      storeDivisions: (state) => state.divisions,
      storeLoading: (state) => state.loading,
    }),
    fields() {
      return this.storeFields || [];
    },
    crops() {
      return this.storeCrops || [];
    },
    divisions() {
      return this.storeDivisions || [];
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("structure", [
      "fetchStructures", 
      "saveStructure",
      "fetchFieldsForStructure",
      "fetchCropsForStructure",
      "fetchDivisionsForStructure"
    ]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await Promise.all([
        this.fetchStructures(),
        this.fetchFieldsForStructure(),
        this.fetchCropsForStructure(),
        this.fetchDivisionsForStructure()
      ]);

      if (this.storeStructures && Array.isArray(this.storeStructures) && this.storeStructures.length > 0) {
        this.formData.structures = this.storeStructures.map((s) => {
          return {
            ...s,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.structures = [];
      }

      this.loading = false;
    },

    addStructure() {
      this.formData.structures.push({
        tempId: this.generateTempId(),
        name: "",
        year: null,
        field_id: null,
        department_id: null,
        crop_id: null,
        group: ""
      });
    },

    removeStructure(index) {
      if (confirm("Вы уверены, что хотите удалить эту запись?")) {
        this.formData.structures.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.structures.length; i++) {
        const structure = this.formData.structures[i];

        if (!structure.name && !structure.structure_acreage_id) {
          console.log(`Запись ${i + 1} не имеет названия, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in structure) {
          if (key !== 'tempId') {
            cleanData[key] = structure[key];
          }
        }
        
        await this.saveStructure(cleanData);
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
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
}

.form-field textarea {
  resize: vertical;
  min-height: 60px;
}

.posev-card {
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