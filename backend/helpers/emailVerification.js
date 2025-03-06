const Otp = require("../models/otp.js");
const { sendEmail } = require("./sg.js");

const generateOtp = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const sendVerificationCodeViaEmail = async (email) => {
  const otp = generateOtp();
  console.log(otp)

  const { VERIFICATION_CODE_TEMPLATE } = process.env; 

 await sendEmail(email, VERIFICATION_CODE_TEMPLATE, { otp });

  //Associate otp with email to prevent account hijacking
  const otpRecord = await Otp.create({ otp :otp,email:email}
  );

  if (otpRecord) {
  

    return otpRecord;
  }
  return false;
};

const verifyCodeViaEmail = async (_id, otp,email) => {

  const otpRecord = await Otp.findOne({ _id, otp });

    
    if (otpRecord) {
      if(otpRecord.email  && email != otpRecord.email){
        return false;
      }
      await otpRecord.deleteOne();
      return true;
    }
  return false;
};

module.exports = {
  sendVerificationCodeViaEmail,
  verifyCodeViaEmail,
};
