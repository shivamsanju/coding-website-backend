const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req);
  // if (!req.cookies){
  //   res.status(401).send({"success": false, "message":"Please login first"});
  // }else{
  //   const token = req.cookies.token;
  //   if (!token) {
  //     res.status(401).send({"success": false, "message":"Please login first"});
  //   }else{
  //     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //   }
  // }
  next();
});