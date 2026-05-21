const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Account = sequelize.define('account', {
    account_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'account',
    timestamps: true
});

async function get_account_table() {
    await Account.sync();
    console.log('Account table synced');
}

module.exports = { Account, get_account_table };