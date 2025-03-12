const User = require("../models/users");

const getInfo = async (req, res) => {
  try{
      console.log(req.userid)
  const findId = await User.findById(req.userid);
  res.json({
    message:findId
  })
  }
  catch(e){
    console.log(e)
    res.status(404).json({
      message:"Invalid Access!"
    })
  }
};

module.exports = getInfo ; 