require("dotenv").config({ silent: true });
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

module.exports = {
  jwtOptions,
  jwtStrategy,
};
