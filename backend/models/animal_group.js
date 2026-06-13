const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const AnimalGroup = sequelize.define('animal_group', {
    animal_group_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'animal_group',
    timestamps: true
});

async function get_animal_group_table() {
    await AnimalGroup.sync();
    console.log('Animal group table synced');
}

module.exports = { AnimalGroup, get_animal_group_table };