const { sequelize } = require('../connect'); 

const getInitialBalances = async (req, res) => {
    try {
        // uid добавляется в req.userUid middleware checkToken
        const uid = req.userUid;
        if (!uid) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Вызов функции PostgreSQL с параметром
        const results = await sequelize.query(
            'SELECT * FROM calculate_initial_balance(:uid)',
            {
                replacements: { uid },
                type: sequelize.QueryTypes.SELECT
            }
        );

        // Функция возвращает массив объектов { code, name, balance }
        // Отдаём его клиенту
        res.status(200).json(results);
    } catch (error) {
        console.error('Ошибка при расчёте начальных остатков:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
};

module.exports = {
    getInitialBalances
};