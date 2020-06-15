const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const languages = require("./routes/api/languages");
const services = require("./routes/api/services");
const orders = require("./routes/api/orders");
const clients = require("./routes/api/clients");
const vendors = require("./routes/api/vendors");

const app = express();

// body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(
      `${new Date().toLocaleString()}:  Successfully connected to MongoDB`
    )
  )
  .catch((err) => console.log("Error ", err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// use Routes
app.use("/api/vendors", vendors);
app.use("/api/users", users);
app.use("/api/services", services);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/orders", orders);
app.use("/api/languages", languages);
app.use("/api/clients", clients);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${new Date().toLocaleString()}:  Server running on ${port}`);
});
