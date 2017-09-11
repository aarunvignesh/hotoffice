var express = require("express"),
    app = express(),
    session = require("express-session"),
    cookie = require("cookie-parser"),
    routes = require("./Routes"),
    mongoose = require("mongoose"),
    path = require("path"),
    settings = require("./settings"), 
    body = require("body-parser");

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.resolve(__dirname,"public")));

app.use(cookie());
app.use(session({
    saveUninitialized: true,
    resave  : true,
    secret  : "wse_openoffice",
    cookie  :  {
        maxAge: 24 * (60 * 60 * 1000), // 24 hours expiry time
        httpOnly: true,
        secure: false // If https is enabled, it must be true
    },
    key     : "sessionId",
}))

app.use(routes);

function dbUrlformatter(db){
    return "mongodb://"+db.username + ":" + db.password +"@"+db.url+":"+db.port+"/"+db.database;
}

mongoose.connect(dbUrlformatter(settings.db))

var dbConnection = mongoose.connection;

dbConnection.on('error', function() {
  console.log('connection error !!! Please check the mongo db connection');
});

dbConnection.once('openUri', function() {
  console.log('Connected Successfully to mongo-db');
});

dbConnection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

app.listen(3500, ()=>{
    console.log("----: Server started at 3500 :------");
});


app.get("*", (req,res)=>{
    res.redirect("/");
});
