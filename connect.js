const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/GeneratorData')

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connect with db');
    } catch (error) {
        console.error('Error', error)
    }
}

connect()

module.exports = { sequelize, connect }