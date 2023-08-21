const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// there is a string named "Bearer" attached to the token when it is sent for authorization
// Header =  Bearer token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extract the token from the entire header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token
      // we dont want to hash the password that's why we put '-password'

      req.user = await User.findById(decoded._id).select("-password");

      next();
    } 
    catch (error)
    {
        // console.log(error)
        res.status(401)   // 401 means 'Not authorized'
        throw new Error('Not Authorized')
    }
  }

  if(!token)
  {
    res.status(401)
    throw new Error('Not Authorized, no token.')
  }
})

module.exports = protect;
