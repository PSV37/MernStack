//Import Dependancies From Packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.Promise = require("bluebird");
const passport = require("passport");

//Import Folder Files
const config = require("./config/keys");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

//express Initalization
const app = express();
const db = config.mongoURI;

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Mongo DB Connection
mongoose
  .connect(
    db,
    { useMongoClient: true }
  )
  .then(() => console.log("mongo DB connected"))
  .catch(err => console.log("error occured with mongoo DB" + err));

//Use Router Middleware
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

//Passport Middleware
app.use(passport.initialize());

require("./config/passport")(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running on port " + port);
});
