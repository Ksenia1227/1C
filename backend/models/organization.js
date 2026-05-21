const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');
const { User } = require('./user'); 
const { EntityType } = require('./entity_type');

const Organization = sequelize.define('organization', {
    organization_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
     type_id: {   
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'entity_type',
            key: 'entity_type_id'
        }
    },
    short_name: DataTypes.TEXT,
    full_name: DataTypes.TEXT,
    inn: DataTypes.CHAR(10),
    kpp: DataTypes.CHAR(9),
    ogrn: DataTypes.CHAR(13),
    registration_date: DataTypes.DATEONLY,
    registration_authority: DataTypes.TEXT,
    legal_address: DataTypes.TEXT,
    actual_address: DataTypes.TEXT,
    phone: DataTypes.CHAR(12),
    email: DataTypes.TEXT,
    bank: DataTypes.TEXT,
    checking_account: DataTypes.CHAR(20),
    tax_office_code: DataTypes.TEXT,
    name_tax_office: DataTypes.TEXT,
    full_name_tax_office: DataTypes.TEXT,
    oktmo: DataTypes.CHAR(11),
    okato: DataTypes.CHAR(11),
    registration_number_pfr: DataTypes.STRING(20),
    territorial_code_pfr: DataTypes.CHAR(6),
    territorial_name_pfr: DataTypes.TEXT,
    registration_number_fss: DataTypes.TEXT,
    subordination_code: DataTypes.CHAR(5),
    territorial_name_fss: DataTypes.TEXT,
    okopf: DataTypes.CHAR(5),
    okfs: DataTypes.CHAR(2),
    okved: DataTypes.STRING(20),
    okpo: DataTypes.CHAR(8),
    rosstat_territorial_code: DataTypes.TEXT,
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'uid'
        }
    }
}, {
    tableName: 'organization',
    timestamps: true
});


// Organization.belongsTo(User, { foreignKey: 'uid', as: 'owner' });
Organization.belongsTo(EntityType, { foreignKey: 'type_id', as: 'orgType' });

async function get_organization_table() {
    await Organization.sync();
    console.log('Organization table synced');
}

module.exports = { Organization, get_organization_table };