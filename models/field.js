const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');
const { Division } = require('./division');
const { User } = require('./user');

const Field = sequelize.define('field', {
    field_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.TEXT, allowNull: false },
    field_area: DataTypes.DECIMAL(10,2),
    code: DataTypes.TEXT,
    departament_id: {   
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'field',
    timestamps: true
});

Field.belongsTo(Division, { foreignKey: 'departament_id' });
// Field.belongsTo(User, { foreignKey: 'uid' });

async function get_field_table() {
    await Field.sync();
    console.log('Field table synced');
}

module.exports = { Field, get_field_table };