const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

module.exports = {
    logError: function (error) {
        console.error(error)
        const errorLog = `[${new Date().toISOString()}] ${error.stack || error}\n`;
        try {
            const logsDir = path.join(process.cwd(), "logs");
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir);
            }
            fs.appendFileSync(path.join(logsDir, "error.log"), errorLog);
        } catch (err) {
            console.error(chalk.redBright("Failed to log error:"), err);
        }
    },

    logWarning: function (warning) {
        console.warn(warning)
        const warningLog = `[${new Date().toISOString()}] ${warning.stack || warning}\n`;
        try {
            const logsDir = path.join(process.cwd(), "logs");
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir);
            }
            fs.appendFileSync(path.join(logsDir, "warning.log"), warningLog);
        } catch (err) {
            console.error(chalk.redBright("Failed to log warning:"), err);
        }
    },
};
