const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET


const tokenSigning = async (user) => {
    const sign = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      SECRET,
      {
        expiresIn: "2h",
      }
    );
  
    return sign
  };

  const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, SECRET)
    }catch(e){
        return null
    }
};

module.exports = { tokenSigning, verifyToken };