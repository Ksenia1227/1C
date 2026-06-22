<template>
  <form @submit.prevent="sendForm" class="dynamic-form">
    <div class="form-section">
      <h3>Организация</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Вид организации</label>
          <select v-model="formData.organization.type_id">
            <option :value="1">Юридическое лицо</option>
            <option :value="2">Физическое лицо</option>
            <option :value="3">Индивидуальный предприниматель (ИП)</option>
            <option :value="4">Общество с ограниченной ответственностью (ООО)</option>
            <option :value="5">Акционерное общество (АО)</option>
            <option :value="6">Публичное акционерное общество (ПАО)</option>
            <option :value="7">Крестьянское фермерское хозяйство (КФХ)</option>
            <option :value="8">Сельскохозяйственный производственный кооператив (СПК)</option>
            <option :value="9">Государственное унитарное предприятие (ГУП)</option>
            <option :value="10">Муниципальное унитарное предприятие (МУП)</option>
            <option :value="11">Некоммерческая организация</option>
            <option :value="12">Простое товарищество</option>
          </select>
        </div>

        <div class="form-field">
          <label>Сокращенное наименование</label>
          <input v-model="formData.organization.short_name" type="text" />
        </div>

        <div class="form-field full-width">
          <label>Полное наименование</label>
          <input v-model="formData.organization.full_name" type="text" />
        </div>

        <div class="form-field">
          <label>ИНН</label>
          <input v-model="formData.organization.inn" type="text" />
        </div>

        <div class="form-field">
          <label>КПП</label>
          <input v-model="formData.organization.kpp" type="text" />
        </div>

        <div class="form-field">
          <label>ОГРН</label>
          <input v-model="formData.organization.ogrn" type="text" />
        </div>

        <div class="form-field">
          <label>Дата регистрации</label>
          <input v-model="formData.organization.registration_date" type="date" />
        </div>

        <div class="form-field full-width">
          <label>Регистрирующий орган</label>
          <input v-model="formData.organization.registration_authority" type="text" />
        </div>

        <div class="form-field full-width">
          <label>Юридический адрес</label>
          <input v-model="formData.organization.legal_address" type="text" />
        </div>

        <div class="form-field full-width">
          <label>Фактический адрес</label>
          <input v-model="formData.organization.actual_address" type="text" />
        </div>

        <div class="form-field">
          <label>Телефон</label>
          <input v-model="formData.organization.phone" type="tel" />
        </div>

        <div class="form-field">
          <label>Электронная почта</label>
          <input v-model="formData.organization.email" type="email" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Подразделения</h3>
      <div class="repeating-fields">
        <div v-for="(div, idx) in formData.divisions" :key="idx" class="repeating-row">
          <input v-model="formData.divisions[idx]" type="text" placeholder="Название подразделения" />
          <button type="button" class="remove-btn" @click="removeDivision(idx)">✕</button>
        </div>
        <button type="button" class="add-btn" @click="addDivision">+ Добавить подразделение</button>
      </div>
    </div>

    <div class="form-section">
      <h3>Банковские реквизиты</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Банк</label>
          <input v-model="formData.bank.bank" type="text" />
        </div>
        <div class="form-field">
          <label>Расчетный счет</label>
          <input v-model="formData.bank.checking_account" type="text" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Налоговая инспекция</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Код инспекции</label>
          <input v-model="formData.taxOffice.tax_office_code" type="text" />
        </div>
        <div class="form-field">
          <label>Наименование</label>
          <input v-model="formData.taxOffice.name_tax_office" type="text" />
        </div>
        <div class="form-field full-width">
          <label>Полное наименование</label>
          <input v-model="formData.taxOffice.full_name_tax_office" type="text" />
        </div>
        <div class="form-field">
          <label>ОКТМО</label>
          <input v-model="formData.taxOffice.oktmo" type="text" />
        </div>
        <div class="form-field">
          <label>ОКАТО</label>
          <input v-model="formData.taxOffice.okato" type="text" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Пенсионный фонд (ПФР)</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Регистрационный номер</label>
          <input v-model="formData.pfr.registration_number_pfr" type="text" />
        </div>
        <div class="form-field">
          <label>Код территориального органа</label>
          <input v-model="formData.pfr.territorial_code_pfr" type="text" />
        </div>
        <div class="form-field full-width">
          <label>Наименование территориального органа</label>
          <input v-model="formData.pfr.territorial_name_pfr" type="text" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Фонд социального страхования (ФСС)</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Регистрационный номер</label>
          <input v-model="formData.fss.registration_number_fss" type="text" />
        </div>
        <div class="form-field">
          <label>Код подчиненности</label>
          <input v-model="formData.fss.subordination_code" type="text" />
        </div>
        <div class="form-field full-width">
          <label>Территориальный орган</label>
          <input v-model="formData.fss.territorial_name_fss" type="text" />
        </div>
      </div>
    </div>

    <div class="form-section">
      <h3>Коды статистики</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>ОКОПФ</label>
          <input v-model="formData.statistics.okopf" type="text" />
        </div>
        <div class="form-field">
          <label>ОКФС</label>
          <input v-model="formData.statistics.okfs" type="text" />
        </div>
        <div class="form-field">
          <label>ОКВЭД</label>
          <input v-model="formData.statistics.okved" type="text" />
        </div>
        <div class="form-field">
          <label>ОКПО</label>
          <input v-model="formData.statistics.okpo" />
        </div>
        <div class="form-field full-width">
          <label>Код территориального органа Росстата</label>
          <input v-model="formData.statistics.rosstat_territorial_code" />
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="save-btn" :disabled="loading">{{ loading ? "Сохранение..." : "Сохранить" }}</button>
      <button type="button" class="reset-btn" @click="resetForm">Сбросить</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: 'OrganizationForm',
  data() {
    return {
      loading: false,
      formData: {
        organization: {
          type_id: 1,
          short_name: '',
          full_name: '',
          inn: '',
          kpp: '',
          ogrn: '',
          registration_date: '',
          registration_authority: '',
          legal_address: '',
          actual_address: '',
          phone: '',
          email: '',
        },
        divisions: [''],
        bank: {
          bank: '',
          checking_account: ''
        },
        taxOffice: {
          tax_office_code: '',
          name_tax_office: '',
          full_name_tax_office: '',
          oktmo: '',
          okato: ''
        },
        pfr: {
          registration_number_pfr: '',
          territorial_code_pfr: '',
          territorial_name_pfr: ''
        },
        fss: {
          registration_number_fss: '',
          subordination_code: '',
          territorial_name_fss: ''
        },
        statistics: {
          okopf: '',
          okfs: '',
          okved: '',
          okpo: '',
          rosstat_territorial_code: ''
        }
      }
    }
  },
  computed: {
    ...mapState('organization', ['organizationData', 'divisions']),
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    ...mapActions({
      fetchOrganizationData: "organization/fetchOrganizationData",
      fetchDivisions: "organization/fetchDivisions",
      saveOrganizationData: "organization/saveOrganizationData",
    }),
    async loadData() {
      this.loading = true;
      
      const orgData = await this.fetchOrganizationData();
      if (orgData) {
        this.formData.organization = {
          type_id: orgData.type_id || 1,
          short_name: orgData.short_name || '',
          full_name: orgData.full_name || '',
          inn: orgData.inn || '',
          kpp: orgData.kpp || '',
          ogrn: orgData.ogrn || '',
          registration_date: orgData.registration_date || '',
          registration_authority: orgData.registration_authority || '',
          legal_address: orgData.legal_address || '',
          actual_address: orgData.actual_address || '',
          phone: orgData.phone || '',
          email: orgData.email || '',
        };
        
        this.formData.bank = {
          bank: orgData.bank || '',
          checking_account: orgData.checking_account || ''
        };
        
        this.formData.taxOffice = {
          tax_office_code: orgData.tax_office_code || '',
          name_tax_office: orgData.name_tax_office || '',
          full_name_tax_office: orgData.full_name_tax_office || '',
          oktmo: orgData.oktmo || '',
          okato: orgData.okato || ''
        };
        
        this.formData.pfr = {
          registration_number_pfr: orgData.registration_number_pfr || '',
          territorial_code_pfr: orgData.territorial_code_pfr || '',
          territorial_name_pfr: orgData.territorial_name_pfr || ''
        };

        this.formData.fss = {
          registration_number_fss: orgData.registration_number_fss || '',
          subordination_code: orgData.subordination_code || '',
          territorial_name_fss: orgData.territorial_name_fss || ''
        };
        
        this.formData.statistics = {
          okopf: orgData.okopf || '',
          okfs: orgData.okfs || '',
          okved: orgData.okved || '',
          okpo: orgData.okpo || '',
          rosstat_territorial_code: orgData.rosstat_territorial_code || ''
        };
      }
      
      const divisionsData = await this.fetchDivisions();
      if (divisionsData && divisionsData.length > 0) {
        this.formData.divisions = divisionsData.map(d => d.name);
      } else {
        this.formData.divisions = [''];
      }
      
      this.loading = false;
    },
    addDivision() {
      this.formData.divisions.push('')
    },
    removeDivision(index) {
      this.formData.divisions.splice(index, 1)
       if (this.formData.divisions.length === 0) {
        this.formData.divisions = ['']
      }
    },
    prepareDataForBackend() {
      return {
        organization: {
          ...this.formData.organization,
          bank: this.formData.bank.bank,
          checking_account: this.formData.bank.checking_account,
          tax_office_code: this.formData.taxOffice.tax_office_code,
          name_tax_office: this.formData.taxOffice.name_tax_office,
          full_name_tax_office: this.formData.taxOffice.full_name_tax_office,
          oktmo: this.formData.taxOffice.oktmo,
          okato: this.formData.taxOffice.okato,
          registration_number_pfr: this.formData.pfr.registration_number_pfr,
          territorial_code_pfr: this.formData.pfr.territorial_code_pfr,
          territorial_name_pfr: this.formData.pfr.territorial_name_pfr,
          registration_number_fss: this.formData.fss.registration_number_fss,
          subordination_code: this.formData.fss.subordination_code,
          territorial_name_fss: this.formData.fss.territorial_name_fss,
          okopf: this.formData.statistics.okopf,
          okfs: this.formData.statistics.okfs,
          okved: this.formData.statistics.okved,
          okpo: this.formData.statistics.okpo,
          rosstat_territorial_code: this.formData.statistics.rosstat_territorial_code,
        },
        divisions: this.formData.divisions.filter(d => d && d.trim())
      };
    },
    
    async sendForm() {
      this.loading = true;
      const dataToSend = this.prepareDataForBackend();
      const success = await this.saveOrganizationData(dataToSend);
      this.loading = false;
      
      if (success) {
        await this.loadData(); 
      }
    },
    resetForm() {
      if (confirm('Вы уверены, что хотите сбросить все изменения?')) {
        this.loadData(); // Просто перезагружаем данные из БД
      }
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

.repeating-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.repeating-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.repeating-row input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.repeating-card {
  background: rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(156, 39, 176, 0.15);
}

.remove-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: rgba(244, 67, 54, 0.3);
  transform: scale(1.02);
}

.remove-btn-card {
  padding: 8px 20px;
  border-radius: 8px;
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.remove-btn-card:hover {
  background: rgba(244, 67, 54, 0.3);
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
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: rgba(156, 39, 176, 0.25);
  transform: translateY(-1px);
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
    gap: 16px;
  }
  
  .form-field {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .form-field.full-width {
    grid-column: span 1;
  }
  
  .repeating-row {
    flex-direction: column;
  }
  
  .repeating-row input {
    width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .save-btn,
  .reset-btn {
    width: 100%;
  }
  
  .card-actions {
    justify-content: stretch;
  }
  
  .remove-btn-card {
    width: 100%;
    text-align: center;
  }
}
</style>