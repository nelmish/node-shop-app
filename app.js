const path = require("path");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
//app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");
const User = require("./models/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6131150d391cc323ebdc3b2f")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect("mongodb://192.168.178.109:27017/shop?retryWrites=true")
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "max@mustermann.de",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
