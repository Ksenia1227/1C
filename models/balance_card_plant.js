// models/balance_card_plant.js
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const BalanceCardPlant = sequelize.define('balance_card_plant', {
    balance_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nomenclature_id: {
        type: DataTypes.BIGINT,
        references: { model: 'nomenclature', key: 'nomenclature_id' }
    },
    account_id: {
        type: DataTypes.BIGINT,
        references: { model: 'account', key: 'account_id' }
    },
    building_id: {
        type: DataTypes.BIGINT,
        references: { model: 'building', key: 'building_id' }
    },
    batch: DataTypes.TEXT,
    quantity: DataTypes.DECIMAL(12, 2),
    unit_id: {
        type: DataTypes.BIGINT,
        references: { model: 'unit', key: 'unit_id' }
    },
    code: DataTypes.TEXT,
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'balance_card_plant',
    timestamps: true
});

async function get_balance_card_plant_table() {
    await BalanceCardPlant.sync();
    console.log('Balance card plant table synced');
}

module.exports = { BalanceCardPlant, get_balance_card_plant_table };