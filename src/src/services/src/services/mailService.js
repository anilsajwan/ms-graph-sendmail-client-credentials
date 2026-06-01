const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');
const { getAccessToken } = require('./authService');

async function sendMail() {
    try {
        const token = await getAccessToken();

        const emailData = {
            message: {
                subject: "Enterprise Email ✅",
                body: {
                    contentType: "Text",
                    content: "Hello Anil,\n\nThis is enterprise setup email.\n\nThanks"
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: config.receiverEmail
                        }
                    }
                ]
            },
            saveToSentItems: true
        };

        await axios.post(
            `https://graph.microsoft.com/v1.0/users/${config.senderEmail}/sendMail`,
            emailData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        logger.info("Email sent successfully");

    } catch (error) {
        logger.error("Mail error: " + (error.response?.data || error.message));
    }
}

module.exports = { sendMail };
