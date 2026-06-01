const msal = require('@azure/msal-node');
const config = require('../config/config');
const logger = require('../utils/logger');

const msalConfig = {
    auth: {
        clientId: config.clientId,
        authority: config.authority,
        clientSecret: config.clientSecret
    }
};

const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"]
};

async function getAccessToken() {
    try {
        const cca = new msal.ConfidentialClientApplication(msalConfig);
        const response = await cca.acquireTokenByClientCredential(tokenRequest);

        logger.info("Access token acquired");
        return response.accessToken;

    } catch (error) {
        logger.error("Token error: " + error.message);
        throw error;
    }
}

module.exports = { getAccessToken };
