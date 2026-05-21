// models/fertilizer_write_off.js
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const FertilizerWriteOff = sequelize.define('fertilizer_write_off', {
    fertilizer_write_off_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    waybill_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'waybill', key: 'waybill_id' }
    },
    building_id: {   
        type: DataTypes.BIGINT,
        references: { model: 'building', key: 'building_id' }
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
    tableName: 'fertilizer_write_off',
    timestamps: true
});

async function get_fertilizer_write_off_table() {
    await FertilizerWriteOff.sync();
    console.log('Fertilizer Write Off table synced');
}

module.exports = { FertilizerWriteOff, get_fertilizer_write_off_table };