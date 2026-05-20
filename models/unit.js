const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Unit = sequelize.define('unit', {
    unit_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'unit',
    timestamps: true
});
async function get_unit_table() {
    await Unit.sync()
    console.log('Unit table synced');
}
module.exports = { Unit, get_unit_table };