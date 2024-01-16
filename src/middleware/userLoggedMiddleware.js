module.exports = (req, res, next) => {
  if (!req.session.userLogged) {
    console.log("No estás logueado");
    return res.redirect("/users/login");
  }
  console.log("Estás logueado");
  next();
};
