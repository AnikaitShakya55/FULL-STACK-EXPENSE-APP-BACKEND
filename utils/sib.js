const Sib = require("sib-api-v3-sdk");

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

const transEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
  email: "shakya.ani47@gmail.com",
};

const receivers = [
  {
    email: "anikait.shakya@easexpense.com",
  },
];

transEmailApi
  .sendTransacEmail({
    sender,
    to: receivers,
    subject: "EMAIL SENDING SERVCE",
    textContent: `learning sending email service`,
  })
  .then(() => console.log("Email sent successfully!"))
  .catch((err) => console.log(err));
