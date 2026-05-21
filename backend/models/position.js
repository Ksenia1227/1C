const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Position = sequelize.define('position', {
    position_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'position',
    timestamps: true
});

async function get_position_table() {
    await Position.sync();
    console.log('Positions table synced');
}

module.exports = { Position, get_position_table };