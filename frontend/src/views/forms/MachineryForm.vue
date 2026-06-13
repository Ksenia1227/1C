<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Машино-тракторный парк</h3>
      <div class="machines-list">
        <div v-for="(machine, idx) in formData.assets" :key="idx" class="machine-card">
          <div class="card-header">
            <span>Новая единица техники {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeAsset(idx)">✕</button>
          </div>
          <div class="form-grid">
            <div class="form-field full-width">
              <label>Наименование</label>
              <input v-model="machine.name" type="text" />
            </div>
            <div class="form-field">
              <label>Изготовитель</label>
              <input v-model="machine.manufacturer" type="text" />
            </div>
            <div class="form-field">
              <label>Местонахождение</label>
              <select v-model="machine.building_id">
                <option :value="null">Выберите сооружение</option>
                <option 
                  v-for="building in buildings" 
                  :key="building.building_id"
                  :value="building.building_id"
                >
                  {{ building.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Марка</label>
              <input v-model="machine.model" type="text" />
            </div>
            <div class="form-field">
              <label>Дата выпуска</label>
              <input v-model="machine.manufacture_year" type="number" />
            </div>
            <div class="form-field">
              <label>Номер паспорта (регистрационный)</label>
              <input v-model="machine.passport_number" type="text" />
            </div>
            <div class="form-field">
              <label>Мощность, л.с</label>
              <input v-model.number="machine.power" type="number" />
            </div>
            <div class="form-field">
              <label>Номер двигателя</label>
              <input v-model="machine.engine_number" type="text" />
            </div>
            <div class="form-field">
              <label>Заводской номер</label>
              <input v-model="machine.serial_number" type="text" />
            </div>
            <div class="form-field">
              <label>Срок службы, мес</label>
              <input v-model.number="machine.service_life" type="number" />
            </div>
            <div class="form-field">
              <label>Первоначальная стоимость</label>
              <input v-model.number="machine.initial_cost" type="number" step="0.01" />
            </div>
            <div class="form-field">
              <label>Дата покупки</label>
              <input v-model="machine.purchase_date" type="date" />
            </div>
            <div class="form-field">
              <label>Дата ввода в эксплуатацию</label>
              <input v-model="machine.commissioning_date" type="date" />
            </div>
            <div class="form-field">
              <label>Дата снятия с учета</label>
              <input v-model="machine.decommissioning_date" type="date" />
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addAsset">+ Добавить единицу техники</button>
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
  name: "MachineryForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        assets: [],
      },
    };
  },
  computed: {
    ...mapState("fixedAsset", {
      storeAssets: (state) => state.assets,
      storeLoading: (state) => state.loading,
    }),
    ...mapState("building", {
      storeBuildings: (state) => state.buildings,
    }),
    buildings() {
      return this.storeBuildings || [];
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("fixedAsset", ["fetchAssets", "saveAsset"]),
    ...mapActions("building", ["fetchBuildings"]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await Promise.all([this.fetchAssets(), this.fetchBuildings()]);

      if (this.storeAssets && Array.isArray(this.storeAssets) && this.storeAssets.length > 0) {
        this.formData.assets = this.storeAssets.map((a) => {
          return {
            ...a,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.assets = [];
      }

      this.loading = false;
    },

    addAsset() {
      this.formData.assets.push({
        tempId: this.generateTempId(),
        name: "",
        manufacturer: "",
        building_id: null,
        model: "",
        manufacture_year: null,
        passport_number: "",
        power: null,
        engine_number: "",
        serial_number: "",
        service_life: null,
        initial_cost: null,
        purchase_date: "",
        commissioning_date: "",
        decommissioning_date: "",
      });
    },

    removeAsset(index) {
      if (confirm("Вы уверены, что хотите удалить эту единицу техники?")) {
        this.formData.assets.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.assets.length; i++) {
        const asset = this.formData.assets[i];

        if (!asset.name && !asset.fixed_asset_id) {
          console.log(`Техника ${i + 1} не имеет названия, пропускаем`);
          continue;
        }

        const cleanData = {};
        for (const key in asset) {
          if (key !== 'tempId') {
            cleanData[key] = asset[key];
          }
        }
        
        await this.saveAsset(cleanData);
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
  grid-template-columns: 200px 1fr;
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

.machine-card {
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