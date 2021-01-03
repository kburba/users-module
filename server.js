const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const usersRoutes = require("./routes/api/usersRoutes");
const authRoutes = require("./routes/api/authRoutes");

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
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

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
