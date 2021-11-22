require("dotenv").config({ silent: true });
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require("./models/user");

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  next
) {
  const user = await User.findById(jwt_payload.id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

const authenticate = function (req, res, next) {
  return passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          status: "error",
          messages: ["Unauthorized user"],
        });
      } else {
        req.user = user;
        next();
      }
    }
  )(req, res, next);
};

module.exports = {
  jwtOptions,
  jwtStrategy,
  authenticate,
};
