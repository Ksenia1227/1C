// weight_gain
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const WeightGain = sequelize.define('weight_gain', {
    weight_gain_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    cost_account_id: { type: DataTypes.BIGINT, references: { model: 'account', key: 'account_id' } },
    department_id: { type: DataTypes.BIGINT, references: { model: 'division', key: 'division_id' } },
    movement_id: { type: DataTypes.BIGINT, references: { model: 'movement', key: 'movement_id' } },
    building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    animal_id: { type: DataTypes.BIGINT, references: { model: 'animal', key: 'animal_id' } },
    head_count: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.INTEGER, allowNull: false },
    account_id: { type: DataTypes.BIGINT, references: { model: 'account', key: 'account_id' } },
    uid: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'uid' } }
}, { tableName: 'weight_gain', timestamps: true });

async function get_weight_gain_table() 
{ await WeightGain.sync(); console.log('Weight gain table synced'); }
module.exports = { WeightGain, get_weight_gain_table };