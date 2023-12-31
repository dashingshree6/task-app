const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = (req, res, next) => {
  console.log('.................',req.headers.authorization)
  res.setHeader("Content-Type", "application/json");
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {

    jwt.verify(
      req.headers.authorization.split(" ")[1],
      'TASKAPP123',
      async function (err, decode) {
        if (err) req.user = undefined;
         let user = await User.findOne({_id: decode?.userId}).exec()
            req.user = user;
            console.log(req.user, "User");
            userreq = user;
            next();
      }
    );
  } else {
    // req.user = undefined;
    if (!req.user) {
      return res.status(404).json({ message: "Please provide user token" });
    }

    next();
  }
};
