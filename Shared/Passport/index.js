var passport = require("passport"),
    local = require("passport-local").Strategy,
    app = require("express")(),
    User = require("./../../models/user.schema");

passport.serializeUser((user, done)=>{
    return done(null, user);
});

passport.deserializeUser((user, done)=>{
    return done(null, user);
});

passport.use('PROOT-SIGNIN', new local({
    passReqToCallback: true,
    usernameField: "username",
    passwordField: "password"
}, (req, username, password, done) => {
    User.findOne({emp_id:username,password:password},(err,user) => {
        if(err){
            done(null, false);
        }
        else{
            done(null, user);
        }
    });
}));

module.exports = passport;