// models/fixed_asset.js
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const FixedAsset = sequelize.define('fixed_asset', {
    fixed_asset_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    manufacturer: DataTypes.TEXT,
    building_id: {
        type: DataTypes.BIGINT,
        references: { model: 'building', key: 'building_id' }
    },
    model: DataTypes.TEXT,
    manufacture_year: DataTypes.INTEGER,
    passport_number: DataTypes.TEXT,
    power: DataTypes.INTEGER,
    engine_number: DataTypes.TEXT,
    serial_number: DataTypes.TEXT,
    service_life: DataTypes.INTEGER, 
    initial_cost: DataTypes.DECIMAL(15, 2),
    purchase_date: DataTypes.DATEONLY,
    commissioning_date: DataTypes.DATEONLY,
    decommissioning_date: DataTypes.DATEONLY,
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'fixed_asset',
    timestamps: true
});

async function get_fixed_asset_table() {
    await FixedAsset.sync();
    console.log('Fixed asset table synced');
}

module.exports = { FixedAsset, get_fixed_asset_table };