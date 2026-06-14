const { user } = require('../models/user')
const { Building } = require('../models/building')
const { FixedAsset } = require('../models/asset')
const { BalanceCardGood } = require('../models/balance_card_good')

//  Building 
exports.getBuilding = async (req, res) => {
    try {
        const building = await Building.findAll({ where: { uid: req.userUid } });
        return res.json(building);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addBuilding = async (req, res) => {
    try {
        const building = await Building.create({
            name: req.body.name,
            purpose: req.body.purpose,
            area: req.body.area,
            cost: req.body.cost,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Building added successfully', building: building  });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateBuilding = async (req, res) => {
    try {
        const building = await Building.findOne({ where: { building_id: req.body.building_id, uid: req.userUid } });
        if (!building) return res.status(404).json({ message: 'Building not found' });
        await building.update({
            name: req.body.name,
            purpose: req.body.purpose,
            area: req.body.area,
            cost: req.body.cost
        });
        return res.json({ message: 'Building updated successfully', building: building });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//  FixedAsset 
exports.getFixedAsset = async (req, res) => {
    try {
        const fixedAsset = await FixedAsset.findAll({ where: { uid: req.userUid } });
        return res.json(fixedAsset);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addFixedAsset = async (req, res) => {
    try {
        const fixedAsset = await FixedAsset.create({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            building_id: req.body.building_id,
            model: req.body.model,
            manufacture_year: req.body.manufacture_year,
            passport_number: req.body.passport_number,
            power: req.body.power,
            engine_number: req.body.engine_number,
            serial_number: req.body.serial_number,
            service_life: req.body.service_life,
            initial_cost: req.body.initial_cost,
            purchase_date: req.body.purchase_date,
            commissioning_date: req.body.commissioning_date,
            decommissioning_date: req.body.decommissioning_date,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Fixed asset added successfully', fixedAsset: fixedAsset });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateFixedAsset = async (req, res) => {
    try {
        const fixedAsset = await FixedAsset.findOne({ where: { fixed_asset_id: req.body.fixed_asset_id, uid: req.userUid } });
        if (!fixedAsset) return res.status(404).json({ message: 'Fixed asset not found' });
        await fixedAsset.update({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            building_id: req.body.building_id,
            model: req.body.model,
            manufacture_year: req.body.manufacture_year,
            passport_number: req.body.passport_number,
            power: req.body.power,
            engine_number: req.body.engine_number,
            serial_number: req.body.serial_number,
            service_life: req.body.service_life,
            initial_cost: req.body.initial_cost,
            purchase_date: req.body.purchase_date,
            commissioning_date: req.body.commissioning_date,
            decommissioning_date: req.body.decommissioning_date
        });
        return res.json({ message: 'Fixed asset updated successfully', fixedAsset: fixedAsset });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Balance Card Good
exports.getBalanceCardGood = async (req, res) => {
    try {
        const balance = await BalanceCardGood.findAll({ where: { uid: req.userUid } });
        return res.json(balance);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addBalanceCardGood = async (req, res) => {
    try {
        const balance = await BalanceCardGood.create({
            nomenclature_id: req.body.nomenclature_id,
            account_id: req.body.account_id,
            building_id: req.body.building_id,
            quantity: req.body.quantity,
            unit_id: req.body.unit_id,
            code: req.body.code,
            counterparty_id: req.body.counterparty_id,
            cost: req.body.cost,
            department_id: req.body.department_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Balance card good added successfully', balanceCardGood: balance });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateBalanceCardGood = async (req, res) => {
    try {
        const balance = await BalanceCardGood.findOne({ where: { balance_id: req.body.balance_id, uid: req.userUid } });
        if (!balance) return res.status(404).json({ message: 'Balance card good not found' });
        await balance.update({
            nomenclature_id: req.body.nomenclature_id,
            account_id: req.body.account_id,
            building_id: req.body.building_id,
            quantity: req.body.quantity,
            unit_id: req.body.unit_id,
            code: req.body.code,
            counterparty_id: req.body.counterparty_id,
            cost: req.body.cost,
            department_id: req.body.department_id
        });
        return res.json({ message: 'Balance card good updated successfully', balanceCardGood: balance });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};