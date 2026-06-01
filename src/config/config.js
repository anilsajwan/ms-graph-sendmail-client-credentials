require('dotenv').config();

module.exports = {
    clientId: process.env.CLIENT_ID,
    tenantId: process.env.TENANT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    senderEmail: process.env.SENDER_EMAIL,
    receiverEmail: process.env.RECEIVER_EMAIL,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`
};
