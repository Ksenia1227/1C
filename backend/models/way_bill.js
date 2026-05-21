// models/waybill.js
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Waybill = sequelize.define('waybill', {
    waybill_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: DataTypes.DATEONLY,
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    employee_id: {
        type: DataTypes.BIGINT,
        references: { model: 'employee', key: 'employee_id' }
    },
    fixed_asset_id: { 
        type: DataTypes.BIGINT,
        references: { model: 'fixed_asset', key: 'fixed_asset_id' }
    },
    work_type_id: {   
        type: DataTypes.BIGINT,
        references: { model: 'work_type', key: 'work_type_id' }
    },
    trailer: DataTypes.TEXT,
    structure_acreage_id: {  
        type: DataTypes.BIGINT,
        references: { model: 'structure_acreages', key: 'structure_acreage_id' }
    },
    unit_id: {         
        type: DataTypes.BIGINT,
        references: { model: 'unit', key: 'unit_id' }
    },
    produced_quantity: DataTypes.DECIMAL(10,2),
    cost_account_id: {   
        type: DataTypes.BIGINT,
        references: { model: 'account', key: 'account_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'waybill',
    timestamps: true
});

async function get_waybill_table() {
    await Waybill.sync();
    console.log('Waybill table synced');
}

module.exports = { Waybill, get_waybill_table };