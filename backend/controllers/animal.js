const { AnimalGroup } = require('../models/animal_group');
const { Animal } = require('../models/animal');
const { BalanceCardAnimal } = require('../models/balance_card_animal');
const { RegistrationAnimal } = require('../models/registration_animal');
const { OffSpring } = require('../models/off_spring');
const { WeightGain } = require('../models/weight_gain');
const { AnimalTransfer } = require('../models/animal_transfer');
const { Milking } = require('../models/milking');

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

// Registration of animals
exports.getRegistratedAnimals = async (req, res) => {
    try {
        const animal = await RegistrationAnimal.findAll({ where: { uid: req.userUid } });
        return res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addRegistratedAnimals = async (req, res) => {
    try {
        const animal = await RegistrationAnimal.create({
            date: req.body.date,
            department_id: req.body.department_id,
            movement_id: req.body.movement_id,
            nomenclature_type_id: req.body.nomenclature_type_id,
            animal_id: req.body.animal_id,
            number: req.body.number,
            weight: req.body.weight,
            price:req.body.price,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Registration of animal added successfully', RegistratedAnimal: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateRegistratedAnimals = async (req, res) => {
    try {
        const animal = await RegistrationAnimal.findOne({ where: { registration_animal_id: req.body.registration_animal_id, uid: req.userUid } });
        if (!animal) return res.status(404).json({ message: 'Registrated animal not found' });
        await animal.update({
            date: req.body.date,
            department_id: req.body.department_id,
            movement_id: req.body.movement_id,
            nomenclature_type_id: req.body.nomenclature_type_id,
            animal_id: req.body.animal_id,
            number: req.body.number,
            weight: req.body.weight,
            price:req.body.price,
            uid: req.userUid
        });
        return res.json({ message: 'Registration of animal updated successfully', RegistratedAnimal: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Off spring animals
exports.getOffSpring = async (req, res) => {
    try {
        const animal = await OffSpring.findAll({ where: { uid: req.userUid } });
        return res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addOffSpring = async (req, res) => {
    try {
        const animal = await OffSpring.create({
            date: req.body.date,
            cost_account_id: req.body.cost_account_id,
            movement_id: req.body.movement_id,
            building_id: req.body.building_id,
            department_id: req.body.department_id,
            nomenclature_id: req.body.nomenclature_id,
            mother_animal_id: req.body.mother_animal_id,
            animal_id:req.body.animal_id,
            head_count: req.body.head_count,
            weight: req.body.weight,
            account_id: req.body.account_id,
            gender: req.body.gender,
            employee_id: req.body.employee_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Off spring animal added successfully', OffSpring: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateOffSpring = async (req, res) => {
    try {
        const animal = await OffSpring.findOne({ where: { offspring_id: req.body.offspring_id, uid: req.userUid } });
        if (!animal) return res.status(404).json({ message: 'Off spring animal not found' });
        await animal.update({
            date: req.body.date,
            cost_account_id: req.body.cost_account_id,
            movement_id: req.body.movement_id,
            building_id: req.body.building_id,
            department_id: req.body.department_id,
            nomenclature_id: req.body.nomenclature_id,
            mother_animal_id: req.body.mother_animal_id,
            animal_id:req.body.animal_id,
            head_count: req.body.head_count,
            weight: req.body.weight,
            account_id: req.body.account_id,
            gender: req.body.gender,
            employee_id: req.body.employee_id,
            uid: req.userUid
        });
        return res.json({ message: 'Off spring  animal updated successfully', OffSpring: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Weight gain animals
exports.getWeightGain = async (req, res) => {
    try {
        const animal = await WeightGain.findAll({ where: { uid: req.userUid } });
        return res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addWeightGain = async (req, res) => {
    try {
        const animal = await WeightGain.create({
            date: req.body.date,
            cost_account_id: req.body.cost_account_id,
            movement_id: req.body.movement_id,
            building_id: req.body.building_id,
            department_id: req.body.department_id,
            animal_id: req.body.animal_id,
            head_count: req.body.head_count,
            weight:req.body.weight,
            account_id: req.body.account_id,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Weight gain animals added successfully', WeightGain: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateWeightGain = async (req, res) => {
    try {
        const animal = await WeightGain.findOne({ where: { weight_gain_id: req.body.weight_gain_id, uid: req.userUid } });
        if (!animal) return res.status(404).json({ message: 'Weight gain animals not found' });
        await animal.update({
            date: req.body.date,
            cost_account_id: req.body.cost_account_id,
            movement_id: req.body.movement_id,
            building_id: req.body.building_id,
            department_id: req.body.department_id,
            animal_id: req.body.animal_id,
            head_count: req.body.head_count,
            weight:req.body.weight,
            account_id: req.body.account_id,
            uid: req.userUid
        });
        return res.json({ message: 'Weight gain animals updated successfully', WeightGain: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Animal transfer
exports.getAnimalTransfer = async (req, res) => {
    try {
        const animal = await AnimalTransfer.findAll({ where: { uid: req.userUid } });
        return res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addAnimalTransfer = async (req, res) => {
    try {
        const animal = await AnimalTransfer.create({
            date: req.body.date,
            from_building_id: req.body.from_building_id,
            from_nomenclature_id: req.body.from_nomenclature_id,
            movement_id: req.body.movement_id,
            to_building_id: req.body.to_building_id,
            department_id: req.body.department_id,
            animal_id: req.body.mother_animal_id,
            to_nomenclature_id:req.body.to_nomenclature_id,
            head_count: req.body.head_count,
            weight: req.body.weight,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Animal transfer added successfully', AnimalTransfer: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateAnimalTransfer = async (req, res) => {
    try {
        const animal = await AnimalTransfer.findOne({ where: { animal_transfer_id: req.body.animal_transfer_id, uid: req.userUid } });
        if (!animal) return res.status(404).json({ message: 'Animal transfer not found' });
        await animal.update({
            date: req.body.date,
            from_building_id: req.body.from_building_id,
            from_nomenclature_id: req.body.from_nomenclature_id,
            movement_id: req.body.movement_id,
            to_building_id: req.body.to_building_id,
            department_id: req.body.department_id,
            animal_id: req.body.animal_id,
            to_nomenclature_id:req.body.to_nomenclature_id,
            head_count: req.body.head_count,
            weight: req.body.weight,
            uid: req.userUid
        });
        return res.json({ message: 'Animal transfer updated successfully', AnimalTransfer: animal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Milking
exports.getMilking = async (req, res) => {
    try {
        const milking = await Milking.findAll({ where: { uid: req.userUid } });
        return res.json(animal);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addMilking = async (req, res) => {
    try {
        const milking = await Milking.create({
            date: req.body.date,
            cost_account_id: req.body.cost_account_id,
            building_id: req.body.building_id,
            milking_count: req.body.milking_count,
            product_nomenclature_id: req.body.product_nomenclature_id,
            animal_id: req.body.animal_id,
            head_count: req.body.head_count,
            milk_amount:req.body.milk_amount,
            uid: req.userUid
        });
        return res.status(201).json({ message: 'Milking added successfully', Milking: milking });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateMilking = async (req, res) => {
    try {
        const milking = await Milking.findOne({ where: { milking_id: req.body.milking_id, uid: req.userUid } });
        if (!milking) return res.status(404).json({ message: 'Milking not found' });
        await milking.update({
            date: req.body.date,
            cost_account_id: req.body.cost_account_id,
            building_id: req.body.building_id,
            milking_count: req.body.milking_count,
            product_nomenclature_id: req.body.product_nomenclature_id,
            animal_id: req.body.animal_id,
            head_count: req.body.head_count,
            milk_amount:req.body.milk_amount,
            uid: req.userUid
        });
        return res.json({ message: 'Milking updated successfully', Milking_id: milking });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};