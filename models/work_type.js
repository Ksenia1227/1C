const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const WorkType = sequelize.define('workType', {
    work_type_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'work_type',
    timestamps: true
});
async function get_work_type_table() {
    await WorkType.sync()
    console.log('Work type table synced');
}
module.exports = { WorkType, get_work_type_table };