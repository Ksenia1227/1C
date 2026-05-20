// models/building.js
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Building = sequelize.define('building', {
    building_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    purpose: DataTypes.TEXT,
    area: DataTypes.DECIMAL(10, 2),
    cost: DataTypes.DECIMAL(15, 2),
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'building',
    timestamps: true
});

async function get_building_table() {
    await Building.sync();
    console.log('Building table synced');
}

module.exports = { Building, get_building_table };