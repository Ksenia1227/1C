const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const FeedWriteOff = sequelize.define('feed_write_off', {
    feed_write_off_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    from_building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    to_building_id: { type: DataTypes.BIGINT, references: { model: 'building', key: 'building_id' } },
    department_id: { type: DataTypes.BIGINT, references: { model: 'division', key: 'division_id' } },
    animal_group_id: { type: DataTypes.BIGINT, references: { model: 'animal_group', key: 'animal_group_id' } },
    head_count: { type: DataTypes.INTEGER, allowNull: false },
    cost_account_id: { type: DataTypes.BIGINT, references: { model: 'account', key: 'account_id' } },
    employee_id: { type: DataTypes.BIGINT, references: { model: 'employee', key: 'employee_id' } },
    uid: { type: DataTypes.UUID, allowNull: false, references: { model: 'users', key: 'uid' } }
}, { tableName: 'feed_write_off', timestamps: true });

async function get_feed_write_off_table() { await FeedWriteOff.sync(); console.log('FeedWriteOff synced'); }
module.exports = { FeedWriteOff, get_feed_write_off_table };