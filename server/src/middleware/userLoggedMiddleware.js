// middleware/auth.js
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    // Si el usuario está autenticado, continúa con la solicitud
    next();
  } else {
    // Si el usuario no está autenticado, redirígelo al login
    res.redirect('/login'); // Puedes cambiar '/login' por la ruta real de tu página de inicio de sesión
  }
};

module.exports = {
  isLoggedIn,
};
