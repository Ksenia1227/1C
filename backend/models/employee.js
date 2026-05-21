const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Employee = sequelize.define('employee', {
    employee_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    gender: DataTypes.TEXT,
    date_of_birth: DataTypes.DATEONLY,
    inn: DataTypes.CHAR(12),
    snils: DataTypes.TEXT,
    citizenship: DataTypes.TEXT,
    passport: DataTypes.TEXT,
    issued_by: DataTypes.TEXT,
    date_issue: DataTypes.DATEONLY,
    residence_address: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    email: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    name: DataTypes.TEXT,
    middle_name: DataTypes.TEXT,
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'employee',
    timestamps: true
});

async function get_employee_table() {
    await Employee.sync();
    console.log('Employee table synced');
}

module.exports = { Employee, get_employee_table };