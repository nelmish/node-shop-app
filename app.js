const path = require("path");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
//app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('612e78ec022d57c9329f6b8a')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  // if () {

  // }
  //console.log(client);
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
});
