const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const EntityType = sequelize.define('entity_type', {
    entity_type_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'entity_type',
    timestamps: true
});

async function get_entity_type_table() {
    await EntityType.sync();
    console.log('Entity type table synced');
}

module.exports = { EntityType, get_entity_type_table };