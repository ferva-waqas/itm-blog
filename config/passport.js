const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const {config} = require("./index");
var User = require("../models/User");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
  opts.secretOrKey = config.SERVER_KEY;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {

      User.findById(jwt_payload._id, (err, User) => {
        if (err) {
          callback(err, null);
        }
        if (User) {
          callback(null, User);
        } else {
          callback(null, null);
        }
      });
    })
  );
};
