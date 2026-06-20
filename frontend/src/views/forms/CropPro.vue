<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Поля</h3>
      <div class="fields-list">
        <div v-for="(field, idx) in formData.fields" :key="idx" class="field-card">
          <div class="card-header">
            <span>Поле {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeField(idx)">✕</button>
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
              <input v-model.number="field.field_area" type="number" step="0.01" />
            </div>
            <div class="form-field">
              <label>Код</label>
              <input v-model="field.code" type="text" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="field.departament_id">
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
          </div>
        </div>
        <button type="button" class="add-btn" @click="addField">+ Добавить поле</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Номенклатура растениеводства</h3>
      <div class="nomenclatures-list">
        <div v-for="(nomenclature, idx) in formData.nomenclatures" :key="idx" class="nomenclature-card">
          <div class="card-header">
            <span>Номенклатура  {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeNomenclature(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Вид номенклатуры</label>
              <select v-model="nomenclature.item_type">
                <option :value="1">Продукция</option>
                <option :value="2">Животные</option>
                <option :value="3">Материалы</option>
                <option :value="4">Оборудование</option>
                <option :value="5">Спецодежда</option>
                <option :value="6">Топливо</option>
                <option :value="7">Услуги</option>
                <option :value="8">Товары на ответственном хранении</option>
                <option :value="9">Товары на комиссии</option>
              </select>
            </div>
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="nomenclature.name" type="text" />
            </div>
            <div class="form-field full-width">
              <label>Полное наименование</label>
              <input v-model="nomenclature.full_name" type="text" />
            </div>
            <div class="form-field">
              <label>Единица измерения</label>
              <select v-model="nomenclature.unit_id">
                <option :value="1">Штука</option>
                <option :value="2">Литр</option>
                <option :value="3">Комплект</option>
                <option :value="4">Килограмм</option>
                <option :value="5">Тонна</option>
                <option :value="6">Грамм</option>
                <option :value="7">Центнер</option>
                <option :value="8">Голова</option>
                <option :value="9">Гектар</option>
                <option :value="10">Метр</option>
                <option :value="11">Квадратный метр</option>
                <option :value="12">Кубический метр</option>
                <option :value="13">Мешок</option>
                <option :value="14">Рулон</option>
                <option :value="15">Доза</option>
                <option :value="16">Упаковка</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addNomenclature">+ Добавить номенклатуру</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Культуры</h3>
      <div class="crop-list">
        <div v-for="(crop, idx) in formData.crops" :key="idx" class="crop-card">
          <div class="card-header">
            <span>Культура {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeCrop(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Наименование</label>
              <input v-model="crop.name" type="text" />
            </div>
            <div class="form-field">
              <label>Группа</label>
              <select v-model="crop.group_id">
                <option :value="1">Зерновые культуры</option>
                <option :value="2">Масличные культуры</option>
                <option :value="3">Кормовые культуры</option>
                <option :value="4">Бобовые культуры</option>
                <option :value="5">Технические культуры</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addCrop">+ Добавить культуру</button>
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
  name: "CropForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        fields: [],
        nomenclatures: [],
        crops: [],
      },
    };
  },
  computed: {
    ...mapState("crop", {
      storeFields: (state) => state.fields,
      storeNomenclatures: (state) => state.nomenclatures,
      storeCrops: (state) => state.crops,
      storeLoading: (state) => state.loading,
    }),
    ...mapState("organization", {
      storeDivisions: (state) => state.divisions,
    }),
    divisions() {
      return this.storeDivisions || [];
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("crop", [
      "fetchFields", 
      "saveField", 
      "fetchNomenclatures", 
      "saveNomenclature",
      "fetchCrops", 
      "saveCrop"
    ]),
    ...mapActions("organization", ["fetchDivisions"]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await Promise.all([
        this.fetchFields(), 
        this.fetchNomenclatures(), 
        this.fetchCrops(),
        this.fetchDivisions()
      ]);

      if (this.storeFields && Array.isArray(this.storeFields)) {
        this.formData.fields = this.storeFields.map((f) => {
          return {
            ...f,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.fields = [];
      }

      if (this.storeNomenclatures && Array.isArray(this.storeNomenclatures)) {
        this.formData.nomenclatures = this.storeNomenclatures.map((n) => {
          return {
            ...n,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.nomenclatures = [];
      }

      if (this.storeCrops && Array.isArray(this.storeCrops)) {
        this.formData.crops = this.storeCrops.map((c) => {
          return {
            ...c,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.crops = [];
      }

      this.loading = false;
    },

    addField() {
      this.formData.fields.push({
        tempId: this.generateTempId(),
        group: "",
        name: "",
        field_area: null,
        code: "",
        departament_id: "",
      });
    },

    removeField(index) {
      if (confirm("Вы уверены, что хотите удалить это поле?")) {
        this.formData.fields.splice(index, 1);
      }
    },

    addNomenclature() {
      this.formData.nomenclatures.push({
        tempId: this.generateTempId(),
        item_type: "",
        name: "",
        full_name: "",
        unit_id: "",
      });
    },

    removeNomenclature(index) {
      if (confirm("Вы уверены, что хотите удалить эту номенклатуру?")) {
        this.formData.nomenclatures.splice(index, 1);
      }
    },

    addCrop() {
      this.formData.crops.push({
        tempId: this.generateTempId(),
        name: "",
        group_id: "",
      });
    },

    removeCrop(index) {
      if (confirm("Вы уверены, что хотите удалить эту культуру?")) {
        this.formData.crops.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.fields.length; i++) {
        const field = this.formData.fields[i];
        if (!field.name && !field.field_id) {
          console.log(`Поле ${i + 1} не имеет названия, пропускаем`);
          continue;
        }
        const cleanData = {};
        for (const key in field) {
          if (key !== 'tempId') {
            cleanData[key] = field[key];
          }
        }
        await this.saveField(cleanData);
      }

      for (let i = 0; i < this.formData.nomenclatures.length; i++) {
        const nomenclature = this.formData.nomenclatures[i];
        if (!nomenclature.name && !nomenclature.nomenclature_id) {
          console.log(`Номенклатура ${i + 1} не имеет названия, пропускаем`);
          continue;
        }
        const cleanData = {};
        for (const key in nomenclature) {
          if (key !== 'tempId') {
            cleanData[key] = nomenclature[key];
          }
        }
        await this.saveNomenclature(cleanData);
      }

      for (let i = 0; i < this.formData.crops.length; i++) {
        const crop = this.formData.crops[i];
        if (!crop.name && !crop.crop_id) {
          console.log(`Культура ${i + 1} не имеет названия, пропускаем`);
          continue;
        }
        const cleanData = {};
        for (const key in crop) {
          if (key !== 'tempId') {
            cleanData[key] = crop[key];
          }
        }
        await this.saveCrop(cleanData);
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
.form-field select {
  width: 100%;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
}

.field-card,
.nomenclature-card,
.crop-card {
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