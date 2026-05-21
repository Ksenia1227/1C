const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');
const { GroupCulture } = require('./group_culture');
const { User } = require('./user');

const Crop = sequelize.define('crop', {
    crop_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    group_id: {
        type: DataTypes.BIGINT,
        references: { model: 'group_culture', key: 'group_culture_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'crop',
    timestamps: true
});

Crop.belongsTo(GroupCulture, { foreignKey: 'group_id' });
// Crop.belongsTo(User, { foreignKey: 'uid' });

async function get_crop_table() {
    await Crop.sync();
    console.log('Crop table synced');
}

module.exports = { Crop, get_crop_table };
