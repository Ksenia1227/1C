const { sequelize } = require('../connect');
const { DataTypes } = require('sequelize');

const Progress = sequelize.define('progress', {
    progress_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'uid' }
    },
    nsi: { type: DataTypes.BOOLEAN, defaultValue: false },               // НСИ
    initial_balances: { type: DataTypes.BOOLEAN, defaultValue: false }, // Ввод остатков
    check_balances: { type: DataTypes.BOOLEAN, defaultValue: false },   // Проверка остатков
    movements: { type: DataTypes.BOOLEAN, defaultValue: false },        // Движения (документы)
    balance_sheet: { type: DataTypes.BOOLEAN, defaultValue: false },    // Сальдовая ведомость
    general_info: { type: DataTypes.BOOLEAN, defaultValue: false },     // Общая информация
    livestock: { type: DataTypes.BOOLEAN, defaultValue: false },        // Животноводство
    crop_farming: { type: DataTypes.BOOLEAN, defaultValue: false },     // Растениеводство
    buildings: { type: DataTypes.BOOLEAN, defaultValue: false },        // Здания и сооружения
    machinery: { type: DataTypes.BOOLEAN, defaultValue: false },         // Машино-тракторный парк
    // Новые поля
    contractors: { type: DataTypes.BOOLEAN, defaultValue: false },      // Контрагенты
    employees: { type: DataTypes.BOOLEAN, defaultValue: false },        // Сотрудники
    crop_ost: { type: DataTypes.BOOLEAN, defaultValue: false },        // Остатки растениеводства
    animal_ost: { type: DataTypes.BOOLEAN, defaultValue: false },      // Остатки животноводства
    materials_ost: { type: DataTypes.BOOLEAN, defaultValue: false },   // Остатки материалов и товаров
    crop_processes: { type: DataTypes.BOOLEAN, defaultValue: false },  // Процессы растениеводства
    animal_processes: { type: DataTypes.BOOLEAN, defaultValue: false }, // Процессы животноводства
    general_info_processes: { type: DataTypes.BOOLEAN, defaultValue: false }, // Процессы общей информации
    machinery_processes: { type: DataTypes.BOOLEAN, defaultValue: false }    // Процессы основных средств
}, {
    tableName: 'progress',
    timestamps: true
});

async function get_progress_table() {
    await Progress.sync();
    console.log('Progress table synced');
}

module.exports = { Progress, get_progress_table };