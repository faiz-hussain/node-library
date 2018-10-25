const passport = require('passport');

require('./strategies/local.strategy')();

const passportConfig = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());


  //  Stores user in the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  //  Retrives user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportConfig;