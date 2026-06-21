<template>
  <div class="initial-balance">
    <div class="page-header">
      <h2>Начальные остатки</h2>
      <div class="header-info">
        <span class="date-label">Дата расчёта: {{ calcDate }}</span>
        <button class="refresh-btn" @click="loadData" :disabled="loading">
          {{ loading ? "Загрузка..." : "Обновить" }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-wrapper">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>

    <div v-else-if="error" class="error-wrapper">
      <p class="error-text">Ошибка загрузки данных</p>
      <button class="retry-btn" @click="loadData">Повторить</button>
    </div>

    <div v-else class="table-wrapper">
      <table class="balance-table">
        <thead>
          <tr>
            <th>Счет</th>
            <th>Дебет</th>
            <th>Кредит</th>
            <th>Расшифровка</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in balanceData" :key="idx">
            <td>{{ item.code }}</td>
            <td class="amount">{{ formatNumber(item.debet) }}</td>
            <td class="amount">{{ formatNumber(item.credit) }}</td>
            <td>{{ item.description }}</td>
          </tr>
          <tr class="total-row">
            <td><strong>Итого</strong></td>
            <td class="amount"><strong>{{ formatNumber(totalDebet) }}</strong></td>
            <td class="amount"><strong>{{ formatNumber(totalCredit) }}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import instance from "@/middlewares";

export default {
  name: "InitialBalance",
  data() {
    return {
      loading: false,
      error: null,
      calcDate: "2026-04-01",
      balanceData: [],
    };
  },
  computed: {
    totalDebet() {
      return this.balanceData.reduce((sum, item) => sum + (item.debet || 0), 0);
    },
    totalCredit() {
      return this.balanceData.reduce((sum, item) => sum + (item.credit || 0), 0);
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    formatNumber(value) {
      if (value === null || value === undefined) return "0";
      return new Intl.NumberFormat("ru-RU").format(Math.round(value));
    },

    async loadData() {
      this.loading = true;
      this.error = null;

      try {
        const response = await instance.get("/initial-balance");
        console.log("Ответ от сервера:", response.data);

        if (response.data && response.data.length > 0) {
          this.balanceData = response.data.map((item) => ({
            code: item.code || "-",
            debet: item.balance > 0 ? item.balance : 0,
            credit: item.balance < 0 ? Math.abs(item.balance) : 0,
            description: this.getDescription(item.code),
          }));
        } else {
          this.balanceData = [];
        }
      } catch (error) {
        console.error("Ошибка загрузки начальных остатков:", error);
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.loading = false;
      }
    },

    getDescription(code) {
      const descriptions = {
        "01.01": "Основные средства: Здания, Техника",
        "02": "Амортизация ОС: Начисленная амортизация на дату начала учета",
        "10.13.1": "Корма собственного производства",
        "10.13.2": "Корма покупные",
        "10.03.01": "Топливо на складе",
        "10.05": "Запасные части",
        "10.12.2": "Удобрения, средства защиты растений и животных покупные",
        "11.01": "Молодняк животных",
        "11.02": "Животные на откорме",
        "20.01.1": "Основное производство (Растениеводство): затраты на посев, уход за культурами на дату ввода остатков",
        "20.01.2": "Основное производство (Животноводство): затраты на содержание стада (корма, з/п)",
        "43": "Готовая продукция: товарное молоко, бычки",
        "51": "Расчетный счет: остаток денежных средств в банке",
        "50": "Касса: денежные средства в кассе предприятия",
        "60": "Расчеты с поставщиками",
        "62": "Расчеты с покупателями",
        "80": "Уставный капитал: зарегистрированный уставный капитал",
        "84": "Нераспределенная прибыль (Непокрытый убыток): прибыль по итогам предыдущих лет",
        "86": "Целевое финансирование: государственная субсидия на поддержку растениеводства",
      };
      return descriptions[code] || "";
    },
  },
};
</script>

<style scoped>
.initial-balance {
  padding: 24px;
  background: var(--color-bg);
  min-height: calc(100vh - 44px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.page-header h2 {
  margin: 0;
  color: #9c27b0;
  font-size: 24px;
  font-weight: 600;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.date-label {
  color: #666;
  font-size: 14px;
}

.refresh-btn {
  padding: 8px 20px;
  background: #9c27b0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #7b1fa2;
  transform: translateY(-1px);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.table-wrapper {
  background: var(--color-block);
  border-radius: 16px;
  border: 1px solid rgba(156, 39, 176, 0.2);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.balance-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.balance-table thead {
  background: rgba(156, 39, 176, 0.08);
}

.balance-table th {
  padding: 14px 20px;
  text-align: left;
  font-weight: 600;
  color: #9c27b0;
  border-bottom: 2px solid rgba(156, 39, 176, 0.2);
}

.balance-table td {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: #000;
}

.balance-table tbody tr:hover {
  background: rgba(156, 39, 176, 0.03);
}

.balance-table .amount {
  font-weight: 500;
  font-family: monospace;
  font-size: 14px;
  text-align: right;
  min-width: 120px;
}

.balance-table .total-row {
  background: rgba(156, 39, 176, 0.06);
  font-weight: 600;
}

.balance-table .total-row td {
  border-top: 2px solid rgba(156, 39, 176, 0.2);
  padding-top: 14px;
}

.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: var(--color-block);
  border-radius: 16px;
  border: 1px solid rgba(156, 39, 176, 0.2);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(156, 39, 176, 0.15);
  border-top: 4px solid #9c27b0;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-wrapper p {
  margin-top: 16px;
  color: #666;
}

.error-wrapper {
  text-align: center;
  padding: 40px;
  background: var(--color-block);
  border-radius: 16px;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.error-text {
  color: #f44336;
  font-size: 16px;
  margin-bottom: 16px;
}

.retry-btn {
  padding: 10px 24px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background: #d32f2f;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .initial-balance {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-info {
    width: 100%;
    justify-content: space-between;
  }

  .balance-table {
    font-size: 12px;
  }

  .balance-table th,
  .balance-table td {
    padding: 8px 12px;
  }

  .balance-table .amount {
    font-size: 12px;
    min-width: 80px;
  }
}
</style>