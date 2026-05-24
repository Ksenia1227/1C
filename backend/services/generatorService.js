const { spawn } = require("child_process");
const path = require("path");

function generateUserData(uid, name, email) {
    return new Promise((resolve, reject) => {
        const py = spawn("python", [
            path.join(__dirname, "generator/code.py"),
            uid,
            name,
            email
        ]);

        let data = "";

        py.stdout.setEncoding("utf8");
        py.stderr.setEncoding("utf8");

        py.stdout.on("data", (chunk) => {
            console.log("PY OUT:", chunk.toString());
            data += chunk.toString();
        });

        py.stderr.on("data", (chunk) => {
            console.error("PY ERR:", chunk.toString());
        });

        py.on("close", (code) => {
            console.log("PY EXIT CODE:", code);

            if (code !== 0) {
                return reject(new Error("Python crashed"));
            }

            try {
                resolve(JSON.parse(data));
            } catch (e) {
                console.error("JSON PARSE ERROR:", data);
                reject(e);
            }
        });
    });
}

module.exports = { generateUserData };