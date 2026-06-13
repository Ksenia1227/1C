const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');
const { User } = require('./user');

const GroupCulture = sequelize.define('group_culture', {
    group_culture_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.TEXT, allowNull: false }
}, {
    tableName: 'group_culture',
    timestamps: true
});

//  GroupCulture.belongsTo(User, { foreignKey: 'uid' });

async function get_group_culture_table() {
    await GroupCulture.sync();
    console.log('Group culture table synced');
}

module.exports = { GroupCulture, get_group_culture_table };