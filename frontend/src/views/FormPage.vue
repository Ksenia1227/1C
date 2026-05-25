<template>
  <div
    v-if="generated"
    class="page"
  >

    <h1 class="title">
      Данные организации
    </h1>

    <details open class="section">
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
    <summary>Номенклатура</summary>

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
            <td>{{ posev[7] }}</td>
            <td>{{ posev[8] }}</td>
            <td>{{ posev[8] }}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </details>

    <details class="section">
    <summary>Карточка остатка</summary>

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
              <td>{{ formatDate(employee[2]) }}</td>
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