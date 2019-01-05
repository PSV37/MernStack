//Import Dependancies From Packages
const express = require("express");
const mongoose = require("mongoose");

//Import Folder Files
const config = require("./config/keys");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();
const db = config.mongoURI;

//Mongo DB Connection
mongoose
  .connect(db)
  .then(() => console.log("mongo DB connected"))
  .catch(err => console.log("error occured with mongoo DB" + err));

app.get("/", (req, res) => {
  res.send("Hello World :-)");
});

//Use Router
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("server running on port " + port);
});
