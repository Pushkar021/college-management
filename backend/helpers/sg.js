const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API_KEY);
const client = require("@sendgrid/client");
client.setApiKey(process.env.SG_API_KEY);

const sendEmail = async (to, templateId, dynamic_template_data, bulk = 0) => {
    const msg = {
      to,
      from: {
        name: process.env.SG_SENDER_NAME,
        email: process.env.SG_SENDER_EMAIL,
      },
      templateId,
     
      dynamic_template_data,
    };
   
    try {
      if (bulk) {
        await sgMail.sendMultiple(msg);
      } else {
        await sgMail.send(msg);
      }
    } catch (err) {
      console.log(err.response);
      
    }
  };
module.exports = {
    sendEmail,
  };