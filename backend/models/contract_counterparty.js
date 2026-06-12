const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const ContractCounterparty = sequelize.define('contract_counterparty', {
    contract_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    contract_type_id: DataTypes.STRING,
    name: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    validity_period: DataTypes.TEXT,
    counterparty_id: {
        type: DataTypes.BIGINT,
        references: { model: 'counterparty', key: 'counterparty_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }  
}, {
    tableName: 'contract_counterparty',
    timestamps: true
});

async function get_contract_counterparty_table() {
    await ContractCounterparty.sync();
    console.log('Contract counterparty table synced');
}

module.exports = { ContractCounterparty, get_contract_counterparty_table };