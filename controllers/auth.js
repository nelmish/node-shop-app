const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  //const isLoggedIn = req.get("Cookie").split(";")[4].trim().split("=")[1];
  //console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('6131150d391cc323ebdc3b2f')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err)
    res.redirect("/");
  });
};
