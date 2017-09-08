
var app = require("express")(),
    passport = require("./../../Shared/Passport"),
    controller = require("./controller");

app.use(passport.initialize());
app.use(passport.session());

app.get("/", controller.serveIndex);

app.get("/authenticated", controller.authenticated);

app.get("/notauthenticated", controller.notauthenticated);

app.get("/status", controller.status);

app.post("/authenticate", passport.authenticate("PROOT-SIGNIN",{
    successRedirect:"/authenticated",
    failureRedirect:"/notauthenticated"
}));

app.post("/user", controller.createUser);

app.get("/users/data", controller.getUsers);

app.get("/users/:id", controller.getUsersById);

app.get("/users/image/:id", controller.getProfileImage);


app.post("/teams", controller.createTeam);

app.get("/teams/data", controller.getTeams);

app.get("/users/:id", controller.getTeamById);

app.get("/logout", controller.logout);

module.exports = app;