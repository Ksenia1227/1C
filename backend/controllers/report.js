const { sequelize } = require('../connect'); 

const getInitialBalances = async (req, res) => {
    try {
        const uid = req.userUid;
        if (!uid) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Вызов функции PostgreSQL
        const results = await sequelize.query(
            'SELECT calculate_initial_balance(:uid) as data',
            {
                replacements: { uid },
                type: sequelize.QueryTypes.SELECT
            }
        );

        console.log("Raw results:", results);

        // Проверяем, есть ли данные
        if (!results || results.length === 0) {
            return res.status(200).json([]);
        }

        // Парсим JSON данные
        let parsedData = [];
        try {
            // Если results[0].data это строка JSON
            if (typeof results[0].data === 'string') {
                parsedData = JSON.parse(results[0].data);
            } else {
                // Если это уже объект
                parsedData = results[0].data;
            }
        } catch (parseError) {
            console.error("Ошибка парсинга JSON:", parseError);
            return res.status(500).json({ message: 'Ошибка обработки данных' });
        }

        console.log("Parsed data:", parsedData);

        // Проверяем, что данные - массив
        if (!Array.isArray(parsedData)) {
            parsedData = [];
        }

        res.status(200).json(parsedData);
    } catch (error) {
        console.error('Ошибка при расчёте начальных остатков:', error);
        res.status(500).json({ 
            message: 'Внутренняя ошибка сервера', 
            error: error.message 
        });
    }
};

module.exports = {
    getInitialBalances
};