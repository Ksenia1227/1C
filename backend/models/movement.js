
const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Movement = sequelize.define('movement', {
    movement_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'movement',
    timestamps: true
});
async function get_movement_table() {
    await Movement.sync()
    console.log('Movement table synced');
}
module.exports = {Movement, get_movement_table };