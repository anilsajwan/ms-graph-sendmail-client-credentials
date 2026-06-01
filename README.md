Microsoft Graph Email Sender (Client Credentials Flow)
🚀 Overview
This project demonstrates how to send emails using Microsoft Graph API with Client Credentials (App-only authentication).
It includes:

✅ Node.js script to send email
✅ n8n workflow for automation
✅ Step-by-step Azure setup


🧠 How It Works (Concept)
This solution uses OAuth 2.0 Client Credentials Flow:


Your app authenticates using:

Client ID
Client Secret
Tenant ID



Azure AD returns an Access Token


That token is used to call Microsoft Graph API


Graph API sends the email from a mailbox



🔄 Flow Diagram
App (Node.js / n8n)
        │
        ▼
Azure AD (Token Endpoint)
        │
        ▼
Access Token (Bearer)
        │
        ▼
Microsoft Graph API
        │
        ▼
Send Email (from mailbox)


📂 Project Structure
ms-graph-sendmail-client-credentials/
│
├── sendMailGraph.js      # Main Node.js script
├── n8n-workflow.json     # n8n automation workflow
├── package.json          # Dependencies
├── .gitignore            # Ignore sensitive files
└── README.md             # Documentation


⚙️ Prerequisites
✅ Azure Setup
You need:

Azure Subscription
App Registration
Exchange Online mailbox


🔐 Azure Configuration
1. Create App Registration
Navigate:
Azure Portal → Azure Active Directory → App registrations → New registration


2. Generate Client Secret
Certificates & Secrets → New client secret

⚠️ Copy VALUE (not Secret ID)

3. Assign API Permissions
Go to:
API Permissions → Add Permission → Microsoft Graph

Add:
Mail.Send → Application Permission

✅ Click:
Grant Admin Consent


4. Mailbox Requirement
Ensure:

Mailbox exists:

Sender email address

Has license assigned


📦 Installation
Shellnpm installShow more lines
Dependencies used:

@azure/msal-node
axios


🧪 Configuration
Update values in:
sendMailGraph.js

JavaScriptclientId: "YOUR_CLIENT_ID",authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",clientSecret: "YOUR_CLIENT_SECRET"Show more lines

▶️ Run Application
Shellnode sendMailGraph.jsShow more lines
✅ Output:
✅ Email sent successfully


📜 Script Explanation
🔹 Authentication (MSAL)
JavaScriptconst cca = new msal.ConfidentialClientApplication(config);const response = await cca.acquireTokenByClientCredential(tokenRequest);``Show more lines
👉 This:

Authenticates against Azure AD
Returns access token


🔹 Sending Email
JavaScriptaxios.post(  "https://graph.microsoft.com/v1.0/users/{sender}/sendMail",Show more lines
👉 Important:

Use:

/users/{email}/sendMail


NOT /me/sendMail (not supported in app-only flow)


🔹 Email Payload
JSON{  "message": {    "subject": "Test Email",    "body": {      "contentType": "Text",      "content": "Hello..."    },    "toRecipients": [...]  }}Show more lines

🔄 n8n Workflow
✅ Steps:

Get Access Token
Call Graph API


📥 Import

Open n8n
Import:

n8n-workflow.json


🔧 Update
Replace:
YOUR_CLIENT_SECRET


▶️ Execute
Click:
Execute Workflow


🔐 Security Best Practices
❌ NEVER commit:

Client Secret
Tokens

✅ Use .env for production:
Example:
CLIENT_SECRET=xxxx
CLIENT_ID=xxxx
TENANT_ID=xxxx


⚠️ Troubleshooting
❌ Invalid Client Secret
AADSTS7000215

✔ Use Secret VALUE, not ID
✔ Generate new secret

❌ Access Denied
403 Forbidden

✔ Add:
Mail.Send (Application)

✔ Grant Admin Consent

❌ Mailbox Error
MailboxNotEnabledForRESTAPI

✔ Assign license
✔ Use valid mailbox

❌ Authentication Failure
AADSTS900023

✔ Fix tenant ID

🧩 Example Endpoints

ActionEndpointSend mail/users/{user}/sendMailUsers list/v1.0/usersOrg details/v1.0/organization


👤 Author
Anil Sajwan
Enterprise System Administrator
