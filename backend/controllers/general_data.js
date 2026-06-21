const { user } = require('../models/user')
const { Organization } = require('../models/organization')
const { Division } = require('../models/division');
const { Counterparty } = require('../models/counterparty');
const { Employee } = require('../models/employee');
const { ContractCounterparty  } = require('../models/contract_counterparty');
const { ContractEmployee } = require('../models/contract_employee');
const { EntityType} = require('../models/entity_type');
const { Account } = require('../models/account');
const { Position } = require('../models/position');
const { NomenclatureType } = require('../models/nomenclature_type');
const { Nomenclature } = require('../models/nomenclature');
const { Unit } = require('../models/unit');
const { ProductSale } = require('../models/product_sale');
const { GoodsReceipt } = require('../models/goods_receipt');
const { Movement } = require('../models/movement');
const { WorkType } = require('../models/work_type');


//  Organization
exports.getOrganization = async (req, res) => {
    try {
        const orgs = await Organization.findAll({ where: { uid: req.userUid } });
        return res.json(orgs);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addOrganization = async (req, res) => {
    try {
        const newOrg = await Organization.create({
            type_id: req.body.type_id,
            short_name: req.body.short_name,
            full_name: req.body.full_name,
            inn: req.body.inn,
            kpp: req.body.kpp,
            ogrn: req.body.ogrn,
            registration_date: req.body.registration_date,
            registration_authority: req.body.registration_authority,
            legal_address: req.body.legal_address,
            actual_address: req.body.actual_address,
            phone: req.body.phone,
            email: req.body.email,
            bank: req.body.bank,
            checking_account: req.body.checking_account,
            tax_office_code: req.body.tax_office_code,
            name_tax_office: req.body.name_tax_office,
            full_name_tax_office: req.body.full_name_tax_office,
            oktmo: req.body.oktmo,
            okato: req.body.okato,
            registration_number_pfr: req.body.registration_number_pfr,
            territorial_code_pfr: req.body.territorial_code_pfr,
            territorial_name_pfr: req.body.territorial_name_pfr,
            registration_number_fss: req.body.registration_number_fss,
            subordination_code: req.body.subordination_code,
            territorial_name_fss: req.body.territorial_name_fss,
            okopf: req.body.okopf,
            okfs: req.body.okfs,
            okved: req.body.okved,
            okpo: req.body.okpo,
            rosstat_territorial_code: req.body.rosstat_territorial_code,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Organization added successfully', organization: newOrg });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateOrganization = async (req, res) => {
    try {
        const org = await Organization.findOne({ where: { organization_id: req.body.organization_id, uid: req.userUid } });
        if (!org) return res.status(404).json({ message: 'Организация не найдена' });
        await org.update({
            type_id: req.body.type_id,
            short_name: req.body.short_name,
            full_name: req.body.full_name,
            inn: req.body.inn,
            kpp: req.body.kpp,
            ogrn: req.body.ogrn,
            registration_date: req.body.registration_date,
            registration_authority: req.body.registration_authority,
            legal_address: req.body.legal_address,
            actual_address: req.body.actual_address,
            phone: req.body.phone,
            email: req.body.email,
            bank: req.body.bank,
            checking_account: req.body.checking_account,
            tax_office_code: req.body.tax_office_code,
            name_tax_office: req.body.name_tax_office,
            full_name_tax_office: req.body.full_name_tax_office,
            oktmo: req.body.oktmo,
            okato: req.body.okato,
            registration_number_pfr: req.body.registration_number_pfr,
            territorial_code_pfr: req.body.territorial_code_pfr,
            territorial_name_pfr: req.body.territorial_name_pfr,
            registration_number_fss: req.body.registration_number_fss,
            subordination_code: req.body.subordination_code,
            territorial_name_fss: req.body.territorial_name_fss,
            okopf: req.body.okopf,
            okfs: req.body.okfs,
            okved: req.body.okved,
            okpo: req.body.okpo,
            rosstat_territorial_code: req.body.rosstat_territorial_code,
        });
        return res.json({ message: 'Organization updated successfully', organization: org });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//  Division 
exports.getDivision = async (req, res) => {
    try {
        const divisions = await Division.findAll({ where: { uid: req.userUid } });
        return res.json(divisions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addDivision = async (req, res) => {
    try {
        const newDivision = await Division.create({
            name: req.body.name,
            organization_id: req.body.organization_id,   
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Division added successfully', division: newDivision });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateDivision = async (req, res) => {
    try {
        const division = await Division.findOne({ where: { division_id: req.body.division_id, uid: req.userUid } });
        if (!division) return res.status(404).json({ message: 'Подразделение не найдено' });
        await division.update({ name: req.body.name });
        return res.json({ message: 'Division updated successfully', division });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Counterparty 
exports.getCounterparty = async (req, res) => {
    try {
        const counterparties = await Counterparty.findAll({ where: { uid: req.userUid } });
        return res.json(counterparties);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addCounterparty = async (req, res) => {
    try {
        const newCp = await Counterparty.create({
            comment: req.body.comment,
            counterparty_type_id: req.body.counterparty_type_id,
            name_for_doc: req.body.name_for_doc,
            name_program: req.body.name_program,
            country_registration: req.body.country_registration,
            inn: req.body.inn,
            kpp: req.body.kpp,
            ogrn: req.body.ogrn,
            bank: req.body.bank,
            checking_account: req.body.checking_account,
            legal_address: req.body.legal_address,
            actual_address: req.body.actual_address,
            phone: req.body.phone,
            email: req.body.email,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Counterparty added successfully', counterparty: newCp });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateCounterparty= async (req, res) => {
    try {
        const counterparty = await Counterparty.findOne({ where: { counterparty_id: req.body.counterparty_id, uid: req.userUid } });
        if (!counterparty) return res.status(404).json({ message: 'Контрагент не найден' });
        await counterparty.update({ 
            comment: req.body.comment,
            counterparty_type_id: req.body.counterparty_type_id,
            name_for_doc: req.body.name_for_doc,
            name_program: req.body.name_program,
            country_registration: req.body.country_registration,
            inn: req.body.inn,
            kpp: req.body.kpp,
            ogrn: req.body.ogrn,
            bank: req.body.bank,
            checking_account: req.body.checking_account,
            legal_address: req.body.legal_address,
            actual_address: req.body.actual_address,
            phone: req.body.phone,
            email: req.body.email,
            uid: req.userUid });
        return res.json({ message: 'Counterparty updated successfully', counterparty });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Employee 
exports.getEmployee = async (req, res) => {
    try {
        const employees = await Employee.findAll({ where: { uid: req.userUid } });
        return res.json(employees);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create({
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth,
            inn: req.body.inn,
            snils: req.body.snils,
            citizenship: req.body.citizenship,
            passport: req.body.passport,
            issued_by: req.body.issued_by,
            date_issue: req.body.date_issue,
            residence_address: req.body.residence_address,
            last_name: req.body.last_name,           // было исправлено
            name: req.body.name,
            middle_name: req.body.middle_name,
            phone: req.body.phone,
            email: req.body.email,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateEmployee= async (req, res) => {
    try {
        const employee = await Employee.findOne({ where: { employee_id: req.body.employee_id, uid: req.userUid } });
        if (!employee) return res.status(404).json({ message: 'Сотрудник не найден' });
        await employee.update({ 
           gender: req.body.gender,
            date_of_birth: req.body.date_of_birth,
            inn: req.body.inn,
            snils: req.body.snils,
            citizenship: req.body.citizenship,
            passport: req.body.passport,
            issued_by: req.body.issued_by,
            date_issue: req.body.date_issue,
            residence_address: req.body.residence_address,
            last_name: req.body.last_name,           
            name: req.body.name,
            middle_name: req.body.middle_name,
            phone: req.body.phone,
            email: req.body.email,
            uid: req.userUid  });
        return res.json({ message: 'employee updated successfully', employee });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
//  ContractCounterparty 
exports.getContractCounterparty = async (req, res) => {
    try {
        const contracts = await ContractCounterparty.findAll({ where: { uid: req.userUid } });
        return res.json(contracts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addContractCounterparty = async (req, res) => {
    try {
        const newContract = await ContractCounterparty.create({
            contract_type_id: req.body.contract_type_id,
            name: req.body.name,
            date: req.body.date,
            validity_period: req.body.validity_period,
            counterparty_id: req.body.counterparty_id,
            uid: req.userUid     
        });
        return res.status(201).json({ message: 'Contract counterparty added successfully', contract: newContract });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateContractCounterparty= async (req, res) => {
    try {
        const c_counterparty = await ContractCounterparty.findOne({ where: {contract_id: req.body.contract_id, uid: req.userUid } });
        if (!c_counterparty) return res.status(404).json({ message: 'Договор не найден' });
        await c_counterparty.update({ 
           contract_type_id: req.body.contract_type_id,
            name: req.body.name,
            date: req.body.date,
            validity_period: req.body.validity_period,
            counterparty_id: req.body.counterparty_id,
            uid: req.userUid    });
        return res.json({ message: 'Contract Counterparty updated successfully', c_counterparty });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// Contract Employee 
exports.getContractEmployee = async (req, res) => {
    try {
        const contracts = await ContractEmployee.findAll({ where: { uid: req.userUid } });
        return res.json(contracts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addContractEmployee = async (req, res) => {
    try {
        const newContract = await ContractEmployee.create({
            code: req.body.code,
            hire_date: req.body.hire_date,
            department_id: req.body.department_id,
            position_id: req.body.position_id,
            salary: req.body.salary,
            rate: req.body.rate,
            employment_type: req.body.employment_type,
            document_type: req.body.document_type,
            employee_id: req.body.employee_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Contract employee added successfully', contract: newContract });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateContractEmployee = async (req, res) => {
    try {
        const c_employee = await ContractEmployee.findOne({ where: {contract_id: req.body.contract_id, uid: req.userUid } });
        if (!c_employee) return res.status(404).json({ message: 'Договор не найден' });
        await c_employee.update({ 
           code: req.body.code,
            hire_date: req.body.hire_date,
            department_id: req.body.department_id,
            position_id: req.body.position_id,
            salary: req.body.salary,
            rate: req.body.rate,
            employment_type: req.body.employment_type,
            document_type: req.body.document_type,
            employee_id: req.body.employee_id,
            uid: req.userUid
           });
        return res.json({ message: 'Contract Employee updated successfully', c_employee });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//  Nomenclature 
exports.getNomenclature = async (req, res) => {
    try {
        const nomenclature = await Nomenclature.findAll({ where: { uid: req.userUid } });
        return res.json(nomenclature);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addNomenclature = async (req, res) => {
    try {
        const nomenclature = await Nomenclature.create({
            item_type:req.body.item_type,
            name: req.body.name,
            full_name: req.body.full_name,
            unit_id:req.body.unit_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Nomenclature added successfully', nomenclature: nomenclature });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateNomenclature = async (req, res) => {
    try {
        const nomenclature = await Nomenclature.findOne({ where: {nomenclature_id: req.body.nomenclature_id, uid: req.userUid } });
        if (!nomenclature) return res.status(404).json({ message: 'Номенклатура не найдена' });
        await nomenclature.update({ 
           item_type:req.body.item_type,
            name: req.body.name,
            full_name: req.body.full_name,
            unit_id:req.body.unit_id,
            uid: req.userUid
           });
        return res.json({ message: 'Nomeclature updated successfully', nomenclature });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Локальные Справочники  
exports.getEntity_type = async (req, res) => {
    try {
        const entity_type = await EntityType.findAll();
        return res.json(entity_type);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getUnit = async (req, res) => {
    try {
        const unit = await Unit.findAll();
        return res.json(unit);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findAll();
        return res.json(account);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getNomenclature_type = async (req, res) => {
    try {
        const nomenclature_type = await NomenclatureType.findAll();
        return res.json(nomenclature_type);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getPosition = async (req, res) => {
    try {
        const position = await Position.findAll();
        return res.json(position);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getMovement = async (req, res) => {
    try {
        const movement = await Movement.findAll();
        return res.json(movement);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getWork_type = async (req, res) => {
    try {
        const work_type = await WorkType.findAll();
        return res.json(work_type);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//  Product sale 
exports.getProductSale = async (req, res) => {
    try {
        const product = await ProductSale.findAll({ where: { uid: req.userUid } });
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addProductSale = async (req, res) => {
    try {
        const product = await ProductSale.create({
            date:req.body.date,
            number: req.body.number,
            counterparty_id: req.body.counterparty_id,
            building_id:req.body.building_id,
            nomenclature_id:req.body.nomenclature_id,
            quantity:req.body.quantity,
            unit_id:req.body.unit_id,
            price:req.body.price,
            status: req.body.status,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Product sale added successfully', ProductSale: product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateProductSale = async (req, res) => {
    try {
        const product = await ProductSale.findOne({ where: {product_sale_id: req.body.product_sale_id, uid: req.userUid } });
        if (!product) return res.status(404).json({ message: 'Product sale not found' });
        await product.update({ 
           date:req.body.date,
            number: req.body.number,
            counterparty_id: req.body.counterparty_id,
            building_id:req.body.building_id,
            nomenclature_id:req.body.nomenclature_id,
            quantity:req.body.quantity,
            unit_id:req.body.unit_id,
            price:req.body.price,
            status: req.body.status,
            uid: req.userUid
           });
        return res.json({ message: 'Product sale updated successfully', ProductSale: product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Goods receipt
exports.getGoodsReceipt = async (req, res) => {
    try {
        const goods = await GoodsReceipt.findAll({ where: { uid: req.userUid } });
        return res.json(goods);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addGoodsReceipt = async (req, res) => {
    try {
        const goods = await GoodsReceipt.create({
            date:req.body.date,
            counterparty_id: req.body.counterparty_id,
            building_id: req.body.building_id,
            movement_id:req.body.movement_id,
            nomenclature_id:req.body.nomenclature_id,
            quantity:req.body.quantity,
            account_id:req.body.account_id,
            price:req.body.price,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Goods receipt added successfully', GoodsReceipt: goods });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateGoodsReceipt = async (req, res) => {
    try {
        const goods = await GoodsReceipt.findOne({ where: {goods_receipt_id: req.body.goods_receipt_id, uid: req.userUid } });
        if (!goods) return res.status(404).json({ message: 'Goods receipt not found' });
        await goods.update({ 
           date:req.body.date,
            counterparty_id: req.body.counterparty_id,
            building_id: req.body.building_id,
            movement_id:req.body.movement_id,
            nomenclature_id:req.body.nomenclature_id,
            quantity:req.body.quantity,
            account_id:req.body.account_id,
            price:req.body.price,
            uid: req.userUid
           });
        return res.json({ message: 'Goods receipt updated successfully', GoodsReceipt: goods });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};