const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const GoodsReceipt = sequelize.define('goods_receipt', {
    goods_receipt_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: DataTypes.DATEONLY,
    counterparty_id: { type: DataTypes.BIGINT, references: { model: 'counterparty', key: 'counterparty_id' } },
    building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    movement_id: { type: DataTypes.BIGINT,
        references: { model: 'movement', key: 'movement_id' } }, 
    nomenclature_id: { type: DataTypes.BIGINT, references: { model: 'nomenclature', key: 'nomenclature_id' } },
    quantity: DataTypes.DECIMAL(12,2),
    price: DataTypes.DECIMAL(12,2),
    account_id: { type: DataTypes.BIGINT, references: { model: 'account', key: 'account_id' } },
    uid: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'uid' } }
}, { tableName: 'goods_receipt', timestamps: true });

async function get_goods_receipt_table() { await GoodsReceipt.sync(); console.log('Goods receipt table synced'); }
module.exports = { GoodsReceipt, get_goods_receipt_table };