const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const AnimalTransfer = sequelize.define('animal_transfer', {
    animal_transfer_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    from_building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    from_nomenclature_id: { type: DataTypes.BIGINT, references: { model: 'animal_group', key: 'animal_group_id' } },
    movement_id: { type: DataTypes.BIGINT, references: { model: 'movement', key: 'movement_id' } },
    to_building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    department_id: { type: DataTypes.BIGINT, references: { model: 'division', key: 'division_id' } },
    animal_id: { type: DataTypes.BIGINT, references: { model: 'animal', key: 'animal_id' } },
    to_nomenclature_id: { type: DataTypes.BIGINT, references: { model: 'animal_group', key: 'animal_group_id' } },
    head_count: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.INTEGER, allowNull: false },
    uid: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'uid' } }
}, { tableName: 'animal_transfer', timestamps: true });

async function get_animal_transfer_table() { await AnimalTransfer.sync(); console.log('Animal transfer table synced'); }
module.exports = { AnimalTransfer, get_animal_transfer_table };