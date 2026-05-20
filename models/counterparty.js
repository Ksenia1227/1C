const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Counterparty = sequelize.define('counterparty', {
    counterparty_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    comment: DataTypes.TEXT,
    counterparty_type_id: {
        type: DataTypes.BIGINT,
        references: { model: 'entity_type', key: 'entity_type_id' }
    },
    name_for_doc: DataTypes.TEXT,
    name_program: DataTypes.TEXT,
    country_registration: DataTypes.TEXT,
    inn: DataTypes.CHAR(12),
    kpp: DataTypes.CHAR(9),
    ogrn: DataTypes.CHAR(13),
    bank: DataTypes.TEXT,
    checking_account: DataTypes.TEXT,
    legal_address: DataTypes.TEXT,
    actual_address: DataTypes.TEXT,
    phone: DataTypes.TEXT,
    email: DataTypes.TEXT,
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'counterparty',
    timestamps: true
});

async function get_counterparty_table() {
    await Counterparty.sync();
    console.log('Counterparty table synced');
}

module.exports = { Counterparty, get_counterparty_table };