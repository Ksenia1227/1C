const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const BalanceCardGood = sequelize.define('balance_card_good', {
    balance_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nomenclature_id: {
        type: DataTypes.BIGINT,
        references: { model: 'nomenclature', key: 'nomenclature_id' }
    },
    account_id: {
        type: DataTypes.BIGINT,
        references: { model: 'account', key: 'account_id' }
    },
    building_id: {
        type: DataTypes.BIGINT,
        references: { model: 'building', key: 'building_id' }
    },
    quantity: DataTypes.DECIMAL(12,2),
    unit_id: {
        type: DataTypes.BIGINT,
        references: { model: 'unit', key: 'unit_id' }
    },
    code: DataTypes.TEXT,
    counterparty_id: {
        type: DataTypes.BIGINT,
        references: { model: 'counterparty', key: 'counterparty_id' }
    },
    cost: DataTypes.DECIMAL(12,2),
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'balance_card_good',
    timestamps: true
});

async function get_balance_card_good_table() {
    await BalanceCardGood.sync();
    console.log('Balance card good table synced');
}

module.exports = { BalanceCardGood, get_balance_card_good_table };