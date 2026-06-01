const msal = require('@azure/msal-node');
const axios = require('axios');

const config = {
    auth: {
        clientId: "Your_client_ID",
        authority: "https://login.microsoftonline.com/cd62b7dd-4b48-44bd-90e7-e143a22c8ead",
        clientSecret: "Your_secret_Id"
    }
};

const tokenRequest = {
    scopes: ["https://graph.microsoft.com/.default"],
};

async function getAccessToken() {
    const cca = new msal.ConfidentialClientApplication(config);
    const response = await cca.acquireTokenByClientCredential(tokenRequest);
    return response.accessToken;
}

async function sendMail() {
    try {
        const token = await getAccessToken();

        const emailData = {
            message: {
                subject: "Test Email from Graph ✅",
                body: {
                    contentType: "Text",
                    content: "Hello Anil,\n\nThis is a test email from CMP Tool.\n\nThanks"
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: "Receiver_Email_Id"
                        }
                    }
                ]
            },
            saveToSentItems: true
        };

        await axios.post(
            "https://graph.microsoft.com/v1.0/users/Sender_Email_Id/sendMail",
            emailData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("✅ Email sent successfully");

    } catch (error) {
        console.error("❌ Error:");
        console.error(error.response?.data || error.message);
    }
}

sendMail();