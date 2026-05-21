const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Milking = sequelize.define('milking', {
    milking_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    cost_account_id: { type: DataTypes.BIGINT, references: { model: 'account', key: 'account_id' } },
    building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    milking_count: { type: DataTypes.INTEGER, allowNull: false },
    product_nomenclature_id: { type: DataTypes.BIGINT, references: { model: 'nomenclature', key: 'nomenclature_id' } },
    animal_id: { type: DataTypes.BIGINT, references: { model: 'animal', key: 'animal_id' } },
    head_count: { type: DataTypes.INTEGER, allowNull: false },
    milk_amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    uid: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'uid' } }
}, { tableName: 'milking', timestamps: true });

async function get_milking_table() { await Milking.sync(); console.log('Milking table synced'); }
module.exports = { Milking, get_milking_table };