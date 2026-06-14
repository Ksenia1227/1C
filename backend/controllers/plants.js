const { user } = require('../models/user')
const { Field } = require('../models/field')
const { GroupCulture } = require('../models/group_culture');
const { Crop } = require('../models/crop');
const { StructureAcreage } = require('../models/structure_acreage');
const { BalanceCardPlant } = require('../models/balance_card_plant');

// Field
exports.getField = async (req, res) => {
    try {
        const field = await Field.findAll({ where: { uid: req.userUid } });
        return res.json(field);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addField = async (req, res) => {
    try {
        const field = await Field.create({
            name: req.body.name,
            field_area:req.body.field_area,
            code: req.body.code,
            departament_id:req.body.departament_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Field added successfully', field: field });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateField = async (req, res) => {
    try {
        const field = await Field.findOne({ where: { field_id: req.body.field_id, uid: req.userUid } });
        if (!field) return res.status(404).json({ message: 'Поле не найдено' });
        await field.update({
            name: req.body.name,
            field_area:req.body.field_area,
            code: req.body.code,
            departament_id:req.body.departament_id,
            uid: req.userUid
        });
        return res.json({ message: 'Field updated successfully', field: field });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GroupCulture
exports.getGroupCulture = async (req, res) => {
    try {
        const records = await GroupCulture.findAll({ where: { uid: req.userUid } });
        return res.json(records);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addGroupCulture = async (req, res) => {
    try {
        const culture = await GroupCulture.create({
            name: req.body.name,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Group culture added successfully', groupCulture: culture });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateGroupCulture = async (req, res) => {
    try {
        const culture= await GroupCulture.findOne({ where: { group_culture_id: req.body.group_culture_id, uid: req.userUid } });
        if (!culture) return res.status(404).json({ message: 'Group culture not found' });
        await culture.update({ name: req.body.name });
        return res.json({ message: 'Group culture updated successfully', groupCulture: culture });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//  Crop 
exports.getCrop = async (req, res) => {
    try {
        const crop = await Crop.findAll({ where: { uid: req.userUid } });
        return res.json(crop);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addCrop = async (req, res) => {
    try {
        const crop = await Crop.create({
            name: req.body.name,
            group_id: req.body.group_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Crop added successfully', crop: crop });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateCrop = async (req, res) => {
    try {
        const crop = await Crop.findOne({ where: { crop_id: req.body.crop_id, uid: req.userUid } });
        if (!crop) return res.status(404).json({ message: 'Crop not found' });
        await crop.update({
            name: req.body.name,
            group_id: req.body.group_id
        });
        return res.json({ message: 'Crop updated successfully', crop: crop });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// StructureAcreage 
exports.getStructureAcreage = async (req, res) => {
    try {
        const structure = await StructureAcreage.findAll({ where: { uid: req.userUid } });
        return res.json(structure);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addStructureAcreage = async (req, res) => {
    try {
        const structure = await StructureAcreage.create({
            name: req.body.name,
            field_id: req.body.field_id,
            department_id: req.body.department_id,
            group: req.body.group,
            crop_id: req.body.crop_id,
            year: req.body.year,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Structure acreage added successfully', structureAcreage: structure });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateStructureAcreage = async (req, res) => {
    try {
        const structure = await StructureAcreage.findOne({ where: { structure_acreage_id: req.body.structure_acreage_id, uid: req.userUid } });
        if (!structure) return res.status(404).json({ message: 'Structure acreage not found' });
        await structure.update({
            name: req.body.name,
            field_id: req.body.field_id,
            department_id: req.body.department_id,
            group: req.body.group,
            crop_id: req.body.crop_id,
            year: req.body.year
        });
        return res.json({ message: 'Structure acreage updated successfully', structureAcreage: structure });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// BalanceCardPlant
exports.getBalanceCardPlant = async (req, res) => {
    try {
        const balance = await BalanceCardPlant.findAll({ where: { uid: req.userUid } });
        return res.json(balance);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addBalanceCardPlant = async (req, res) => {
    try {
        const balance = await BalanceCardPlant.create({
            nomenclature_id: req.body.nomenclature_id,
            account_id: req.body.account_id,
            building_id: req.body.building_id,
            batch: req.body.batch,
            quantity: req.body.quantity,
            unit_id: req.body.unit_id,
            code: req.body.code,
            department_id: req.body.department_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Balance card plant added successfully', balanceCardPlant: balance });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateBalanceCardPlant = async (req, res) => {
    try {
        const balance = await BalanceCardPlant.findOne({ where: { balance_id: req.body.balance_id, uid: req.userUid } });
        if (!balance) return res.status(404).json({ message: 'Balance card plant not found' });
        await balance.update({
            nomenclature_id: req.body.nomenclature_id,
            account_id: req.body.account_id,
            building_id: req.body.building_id,
            batch: req.body.batch,
            quantity: req.body.quantity,
            unit_id: req.body.unit_id,
            code: req.body.code,
            department_id: req.body.department_id
        });
        return res.json({ message: 'Balance card plant updated successfully', balanceCardPlant: balance });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};