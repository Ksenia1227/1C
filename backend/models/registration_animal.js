const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const RegistrationAnimal = sequelize.define('registration_animal', {
    registration_animal_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    date: DataTypes.DATEONLY,
    department_id: {
        type: DataTypes.BIGINT,
        references: { model: 'division', key: 'division_id' }
    },
    movement_id: {
        type: DataTypes.BIGINT,
        references: { model: 'movement', key: 'movement_id' }
    },
    nomenclature_type_id: {
        type: DataTypes.BIGINT,
        references: { model: 'nomenclature_type', key: 'type_id' }
    },
    animal_id: {
        type: DataTypes.BIGINT,
        references: { model: 'animal', key: 'animal_id' }
    },
    number: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    price:  DataTypes.DECIMAL(10,2),
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    }
}, {
    tableName: 'registration_animal',
    timestamps: true
});

async function get_registration_animal_table() {
    await RegistrationAnimal.sync();
    console.log('Registration animal table synced');
}

module.exports = { RegistrationAnimal, get_registration_animal_table };