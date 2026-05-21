const { sequelize } = require('../connect')
const { DataTypes } = require('sequelize')

const auth = sequelize.define(
    'auth',
    {
        uid: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        AccessToken: {
            type: DataTypes.TEXT
        },
        RefreshToken: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
    },
    {
        tableName: 'auths',
        timestamps: true
    }
)

async function get_auths_table() {
    await auth.sync()
    console.log('auth table synced');
}
// async function get_auths_table() {
//     await auth.sync({ alter: true }); 
//     console.log('auth table synced');
//   }

module.exports = { auth, get_auths_table }