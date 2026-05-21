const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Offspring = sequelize.define('offspring', {
    offspring_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    cost_account_id: {
        type: DataTypes.BIGINT,
        references: { model: 'account', key: 'account_id' }
    },
    movement_id: {
        type: DataTypes.BIGINT,
        references: { model: 'movement', key: 'movement_id' }
    },
    building_id: {
        type: DataTypes.BIGINT,
        references: { model: 'building', key: 'building_id' }
    },
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
   nomenclature_id: {
        type: DataTypes.BIGINT,
        references: { model: 'nomenclature', key: 'nomenclature_id' }
    },
    mother_animal_id: {
        type: DataTypes.BIGINT,
        references: { model: 'animal', key: 'animal_id' }
    },
    animal_id: {
        type: DataTypes.BIGINT,
        references: { model: 'animal', key: 'animal_id' }
    },
    head_count: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    account_id: {
        type: DataTypes.BIGINT,
        references: { model: 'account', key: 'account_id' }
    },
    gender: DataTypes.TEXT,
    employee_id: {
        type: DataTypes.BIGINT,
        references: { model: 'employee', key: 'employee_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'offspring',
    timestamps: true
});

async function get_offspring_table() {
    await Offspring.sync();
    console.log('Offspring table synced');
}

module.exports = { Offspring, get_offspring_table };