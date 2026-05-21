const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const ContractEmployee = sequelize.define('contract_employee', {
    contract_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    code: DataTypes.TEXT,
    hire_date: DataTypes.DATEONLY,
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    position_id: {
        type: DataTypes.BIGINT,
        references: { model: 'position', key: 'position_id' }
    },
    salary: DataTypes.DECIMAL(10,2),
    rate: DataTypes.DECIMAL(3,1),
    employment_type: DataTypes.TEXT,
    document_type: DataTypes.TEXT,
    employee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'employee', key: 'employee_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'contract_employee',
    timestamps: true
});

async function get_contract_employee_table() {
    await ContractEmployee.sync();
    console.log('Contract employee table synced');
}

module.exports = { ContractEmployee, get_contract_employee_table };