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
        attributes: ['name', 'email', 'city', 'address', 'phone_number', 'profile_picture'],
        where: {
            id: jwt_payload.id,
        }
    })
      .then((User) => done(null, User))
      .catch((err) => done(err, false));
  })
);

module.exports = passport.authenticate('jwt', { session: false });