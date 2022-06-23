const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
const { User } = require('../models');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    User.findOne({
      where: {
        id: jwt_payload.id,
        name: jwt_payload.name,
        email: jwt_payload.email,
        city: jwt_payload.city,
        address: jwt_payload.address,
        phone_number: jwt_payload.phone_number,
        role_id: jwt_payload.role_id
      }
    })
      .then((User) => done(null, User))
      .catch((err) => done(err, false));
  })
);

module.exports = passport.authenticate('jwt', { session: false });