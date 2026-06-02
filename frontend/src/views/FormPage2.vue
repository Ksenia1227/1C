<template>
  <div
    v-if="generated"
    class="page"
  >

    <h1 class="title">
      Данные организации
    </h1>

    <details class="section">
      <summary>Организация</summary>

      <div class="card">
        <p><strong>Вид:</strong> {{ generated.organization[0] }}</p>
        <p><strong>Сокращенное наименование:</strong> {{ generated.organization[1] }}</p>
        <p><strong>Полное наименование:</strong> {{ generated.organization[2] }}</p>
        <p><strong>ИНН:</strong> {{ generated.organization[3] }}</p>
        <p><strong>КПП:</strong> {{ generated.organization[4] }}</p>
        <p><strong>ОГРН:</strong> {{ generated.organization[5] }}</p>
        <p><strong>Дата регистрации:</strong> {{ formatDate(generated.organization[6]) }}</p>
        <p><strong>Регистрирующий орган:</strong> {{ generated.organization[7] }}</p>
        <p><strong>Юридический адрес:</strong> {{ generated.organization[8] }}</p>
        <p><strong>Фактический адрес:</strong> {{ generated.organization[9] }}</p>
        <p><strong>Телефон:</strong> {{ generated.organization[10] }}</p>
        <p><strong>Электронная почта:</strong> {{ generated.organization[11] }}</p>
      </div>
    </details>

    <details class="section">
      <summary>Подразделения</summary>

      <div class="card">
        <ul>
          <li
            v-for="division in generated.divisions"
            :key="division"
          >
            {{ division }}
          </li>
        </ul>
      </div>
    </details>

    <details class="section">
    <summary>Банковские реквизиты</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Банк</th>
            <th>Расчетный счет</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(bank, index) in generated.banks"
            :key="index"
            >
            <td>{{ bank[0] }}</td>
            <td>{{ bank[1] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Налоговая инспекция</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Код инспекции</th>
            <th>Наименование</th>
            <th>Полное наименование</th>
            <th>ОКТМО</th>
            <th>ОКАТО</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(tax, index) in generated.tax"
            :key="index"
            >
            <td>{{ tax[0] }}</td>
            <td>{{ tax[1] }}</td>
            <td>{{ tax[2] }}</td>
            <td>{{ tax[3] }}</td>
            <td>{{ tax[4] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Пенсионный фонд (ПФР)</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Регистрационный номер</th>
            <th>Код территориального органа</th>
            <th>Наименование территориального органа</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(pfr, index) in generated.pfr"
            :key="index"
            >
            <td>{{ pfr[0] }}</td>
            <td>{{ pfr[1] }}</td>
            <td>{{ pfr[2] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Фонд социального страхования (ФСС)</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Регистрационный номер</th>
            <th>Код подчиненности</th>
            <th>Территориальный орган</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(fss, index) in generated.fss"
            :key="index"
            >
            <td>{{ fss[0] }}</td>
            <td>{{ fss[1] }}</td>
            <td>{{ fss[2] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Коды статистики</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>ОКОПФ</th>
            <th>ОКФС</th>
            <th>ОКВЭД</th>
            <th>ОКПО</th>
            <th>Код территориального органа Росстата</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(stat, index) in generated.stat"
            :key="index"
            >
            <td>{{ stat[0] }}</td>
            <td>{{ stat[1] }}</td>
            <td>{{ stat[2] }}</td>
            <td>{{ stat[3] }}</td>
            <td>{{ stat[4] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Номенклатура (растениеводство)</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Вид номенклатуры</th>
            <th>Наименование</th>
            <th>Полное наименование</th>
            <th>Единица</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(item, index) in generated.nomenclature.table_data"
            :key="index"
            >
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
            <td>{{ item[2] }}</td>
            <td>{{ item[3] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
      <summary>Поля</summary>

      <div class="table-wrapper">
          <table>
          <thead>
              <tr>
              <th>Группа</th>
              <th>Наименование</th>
              <th>Площадь поля, га</th>
              <th>Код</th>
              <th>Подразделение</th>
              </tr>
          </thead>

          <tbody>
              <tr
              v-for="(field, index) in generated.fields"
              :key="index"
              >
              <td>{{ field.group }}</td>
              <td>{{ field.name }}</td>
              <td>{{ field.area }}</td>
              <td>{{ field.code }}</td>
              <td>{{ field.division }}</td>
              </tr>
          </tbody>
          </table>
      </div>
    </details>

    <details class="section">
    <summary>Культуры</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Наименование</th>
            <th>Группа</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(crop, index) in generated.posev.crop_table_data"
            :key="index"
            >
            <td>{{ crop.name }}</td>
            <td>{{ crop.group }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Карточка структуры посевных площадей</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Наименование</th>
            <th>Группа</th>
            <th>Поле</th>
            <th>Подразделение</th>
            <th>Культура</th>
            <th>Площадь поля, га</th>
            <th>Год</th>
            <th>Состав почв</th>
            <th>Рекомендации по удобрениям</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(posev, index) in generated.posev.posev_data"
            :key="index"
            >
            <td>{{ posev[0] }}</td>
            <td>{{ posev[1] }}</td>
            <td>{{ posev[2] }}</td>
            <td>{{ posev[3] }}</td>
            <td>{{ posev[4] }}</td>
            <td>{{ posev[5] }}</td>
            <td>{{ posev[6] }}</td>
            <td>{{ posev[7] }}</td>
            <td>{{ posev[8] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Карточка остатка (растениеводство)</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Наименование</th>
            <th>Счет</th>
            <th>Склад</th>
            <th>Серия (партия)</th>
            <th>Количество</th>
            <th>Ед. изм.</th>
            <th>Код номенклатуры</th>
            <th>Подразделение</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(item, index) in generated.crop_ost"
            :key="index"
            >
            <td>{{ item[0] }}</td>
            <td>{{ item[1] }}</td>
            <td>{{ item[2] }}</td>
            <td>{{ item[3] }}</td>
            <td>{{ item[4] }}</td>
            <td>{{ item[5] }}</td>
            <td>{{ item[6] }}</td>
            <td>{{ item[7] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
      <summary>Поголовье по группам</summary>

      <div class="summary-block">
        <pre>{{ generated.livestock.summary }}</pre>
      </div>
    </details>

    <details class="section">
    <summary>Животные</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Инвентарный номер</th>
            <th>Пол</th>
            <th>Дата рождения</th>
            <th>Порода</th>
            <th>Группа</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(live, index) in generated.livestock.livestock"
            :key="index"
            >
            <td>{{ live[0] }}</td>
            <td>{{ live[1] }}</td>
            <td>{{ formatDate(live[2]) }}</td>
            <td>{{ live[3] }}</td>
            <td>{{ live[4] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Ввод остатков животноводство</summary>

    <div class="table-wrapper">
        <table>
        <thead>
            <tr>
            <th>Счет</th>
            <th>Инвентарный номер</th>
            <th>Подразделение</th>
            <th>Склад</th>
            <th>Живая масса, кг</th>
            <th>Сумма, руб</th>
            <th>Первоначальная стоимость, руб</th>
            <th>Срок полезного использования, мес</th>
            <th>Дата принятия к учету</th>
            <th>Количество голов</th>
            </tr>
        </thead>

        <tbody>
            <tr
            v-for="(liveOst, index) in generated.livestock.ani_ost"
            :key="index"
            >
            <td>{{ liveOst[0] }}</td>
            <td>{{ liveOst[1] }}</td>
            <td>{{ liveOst[2] }}</td>
            <td>{{ liveOst[3] }}</td>
            <td>{{ liveOst[4] }}</td>
            <td>{{ liveOst[5] }}</td>
            <td>{{ liveOst[6] }}</td>
            <td>{{ liveOst[7] }}</td>
            <td>{{ liveOst[8] }}</td>
            <td>{{ liveOst[9] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
      <summary>Здания и сооружения</summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Назначение</th>
              <th>Площадь, м²</th>
              <th>Стоимость, млн ₽</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(building, index) in generated.buildings"
              :key="index"
            >
              <td>{{ building[0] }}</td>
              <td>{{ building[1] }}</td>
              <td>{{ building[2] }}</td>
              <td>{{ building[3] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <details class="section">
      <summary>Машинно-тракторный парк</summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Изготовитель</th>
              <th>Местонахождение</th>
              <th>Марка</th>
              <th>Дата выпуска</th>
              <th>Номер паспорта (регистрационный)</th>
              <th>Мощность, л.с</th>
              <th>Номер двигателя</th>
              <th>Заводской номер</th>
              <th>Срок службы, мес</th>
              <th>Первоначальная стоимость</th>
              <th>Дата покупки</th>
              <th>Дата ввода в эксплуатацию</th>
              <th>Дата снятия с учета</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(machine, index) in generated.machines"
              :key="index"
            >
              <td>{{ machine[0] }}</td>
              <td>{{ machine[1] }}</td>
              <td>{{ machine[2] }}</td>
              <td>{{ machine[3] }}</td>
              <td>{{ machine[4] }}</td>
              <td>{{ machine[5] }}</td>
              <td>{{ machine[6] }}</td>
              <td>{{ machine[7] }}</td>
              <td>{{ machine[8] }}</td>
              <td>{{ machine[9] }}</td>
              <td>{{ machine[10] }}</td>
              <td>{{ machine[11] }}</td>
              <td>{{ machine[12] }}</td>
              <td>{{ machine[13] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <details class="section">
      <summary>Материалы и товары</summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Вид номенклатуры</th>
              <th>Наименование</th>
              <th>Полное Наименование</th>
              <th>Единица</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in generated.materials.materials_table"
              :key="index"
            >
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
              <td>{{ item[2] }}</td>
              <td>{{ item[3] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <details class="section">
      <summary>Остатки материалов и товаров</summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Номенклатура</th>
              <th>Счет</th>
              <th>Склад</th>
              <th>Количество</th>
              <th>Ед. изм.</th>
              <th>Номер</th>
              <th>Контрагент</th>
              <th>Стоимость, руб</th>
              <th>Подразделение</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in generated.materials.materials_ost_table"
              :key="index"
            >
              <td>{{ item[0] }}</td>
              <td>{{ item[1] }}</td>
              <td>{{ item[2] }}</td>
              <td>{{ item[3] }}</td>
              <td>{{ item[4] }}</td>
              <td>{{ item[5] }}</td>
              <td>{{ item[6] }}</td>
              <td>{{ item[7] }}</td>
              <td>{{ item[8] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <details class="section">
      <summary>Контрагенты</summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Комментарий</th>
              <th>Вид контрагента</th>
              <th>Наименование для документа</th>
              <th>Наименование в программе</th>
              <th>Страна регистрации</th>
              <th>ИНН</th>
              <th>КПП</th>
              <th>ОГРН</th>
              <th>Банк</th>
              <th>Расчетный счет</th>
              <th>Юридический адрес</th>
              <th>Фактический адрес</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Контактное лицо</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(contractor, index) in generated.contractors.contractors_table"
              :key="index"
            >
              <td>{{ contractor[0] }}</td>
              <td>{{ contractor[1] }}</td>
              <td>{{ contractor[2] }}</td>
              <td>{{ contractor[3] }}</td>
              <td>{{ contractor[4] }}</td>
              <td>{{ contractor[5] }}</td>
              <td>{{ contractor[6] }}</td>
              <td>{{ contractor[7] }}</td>
              <td>{{ contractor[8] }}</td>
              <td>{{ contractor[9] }}</td>
              <td>{{ contractor[10] }}</td>
              <td>{{ contractor[11] }}</td>
              <td>{{ contractor[12] }}</td>
              <td>{{ contractor[13] }}</td>
              <td>{{ contractor[14] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <details class="section">
      <summary>Договоры с контрагентами</summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Вид договора</th>
              <th>Наименование</th>
              <th>Дата</th>
              <th>Срок действия</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(contract, index) in generated.contractors.contracts_table"
              :key="index"
            >
              <td>{{ contract[0] }}</td>
              <td>{{ contract[1] }}</td>
              <td>{{ formatDate(contract[2]) }}</td>
              <td>{{ contract[3] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <details class="section">
      <summary>
        Сотрудники ({{ generated.employees.employees.length }})
      </summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Пол</th>
              <th>Дата рождения</th>
              <th>ИНН</th>
              <th>СНИЛС</th>
              <th>Гражданство</th>
              <th>Паспорт</th>
              <th>Кем выдан</th>
              <th>Дата выдачи</th>
              <th>Адрес по прописке</th>
              <th>Телефон</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(employee, index) in generated.employees.employees"
              :key="index"
            >
              <td>{{ employee[0] }}</td>
              <td>{{ employee[1] }}</td>
              <td>{{ employee[2] }}</td>
              <td>{{ employee[3] }}</td>
              <td>{{ employee[4] }}</td>
              <td>{{ employee[5] }}</td>
              <td>{{ employee[6] }}</td>
              <td>{{ employee[7] }}</td>
              <td>{{ employee[8] }}</td>
              <td>{{ employee[9] }}</td>
              <td>{{ employee[10] }}</td>
              <td>{{ employee[11] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
    <details class="section">
      <summary>Договоры с сотрудниками</summary>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Номер</th>
              <th>Дата приема на работу</th>
              <th>Подразделение</th>
              <th>Должность</th>
              <th>Оклад</th>
              <th>Ставка</th>
              <th>Вид занятости</th>
              <th>Тип документа</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(contract, index) in generated.employees.contracts"
              :key="index"
            >
              <td>{{ contract[0] }}</td>
              <td>{{ contract[1] }}</td>
              <td>{{ contract[2] }}</td>
              <td>{{ contract[3] }}</td>
              <td>{{ contract[4] }} ₽</td>
              <td>{{ contract[5] }}</td>
              <td>{{ contract[6] }}</td>
              <td>{{ contract[7] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  </div>
</template>

<script>
export default {
  computed: {
    generated() {
      return this.$store.state.generator.data
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return "-"

      return new Date(date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    }
  },

  async mounted() {
    await this.$store.dispatch("generator/loadData")
  }
}
</script>

<style scoped>
.page {
  padding: 40px;
  color: var(--color-text);
  background: var(--color-bg);
}

.title {
  margin-bottom: 30px;
}

.section {
  margin-bottom: 20px;
  border-radius: 14px;
  overflow: hidden;
  background: var(--color-block);
  border: 1px solid rgba(255,255,255,0.08);
}

summary {
  padding: 18px 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  user-select: none;
}

.card {
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.card p {
  margin: 8px 0;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px;
  text-align: left;
  border-top: 1px solid rgba(255,255,255,0.06);
}

th {
  background: rgba(255,255,255,0.03);
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style>