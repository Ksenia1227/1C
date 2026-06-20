<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Оприходование</h3>
      <div class="items-list">
        <div
          v-for="(item, idx) in formData.registrations"
          :key="idx"
          class="item-card"
        >
          <div class="card-header">
            <span>Запись {{ idx + 1 }}</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeRegistration(idx)"
            >
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Дата</label>
              <input v-model="item.date" type="date" />
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="item.department_id">
                <option :value="null">Выберите подразделение</option>
                <option
                  v-for="d in divisions"
                  :key="d.division_id"
                  :value="d.division_id"
                >
                  {{ d.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Вид движения</label>
              <select v-model="item.movement_id">
                <option :value="null">Выберите вид движения</option>
                <option
                  v-for="m in movements"
                  :key="m.movement_id"
                  :value="m.movement_id"
                >
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Группа номенклатуры</label>
              <select v-model="item.nomenclature_type_id">
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
              <label>Инвентарный номер</label>
              <select v-model="item.animal_id">
                <option :value="null">Выберите животное</option>
                <option
                  v-for="a in animals"
                  :key="a.animal_id"
                  :value="a.animal_id"
                >
                  {{ a.inventory_number }} - {{ a.breed || "без породы" }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество голов</label>
              <input
                v-model.number="item.number"
                type="number"
                step="1"
                min="0"
              />
            </div>
            <div class="form-field">
              <label>Масса, кг</label>
              <input
                v-model.number="item.weight"
                type="number"
                step="1"
                min="0"
              />
            </div>
            <div class="form-field">
              <label>Цена, руб</label>
              <input
                v-model.number="item.price"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addRegistration">
          + Добавить запись
        </button>
      </div>
    </div>

    <div class="form-section">
      <h3>Приплод</h3>
      <div class="items-list">
        <div
          v-for="(item, idx) in formData.offsprings"
          :key="idx"
          class="item-card"
        >
          <div class="card-header">
            <span>Запись {{ idx + 1 }}</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeOffspring(idx)"
            >
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Дата</label>
              <input v-model="item.date" type="date" />
            </div>
            <div class="form-field full-width">
              <label>Счёт затрат</label>
              <select v-model="item.cost_account_id">
                <option :value="null">Выберите счет</option>
                <option
                  v-for="a in accounts"
                  :key="a.account_id"
                  :value="a.account_id"
                >
                  {{ a.code }} - {{ a.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Вид движения животных</label>
              <select v-model="item.movement_id">
                <option :value="null">Выберите вид движения</option>
                <option
                  v-for="m in movements"
                  :key="m.movement_id"
                  :value="m.movement_id"
                >
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Склад</label>
              <select v-model="item.building_id">
                <option :value="null">Выберите склад</option>
                <option
                  v-for="b in buildings"
                  :key="b.building_id"
                  :value="b.building_id"
                >
                  {{ b.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="item.department_id">
                <option :value="null">Выберите подразделение</option>
                <option v-for="d in divisions" :key="d.division_id" :value="d.division_id">
                  {{ d.name }}
                </option>
              </select>
            </div>
            <div class="form-field full-width">
              <label>Продукция</label>
              <select v-model="item.nomenclature_id">
                <option :value="null">Выберите продукцию</option>
                <option v-for="n in animals_group" :key="n.animal_group_id" :value="n.animal_group_id">
                  {{ n.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Инвентарный номер матери</label>
              <select v-model="item.mother_animal_id">
                <option :value="null">Выберите мать</option>
                <option v-for="a in animals" :key="a.animal_id" :value="a.animal_id">
                  {{ a.inventory_number }} - {{ a.breed || 'без породы' }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Инвентарный номер</label>
              <select v-model="item.animal_id">
                <option :value="null">Выберите животное</option>
                <option v-for="a in animals" :key="a.animal_id" :value="a.animal_id">
                  {{ a.inventory_number }} - {{ a.breed || 'без породы' }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество голов</label>
              <input v-model.number="item.head_count" type="number" step="1" min="0" />
            </div>
            <div class="form-field">
              <label>Масса, кг</label>
              <input v-model.number="item.weight" type="number" step="1" min="0" />
            </div>
            <div class="form-field">
              <label>Счёт учёта</label>
              <select v-model="item.account_id">
                <option :value="null">Выберите счет</option>
                <option v-for="a in accounts" :key="a.account_id" :value="a.account_id">
                  {{ a.code }} - {{ a.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Пол</label>
              <select v-model="item.gender">
                <option value="">Выберите пол</option>
                <option value="Бычок">Бычок</option>
                <option value="Телка">Телка</option>
                <option value="Корова">Корова</option>
                <option value="Корова (нетель)">Корова (нетель)</option>
                <option value="Бык">Бык</option>
              </select>
            </div>
            <div class="form-field">
              <label>Работник</label>
              <select v-model="item.employee_id">
                <option :value="null">Выберите работника</option>
                <option v-for="e in employees" :key="e.employee_id" :value="e.employee_id">
                  {{ e.last_name }} {{ e.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addOffspring">
          + Добавить запись
        </button>
      </div>
    </div>

    <div class="form-section">
      <h3>Привес</h3>
      <div class="items-list">
        <div v-for="(item, idx) in formData.weightGains" :key="idx" class="item-card">
          <div class="card-header">
            <span>Запись  {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeWeightGain(idx)">
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Дата</label>
              <input v-model="item.date" type="date" />
            </div>
            <div class="form-field">
              <label>Счёт затрат</label>
              <select v-model="item.cost_account_id">
                <option :value="null">Выберите счет</option>
                <option v-for="a in accounts" :key="a.account_id" :value="a.account_id">
                  {{ a.code }} - {{ a.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="item.department_id">
                <option :value="null">Выберите подразделение</option>
                <option v-for="d in divisions" :key="d.division_id" :value="d.division_id">
                  {{ d.name }}
                </option>
              </select>
            </div>
            <div class="form-field full-width">
              <label>Вид движения животных</label>
               <select v-model="item.movement_id">
                <option :value="null">Выберите вид движения</option>
                <option v-for="m in movements" :key="m.movement_id" :value="m.movement_id">
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Склад</label>
              <select v-model="item.building_id">
                <option :value="null">Выберите склад</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">
                  {{ b.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Инвентарный номер</label>
              <select v-model="item.animal_id">
                <option :value="null">Выберите животное</option>
                <option v-for="a in animals" :key="a.animal_id" :value="a.animal_id">
                  {{ a.inventory_number }} - {{ a.breed || 'без породы' }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество голов</label>
              <input v-model.number="item.head_count" type="number" step="1" min="0" />
            </div>
            <div class="form-field">
              <label>Масса, кг</label>
              <input v-model.number="item.weight" type="number" step="1" min="0" />
            </div>
            <div class="form-field">
              <label>Счёт учёта</label>
              <select v-model="item.account_id">
                <option :value="null">Выберите счет</option>
                <option v-for="a in accounts" :key="a.account_id" :value="a.account_id">
                  {{ a.code }} - {{ a.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addWeightGain">
          + Добавить запись
        </button>
      </div>
    </div>

    <div class="form-section">
      <h3>Перевод животных из одной группы в другую</h3>
      <div class="items-list">
        <div
          v-for="(item, idx) in formData.transfers"
          :key="idx"
          class="item-card"
        >
          <div class="card-header">
            <span>Запись  {{ idx + 1 }}</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeTransfer(idx)"
            >
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Дата</label>
              <input v-model="item.date" type="date" />
            </div>
            <div class="form-field">
              <label>Склад (откуда)</label>
              <select v-model="item.from_building_id">
                <option :value="null">Выберите склад</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">
                  {{ b.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Номенклатура отправитель</label>
              <select v-model="item.from_nomenclature_id">
                <option :value="null">Выберите номенклатуру</option>
                <option v-for="n in animals_group" :key="n.animal_group_id" :value="n.animal_group_id">
                  {{ n.name }}
                </option>
              </select>
            </div>
            <div class="form-field full-width">
              <label>Вид движения животных</label>
              <select v-model="item.movement_id">
                <option :value="null">Выберите вид движения</option>
                <option v-for="m in movements" :key="m.movement_id" :value="m.movement_id">
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Склад (куда)</label>
              <select v-model="item.to_building_id">
                <option :value="null">Выберите склад</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">
                  {{ b.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Подразделение</label>
              <select v-model="item.department_id">
                <option :value="null">Выберите подразделение</option>
                <option v-for="d in divisions" :key="d.division_id" :value="d.division_id">
                  {{ d.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Инвентарный номер</label>
              <select v-model="item.animal_id">
                <option :value="null">Выберите животное</option>
                <option v-for="a in animals" :key="a.animal_id" :value="a.animal_id">
                  {{ a.inventory_number }} - {{ a.breed || 'без породы' }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Номенклатура получатель</label>
              <select v-model="item.to_nomenclature_id">
                <option :value="null">Выберите номенклатуру</option>
                <option v-for="n in animals_group" :key="n.animal_group_id" :value="n.animal_group_id">
                  {{ n.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество голов</label>
               <input v-model.number="item.head_count" type="number" step="1" min="0" />
            </div>
            <div class="form-field">
              <label>Масса, кг</label>
              <input v-model.number="item.weight" type="number" step="1" min="0" />
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addTransfer">
          + Добавить запись
        </button>
      </div>
    </div>

    <div class="form-section">
      <h3>Надой</h3>
      <div class="items-list">
        <div v-for="(item, idx) in formData.milkings" :key="idx" class="item-card">
          <div class="card-header">
            <span>Запись {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeMilking(idx)">
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Дата</label>
              <input v-model="item.date" type="date" />
            </div>
            <div class="form-field">
              <label>Счёт затрат</label>
              <select v-model="item.cost_account_id">
                <option :value="null">Выберите счет</option>
                <option v-for="a in accounts" :key="a.account_id" :value="a.account_id">
                  {{ a.code }} - {{ a.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Склад</label>
              <select v-model="item.building_id">
                <option :value="null">Выберите склад</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">
                  {{ b.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество доек</label>
              <input v-model.number="item.milking_count" type="number" step="1" min="0" />
            </div>
            <div class="form-field">
              <label>Продукция</label>
              <select v-model="item.product_nomenclature_id">
                <option :value="null">Выберите продукцию</option>
                <option v-for="n in nomenclatures" :key="n.nomenclature_id" :value="n.nomenclature_id">
                  {{ n.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Инвентарный номер</label>
              <select v-model="item.animal_id">
                <option :value="null">Выберите животное</option>
                <option v-for="a in animals" :key="a.animal_id" :value="a.animal_id">
                  {{ a.inventory_number }} - {{ a.breed || 'без породы' }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество голов</label>
              <input v-model.number="item.head_count" type="number" step="1" min="0" />
            </div>
            <div class="form-field">
              <label>Надоено молока за день, л</label>
              <input v-model.number="item.milk_amount" type="number" step="0.1" min="0" />
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addMilking">
          + Добавить запись
        </button>
      </div>
    </div>

    <div class="form-section">
      <h3>Продажа продукции</h3>
      <div class="items-list">
        <div v-for="(item, idx) in formData.sales" :key="idx" class="items-card">
          <div class="card-header">
            <span>Запись  {{ idx + 1 }}</span>
            <button type="button" class="remove-btn" @click="removeSale(idx)">
              ✕
            </button>
          </div>
          <div class="form-grid">
            <div class="form-field">
              <label>Дата</label>
              <input v-model="item.date" type="date" />
            </div>
            <div class="form-field">
              <label>Номер</label>
              <input v-model="item.number" type="text" />
            </div>
            <div class="form-field">
              <label>Контрагент</label>
              <select v-model="item.counterparty_id">
                <option :value="null">Выберите контрагента</option>
                <option v-for="c in counterparties" :key="c.counterparty_id" :value="c.counterparty_id">
                  {{ c.name_program || c.name_for_doc }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Склад</label>
              <select v-model="item.building_id">
                <option :value="null">Выберите склад</option>
                <option v-for="b in buildings" :key="b.building_id" :value="b.building_id">
                  {{ b.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Продукция</label>
              <select v-model="item.nomenclature_id">
                <option :value="null">Выберите продукцию</option>
                <option v-for="n in nomenclatures" :key="n.nomenclature_id" :value="n.nomenclature_id">
                  {{ n.name }}
                </option>
              </select>
            </div>
            <div class="form-field">
              <label>Количество</label>
              <input v-model.number="item.quantity" type="number" step="0.01" min="0" />
            </div>
            <div class="form-field full-width">
              <label>Единица измерения</label>
              <select v-model="item.unit_id">
                <option :value="null">Выберите единицу</option>
                <option v-for="u in units" :key="u.unit_id" :value="u.unit_id">
                  {{ u.name }}
                </option>
              </select>
            </div>
            <div class="form-field full-width">
              <label>Цена, руб</label>
              <input v-model.number="item.price" type="number" step="0.01" min="0" />
            </div>
            <div class="form-field full-width">
              <label>Статус</label>
              <select v-model="item.status">
                <option value="">Выберите статус</option>
                <option value="Запланировано">Запланировано</option>
                <option value="Отгружено">Отгружено</option>
                <option value="Оплачено">Оплачено</option>
                <option value="Завершено">Завершено</option>
                <option value="Отменено">Отменено</option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="add-btn" @click="addSale">
          + Добавить запись
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
  name: "animalPro",
  data() {
    return {
      loading: false,
      tempIdCounter: 0,
      formData: {
        registrations: [],
        offsprings: [],
        weightGains: [],
        transfers: [],
        milkings: [],
        sales: [],
      },
    };
  },
  computed: {
    ...mapState("animalPro", {
      storeRegistrations: (state) => state.registrations,
      storeOffsprings: (state) => state.offsprings,
      storeWeightGains: (state) => state.weightGains,
      storeTransfers: (state) => state.transfers,
      storeMilkings: (state) => state.milkings,
      storeSales: (state) => state.sales,
      animals: (state) => state.animals,
      divisions: (state) => state.divisions,
      buildings: (state) => state.buildings,
      nomenclatures: (state) => state.nomenclatures,
      animals_group: (state) => state.animals_group,
      accounts: (state) => state.accounts,
      movements: (state) => state.movements,
      employees: (state) => state.employees,
      nomenclatureTypes: (state) => state.nomenclatureTypes,
      counterparties: (state) => state.counterparties,
      units: (state) => state.units,
    }),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions("animalPro", [
      "fetchRegistrations", "saveRegistration",
      "fetchOffsprings", "saveOffspring",
      "fetchWeightGains", "saveWeightGain",
      "fetchTransfers", "saveTransfer",
      "fetchMilkings", "saveMilking",
      "fetchSales", "saveSale",
      "fetchAnimals", "fetchDivisions", "fetchBuildings",
      "fetchNomenclatures", "fetchAnimals_group", "fetchAccounts", "fetchMovements", "fetchEmployees",
      "fetchCounterparties", "fetchUnits"
    ]),
    generateTempId() { return `temp_${Date.now()}_${++this.tempIdCounter}`; },
    
    async loadData() {
      this.loading = true;
      await Promise.all([
        this.fetchRegistrations(),
        this.fetchOffsprings(),
        this.fetchWeightGains(),
        this.fetchTransfers(),
        this.fetchMilkings(),
        this.fetchSales(),
        this.fetchAnimals(),
        this.fetchDivisions(),
        this.fetchBuildings(),
        this.fetchNomenclatures(),
        this.fetchAnimals_group(),
        this.fetchAccounts(),
        this.fetchMovements(),
        this.fetchEmployees(),
        this.fetchCounterparties(),
        this.fetchUnits()
      ]);
      
      this.formData.registrations = (this.storeRegistrations || []).map(i => ({ ...i, tempId: this.generateTempId() }));
      this.formData.offsprings = (this.storeOffsprings || []).map(i => ({ ...i, tempId: this.generateTempId() }));
      this.formData.weightGains = (this.storeWeightGains || []).map(i => ({ ...i, tempId: this.generateTempId() }));
      this.formData.transfers = (this.storeTransfers || []).map(i => ({ ...i, tempId: this.generateTempId() }));
      this.formData.milkings = (this.storeMilkings || []).map(i => ({ ...i, tempId: this.generateTempId() }));
      this.formData.sales = (this.storeSales || []).map(i => ({ ...i, tempId: this.generateTempId() }));
      this.loading = false;
    },

    // Регистрация
    addRegistration() {
      this.formData.registrations.push({
        tempId: this.generateTempId(),
        date: "", department_id: null, movement_id: null,
        nomenclature_type_id: null, animal_id: null,
        number: null, weight: null, price: null,
      });
    },
    removeRegistration(idx) {
      if (confirm("Удалить запись?")) this.formData.registrations.splice(idx, 1);
    },

    // Приплод
    addOffspring() {
      this.formData.offsprings.push({
        tempId: this.generateTempId(),
        date: "", cost_account_id: null, movement_id: null,
        building_id: null, department_id: null, nomenclature_id: null,
        mother_animal_id: null, animal_id: null,
        head_count: null, weight: null, account_id: null,
        gender: "", employee_id: null,
      });
    },
    removeOffspring(idx) {
      if (confirm("Удалить запись?")) this.formData.offsprings.splice(idx, 1);
    },

    // Привес
    addWeightGain() {
      this.formData.weightGains.push({
        tempId: this.generateTempId(),
        date: "", cost_account_id: null, department_id: null,
        movement_id: null, building_id: null, animal_id: null,
        head_count: null, weight: null, account_id: null,
      });
    },
    removeWeightGain(idx) {
      if (confirm("Удалить запись?")) this.formData.weightGains.splice(idx, 1);
    },

    // Переводы
    addTransfer() {
      this.formData.transfers.push({
        tempId: this.generateTempId(),
        date: "", from_building_id: null, from_nomenclature_id: null,
        movement_id: null, to_building_id: null, department_id: null,
        animal_id: null, to_nomenclature_id: null,
        head_count: null, weight: null,
      });
    },
    removeTransfer(idx) {
      if (confirm("Удалить запись?")) this.formData.transfers.splice(idx, 1);
    },

    // Дойка
    addMilking() {
      this.formData.milkings.push({
        tempId: this.generateTempId(),
        date: "", cost_account_id: null, building_id: null,
        milking_count: null, product_nomenclature_id: null,
        animal_id: null, head_count: null, milk_amount: null,
      });
    },
    removeMilking(idx) {
      if (confirm("Удалить запись?")) this.formData.milkings.splice(idx, 1);
    },

    // Продажа
    addSale() {
      this.formData.sales.push({
        tempId: this.generateTempId(),
        date: "", number: "", counterparty_id: null,
        building_id: null, nomenclature_id: null,
        quantity: null, unit_id: null, price: null, status: "",
      });
    },
    removeSale(idx) {
      if (confirm("Удалить запись?")) this.formData.sales.splice(idx, 1);
    },

    async sendForm() {
      this.loading = true;
      
      // Сохраняем все операции
      for (const item of this.formData.registrations) {
        if (!item.animal_id && !item.registration_animal_id) continue;
        const cleanData = {};
        for (const key in item) {
          if (key !== 'tempId') cleanData[key] = item[key];
        }
        await this.saveRegistration(cleanData);
      }
      
      for (const item of this.formData.offsprings) {
        if (!item.animal_id && !item.offspring_id) continue;
        const cleanData = {};
        for (const key in item) {
          if (key !== 'tempId') cleanData[key] = item[key];
        }
        await this.saveOffspring(cleanData);
      }
      
      for (const item of this.formData.weightGains) {
        if (!item.animal_id && !item.weight_gain_id) continue;
        const cleanData = {};
        for (const key in item) {
          if (key !== 'tempId') cleanData[key] = item[key];
        }
        await this.saveWeightGain(cleanData);
      }
      
      for (const item of this.formData.transfers) {
        if (!item.animal_id && !item.animal_transfer_id) continue;
        const cleanData = {};
        for (const key in item) {
          if (key !== 'tempId') cleanData[key] = item[key];
        }
        await this.saveTransfer(cleanData);
      }
      
      for (const item of this.formData.milkings) {
        if (!item.animal_id && !item.milking_id) continue;
        const cleanData = {};
        for (const key in item) {
          if (key !== 'tempId') cleanData[key] = item[key];
        }
        await this.saveMilking(cleanData);
      }
      
      for (const item of this.formData.sales) {
        if (!item.nomenclature_id && !item.product_sale_id) continue;
        const cleanData = {};
        for (const key in item) {
          if (key !== 'tempId') cleanData[key] = item[key];
        }
        await this.saveSale(cleanData);
      }
      
      this.loading = false;
      await this.loadData();
      alert("Все данные сохранены");
    },

    resetForm() {
      if (confirm("Сбросить все изменения?")) this.loadData();
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

.item-card {
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
