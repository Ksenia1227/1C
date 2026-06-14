<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Животные</h3>
      <div class="animals-list">
        <div
          v-for="(animal, idx) in formData.animals"
          :key="idx"
          class="animal-card"
        >
          <div class="card-header">
            <span>Животное {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeAnimal(idx)">
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Инвентарный номер</label>
              <input v-model.number="animal.inventory_number" type="text" />
            </div>
            <div class="form-field">
              <label>Пол</label>
              <select v-model="animal.gender">
                <option value="">Выберите пол</option>
                <option value="Бычок">Бычок</option>
                <option value="Телка">Телка</option>
                <option value="Корова">Корова</option>
                <option value="Корова (нетель)">Корова (нетель)</option>
                <option value="Бык">Бык</option>
              </select>
            </div>
            <div class="form-field">
              <label>Дата рождения</label>
              <input v-model="animal.birth_date" type="date" />
            </div>
            <div class="form-field">
              <label>Порода</label>
              <input v-model="animal.breed" type="text" />
            </div>
            <div class="form-field">
              <label>Группа</label>
              <select v-model="animal.group_id">
                <option :value="1">Бычок до 1 года</option>
                <option :value="2">Бычки старше одного года</option>
                <option :value="3">Бычок новорожденный</option>
                <option :value="4">Телки до 1 года</option>
                <option :value="5">Нетели</option>
                <option :value="6">Сухостойная корова</option>
                <option :value="7">Дойная корова</option>
                <option :value="8">Телки новорожденные</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addAnimal">
          + Добавить животное
        </button>
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
  name: "LivestockForm",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        animals: [],
      },
    };
  },
  computed: {
    ...mapState("livestock", {
      storeAnimals: (state) => state.animals,
      storeLoading: (state) => state.loading,
    }),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("livestock", [
      "fetchAnimals",
      "saveAnimal",
    ]),

    generateTempId() {
      return `temp_${Date.now()}_${++this.tempIdCounter}`;
    },

    async loadData() {
      this.loading = true;

      await this.fetchAnimals();

      if (
        this.storeAnimals &&
        Array.isArray(this.storeAnimals) &&
        this.storeAnimals.length > 0
      ) {
        this.formData.animals = this.storeAnimals.map((a) => {
          return {
            ...a,
            tempId: this.generateTempId(),
          };
        });
      } else {
        this.formData.animals = [];
      }

      this.loading = false;
    },

    addAnimal() {
      this.formData.animals.push({
        tempId: this.generateTempId(),
        inventory_number: "",
        gender: "",
        birth_date: "",
        breed: "",
      });
    },

    removeAnimal(index) {
      if (confirm("Вы уверены, что хотите удалить это животное?")) {
        this.formData.animals.splice(index, 1);
      }
    },

    async sendForm() {
      this.loading = true;

      for (let i = 0; i < this.formData.animals.length; i++) {
        const animal = this.formData.animals[i];

        if (!animal.inventory_number && !animal.animal_id) {
          console.log(
            `Животное ${i + 1} не имеет инвентарного номера, пропускаем`,
          );
          continue;
        }

        const cleanData = {};
        for (const key in animal) {
          if (key !== "tempId") {
            cleanData[key] = animal[key];
          }
        }

        await this.saveAnimal(cleanData);
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
  .form-field {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .form-field label {
    font-weight: 600;
  }
}
</style>
