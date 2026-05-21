const { AnimalGroup } = require('../models/animal_group');
const { Animal } = require('../models/animal');
const { BalanceCardAnimal } = require('../models/balance_card_animal');

// AnimalGroup 
exports.getAnimalGroup = async (req, res) => {
    try {
        const groups = await AnimalGroup.findAll({ where: { uid: req.userUid } });
        return res.json(groups);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addAnimalGroup = async (req, res) => {
    try {
        const groups = await AnimalGroup.create({
            name: req.body.name,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Animal group added successfully', animalGroup: groups });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateAnimalGroup = async (req, res) => {
    try {
        const groups = await AnimalGroup.findOne({ where: { animal_group_id: req.body.animal_group_id, uid: req.userUid } });
        if (!groups) return res.status(404).json({ message: 'Animal group not found' });
        await groups.update({ name: req.body.name });
        return res.json({ message: 'Animal group updated successfully', animalGroup: groups });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//  Animal 
exports.getAnimal = async (req, res) => {
    try {
        const animals = await Animal.findAll({ where: { uid: req.userUid } });
        return res.json(animals);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addAnimal = async (req, res) => {
    try {
        const animal = await Animal.create({
            inventory_number: req.body.inventory_number,
            gender: req.body.gender,
            birth_date: req.body.birth_date,
            breed: req.body.breed,
            group_id: req.body.group_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Animal added successfully', animal: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.findOne({ where: { animal_id: req.body.animal_id, uid: req.userUid } });
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        await animal.update({
            inventory_number: req.body.inventory_number,
            gender: req.body.gender,
            birth_date: req.body.birth_date,
            breed: req.body.breed,
            group_id: req.body.group_id
        });
        return res.json({ message: 'Animal updated successfully', animal: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//  BalanceCardAnimal 
exports.getBalanceCardAnimal = async (req, res) => {
    try {
        const balance = await BalanceCardAnimal.findAll({ where: { uid: req.userUid } });
        return res.json(balance);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addBalanceCardAnimal = async (req, res) => {
    try {
        const balance = await BalanceCardAnimal.create({
            account_id: req.body.account_id,
            inventory_number: req.body.inventory_number,
            department_id: req.body.department_id,
            building_id: req.body.building_id,
            weight: req.body.weight,
            amount: req.body.amount,
            number_heads: req.body.number_heads,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Balance card animal added successfully', balanceCardAnimal: balance });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateBalanceCardAnimal = async (req, res) => {
    try {
        const balance = await BalanceCardAnimal.findOne({ where: { balance_id: req.body.balance_id, uid: req.userUid } });
        if (!balance) return res.status(404).json({ message: 'Balance card animal not found' });
        await balance.update({
            account_id: req.body.account_id,
            inventory_number: req.body.inventory_number,
            department_id: req.body.department_id,
            building_id: req.body.building_id,
            weight: req.body.weight,
            amount: req.body.amount,
            number_heads: req.body.number_heads
        });
        return res.json({ message: 'Balance card animal updated successfully', balanceCardAnimal: balance });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};