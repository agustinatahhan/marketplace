const db = require("../../database/models");
const bcryptjs = require('bcryptjs');

const checkLoggedInWithCookie = async (req, res, next) => {
  try {
    // Verificar si hay una cookie de userId en la solicitud
    const userId = req.cookies.userId;
    const sessionId = req.cookies['connect.sid']; // Obtener el identificador de sesión


    if (userId) {
      // Buscar al usuario en la base de datos utilizando el userId de la cookie
      const user = await db.User.findByPk(userId);
      if (user) {
        // Obtener el email y la contraseña del usuario
        const { email, password } = user;
        // Verificar si las credenciales son válidas
        const passwordMatch = bcryptjs.compareSync(password, user.password);
        if (passwordMatch) {
          // Si las credenciales son válidas, configurar la sesión con la información del usuario
          req.session.userId = user.id;
          req.session.name = user.firstName;
          req.session.client = user.client;
          // También almacenar el identificador de sesión en la sesión del usuario
          req.session.sessionId = sessionId;

        }
      }
    }

    next(); // Continuar con la ejecución de la solicitud
  } catch (error) {
    console.error(error);
    next(); // Continuar con la ejecución de la solicitud incluso si hay un error
  }
};

module.exports = {
  checkLoggedInWithCookie,
};
