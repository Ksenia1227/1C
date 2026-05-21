// models/fuel_write_off.js
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const FuelWriteOff = sequelize.define('fuel_write_off', {
    fuel_write_off_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    waybill_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'waybill', key: 'waybill_id' }
    },
    nomenclature_id: {   
        type: DataTypes.BIGINT,
        references: { model: 'nomenclature', key: 'nomenclature_id' }
    },
    quantity: DataTypes.DECIMAL(12,2),
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'fuel_write_off',
    timestamps: true
});

async function get_fuel_write_off_table() {
    await FuelWriteOff.sync();
    console.log('FuelWriteOff table synced');
}

module.exports = { FuelWriteOff, get_fuel_write_off_table };