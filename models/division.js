const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');
const { Organization } = require('./organization');
const { User } = require('./user');

const Division = sequelize.define('division', {
    division_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    organization_id: {
        type: DataTypes.BIGINT,
        references: {
            model: 'organization',
            key: 'organization_id'
        }
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'division',
    timestamps: true
});

Division.belongsTo(Organization, { foreignKey: 'organization_id' });
// Division.belongsTo(User, { foreignKey: 'uid' });

async function get_division_table() {
    await Division.sync();
    console.log('Divisions table synced');
}

module.exports = { Division, get_division_table };