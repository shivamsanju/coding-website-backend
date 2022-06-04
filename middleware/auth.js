const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req.headers.token);
  const token = req.headers.token;
    if (!token) {
      res.status(401).send({"success": false, "message":"Please login first"});
    }else{
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedData.userId;
      next();
    }
});