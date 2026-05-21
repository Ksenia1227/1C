const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const NomenclatureType = sequelize.define('nomenclature_type', {
    type_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,  
        allowNull: false
    }
}, {
    tableName: 'nomenclature_type',
    timestamps: true
});
async function get_nomenclature_type_table() {
    await NomenclatureType.sync()
    console.log('nomenclature_type table synced');
}
module.exports = { NomenclatureType, get_nomenclature_type_table };