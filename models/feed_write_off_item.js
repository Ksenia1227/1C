const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const FeedWriteOffItem = sequelize.define('feed_write_off_item', {
    item_id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    feed_write_off_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: 'feed_write_off', key: 'feed_write_off_id' }
    },
    nomenclature_id: { type: DataTypes.BIGINT, allowNull: false, references: { model: 'nomenclature', key: 'nomenclature_id' } },
    quantity: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    uid: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'uid' } }
}, { tableName: 'feed_write_off_item', timestamps: true });

async function get_feed_write_off_item_table() { await FeedWriteOffItem.sync(); console.log('FeedWriteOffItem synced'); }
module.exports = { FeedWriteOffItem, get_feed_write_off_item_table };