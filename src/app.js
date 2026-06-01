const logger = require('./utils/logger');
const { sendMail } = require('./services/mailService');

async function start() {
    try {
        logger.info("Starting application...");
        await sendMail();
        logger.info("Process completed");
    } catch (error) {
        logger.error("Application failed");
    }
}

start();
