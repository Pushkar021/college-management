const User = require("../models/users");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const {
  sendVerificationCodeViaEmail,
  verifyCodeViaEmail,
} = require("../helpers/emailVerification");
var { encrypt,  decrypt } = require('../helpers/encryption');
var signOptions = {
  expiresIn: "160h"
};
const initiateRegister = async (req, res) => {
    let code = 400;
    const { value, type } = req.body;
  
    if (type == "email") {
      const userCount = await User.countDocuments({
        email: value,
      });
  
      if (userCount > 0) {
        return res.status(code).json({
          code,
          message: "Email already exists!",
          errors: { email: "Email already exists!" },
        });
      }
    } else {
      const userCount = await User.count({
        mobile_phone: value,
      });
  
      if (userCount > 0) {
        return res.status(code).json({
          code,
          message: "Mobile Phone already exists!",
          errors: { mobile_phone: "Mobile Phone already exists!" },
        });
      }
    }
    if (type == "email") {
      const verificationId = await sendVerificationCodeViaEmail(value);
      console.log(verificationId)
      if (verificationId) {
        code = 200;
        return res.status(code).json({
          code,
          message: "Verification code sent!",
          data: { verificationId: verificationId._id },
        });
      }
      return res.status(code).json({
        code,
        message: "Something went wrong!",
        errors: {},
      });
    } else {
      sendVerificationCode(type, value, (error, response) => {
        console.log(type, response)
        if (error) {
          return res.status(code).json({
            code,
            message: errorMessage(error),
            errors: {},
          });
        } else {
          code = 200;
          console.log(response.id, "otp")
          return res.status(code).json({
            code,
            message: "Verification code sent!",
            data: { verificationId: response.id },
          });
        }
      });
    }
  };

  const create = async (req, res) => {
    let code = 400;
    try {
      const body = _.pickBy(_.get(req, "body"), (value, key) => {
        return (
          key === "token" ||
          key === "verificationId" ||
          key === "email" ||
          key === "mobile_phone" ||
          key === "password"
        );
      });
      const { token, verificationId } = body;
      let user_checkBy_email = null;
  
  
      if(!/^\d+$/.test(token)){
        return res.status(code).json({
          code,
          message: "The one time passcode is incorrect",
          errors: {},
        });
      }
  
      if (body.email) {
        user_checkBy_email = await User.findOne({ email: body.email });
      }
      let user_checkBy_phone = null;
      if (body.mobile_phone) {
        user_checkBy_phone = await User.findOne({
          mobile_phone: body.mobile_phone,
        });
      }
      if (
        user_checkBy_email != null &&
        user_checkBy_phone != null &&
        user_checkBy_phone.email !== null
      ) {
        return res.status(code).json({
          code,
          message: "email already exist. ",
          errors: {},
        });
      }
  
      if (user_checkBy_phone && user_checkBy_phone.mobile_phone !== null) {
        return res.status(code).json({
          code,
          message: "phone already exist. ",
          errors: {},
        });
      }
  
      if (body.email) {
        let success = await verifyCodeViaEmail(verificationId, token, body.email);
        if (!success) {
          return res.status(code).json({
            code,
            message:
              "The one time passcode is incorrect. Please re-enter or resend code",
            errors: {},
          });
        } else {
          code = 200;
          //  body.password = md5(body.password);
          body.password = encrypt(body.password, 'base64');
          delete body.verificationId;
          delete body.token;
  
          body.emailVerified = true;
          body.mobilePhoneVerified = false;
          let user = await User.create(body);
  
          // handleNewUserNotification(user);
          const accessToken = encrypt(jwt.sign({ _id: user._id, email: user.email }, process.env.JWTSECRET, signOptions), "base64");
          return res.status(code).json({
            code,
            message: "User Created",
            data: user,
            accessToken: accessToken,
          });
        }
      } else {
        checkVerificationCode(token, verificationId, async (error, response) => {
          console.log(response);
          if (error) {
            return res.status(code).json({
              code,
              message: errorMessage(error),
              errors: {},
            });
          } else {
            code = 200;
  
            body.password = encrypt(body.password, 'base64');
            // body.password = md5(body.password);
            delete body.verificationId;
            delete body.token;
            body.emailVerified = body.email ? true : false;
            body.mobilePhoneVerified = body.mobile_phone ? true : false;
            body.stripeCustomerId = await addNewCustomer({
              phone: body.mobile_phone,
            });
  
            if (body.rr_referral_code) {
              body.referral_rock_code = body.rr_referral_code
            }
            body.deviceType = body.deviceType ?? "Unknown"
            let user = await User.create(body);
  
            handleNewUserNotification(user);
            const accessToken = encrypt(jwt.sign({ _id: user._id, email: user.email }, process.env.JWTSECRET, signOptions), "base64");
            return res.status(code).json({
              code,
              message: "User Created",
              data: user,
              accessToken: accessToken,
            });
          }
        });
      }
    } catch (err) {
      console.log(err, "++++Err");
      return res
        .status(code)
        .json({ code, message: err.message, errors: { error: err.message } });
    }
  };

  module.exports = {initiateRegister,create}