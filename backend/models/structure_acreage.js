const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');
const { Field } = require('./field');
const { Division } = require('./division');
const { Crop } = require('./crop');
const { User } = require('./user');

const StructureAcreage = sequelize.define('structure_acreage', {
    structure_acreage_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.TEXT,
    field_id: {
        type: DataTypes.BIGINT,
        references: { model: 'field', key: 'field_id' }
    },
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    group: DataTypes.TEXT,   
    crop_id: {
        type: DataTypes.BIGINT,
        references: { model: 'crop', key: 'crop_id' }
    },
    year: DataTypes.INTEGER,
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'structure_acreages',
    timestamps: true
});

StructureAcreage.belongsTo(Field, { foreignKey: 'field_id' });
StructureAcreage.belongsTo(Division, { foreignKey: 'department_id' });
StructureAcreage.belongsTo(Crop, { foreignKey: 'crop_id' });
// StructureAcreage.belongsTo(User, { foreignKey: 'uid' });

async function get_structure_acreage_table() {
    await StructureAcreage.sync();
    console.log('Structure acreage table synced');
}

module.exports = { StructureAcreage, get_structure_acreage_table };