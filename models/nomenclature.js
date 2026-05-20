const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');
const { NomenclatureType } = require('./nomenclature_type');
const { Unit } = require('./unit');
const { User } = require('./user');

const Nomenclature = sequelize.define('nomenclature', {
    nomenclature_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    item_type: {
        type: DataTypes.BIGINT,
        references: {
            model: 'nomenclature_types',
            key: 'type_id'
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    full_name: DataTypes.TEXT,
    unit_id: {
        type: DataTypes.BIGINT,
        references: { model: 'unit', key: 'unit_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'nomenclature',
    timestamps: true
});

Nomenclature.belongsTo(NomenclatureType, { foreignKey: 'item_type', as: 'type' });
Nomenclature.belongsTo(Unit, { foreignKey: 'unit_id' });
// Nomenclature.belongsTo(User, { foreignKey: 'uid' });

async function get_nomenclature_table() {
    await Nomenclature.sync();
    console.log('Nomenclature table synced');
}

module.exports = { Nomenclature, get_nomenclature_table };