const crypto = require("crypto");

// encrypt the message

const iv = Buffer.from(process.env.IV, 'utf8');

// secret key generate 32 bytes of random data
const securitykey = Buffer.from(process.env.AES_KEY, 'utf8');


function encrypt(plainText, outputEncoding) {
  const cipher = crypto.
    createCipheriv("aes-256-cbc", securitykey, iv);
  return Buffer.
    concat([cipher.update(plainText), cipher.final()]).
    toString(outputEncoding);
}

//AES decryption
function decrypt(cipherText, outputEncoding) {


  try {
    const cipher = crypto.
      createDecipheriv("aes-256-cbc", securitykey, iv);
    return Buffer.
      concat([cipher.update(cipherText), cipher.final()]).
      toString(outputEncoding);
  } catch (error) {
    let errObj = {
      message: "Something went wrong!!!"

    }
    throw (errObj)
  }
}


module.exports = { encrypt, decrypt }