const fs = require("fs");
const path = require("path");

const getGeneratedData = async (req, res) => {
    try {
        const uid = req.userUid;

        const filePath = path.join(
            __dirname,
            "../data/users",
            `${uid}.json`
        );

        if (!fs.existsSync(filePath)) {
            return res.status(404).send({
                message: "Generated data not found"
            });
        }

        const rawData = fs.readFileSync(filePath, "utf8");

        const parsedData = JSON.parse(rawData);

        return res.status(200).json(parsedData);

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

module.exports = {
    getGeneratedData
};