const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const ProductSale = sequelize.define('product_sale', {
    product_sale_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    number: DataTypes.STRING(20),
    counterparty_id: { type: DataTypes.BIGINT, references: { model: 'counterparty',key: 'counterparty_id' } },
    building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    nomenclature_id: { type: DataTypes.BIGINT, references: { model: 'nomenclature', key: 'nomenclature_id' } },
    quantity: DataTypes.DECIMAL(12,2),
    unit_id: { type: DataTypes.BIGINT, references: { model: 'unit', key: 'unit_id' } },
    price:  DataTypes.DECIMAL(12,2),
    status: DataTypes.STRING,
    uid: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'uid' } }
}, { tableName: 'product_sale', timestamps: true });

async function get_product_sale_table() { await ProductSale.sync(); console.log('Product sale table synced'); }
module.exports = { ProductSale, get_product_sale_table };