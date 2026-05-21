require("dotenv").config()
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(`postgres://postgres:${process.env.PASSWORD}@localhost:5432/GeneratorData`)

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