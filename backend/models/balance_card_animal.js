const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const BalanceCardAnimal = sequelize.define('balance_card_animal', {
    balance_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    account_id: {
        type: DataTypes.BIGINT,
        references: { model: 'account', key: 'account_id' }
    },
    inventory_number: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: { model: 'animal', key: 'inventory_number' }
    },
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    building_id: {
        type: DataTypes.BIGINT,
        references: { model: 'building', key: 'building_id' }
    },
    weight: DataTypes.DECIMAL(8,2),
    amount: DataTypes.DECIMAL(12,2),
    number_heads: DataTypes.INTEGER,
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'balance_card_animal',
    timestamps: true
});

async function get_balance_card_animal_table() {
    await BalanceCardAnimal.sync();
    console.log('Balance card animal table synced');
}

module.exports = { BalanceCardAnimal, get_balance_card_animal_table };