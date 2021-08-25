const path = require("path");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
//app.set('views', 'views');

const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  //console.log(client);
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
});
