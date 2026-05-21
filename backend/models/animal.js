const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Animal = sequelize.define('animal', {
    animal_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    inventory_number: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    gender: DataTypes.TEXT,
    birth_date: DataTypes.DATEONLY,
    breed: DataTypes.TEXT,
    group_id: {
        type: DataTypes.BIGINT,
        references: { model: 'animal_group', key: 'animal_group_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'animal',
    timestamps: true
});

async function get_animal_table() {
    await Animal.sync();
    console.log('Animal table synced');
}

module.exports = { Animal, get_animal_table };