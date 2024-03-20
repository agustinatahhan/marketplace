const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../../database/models");
const { error } = require("console");
// const usersPath = path.join(__dirname, "../data/user.json");
// const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

module.exports = {
  login: (req, res) => {
    res.render("users/login.ejs");
  },
   processLogin : async (req, res) => {
    try {

      let errors = validationResult(req);

      if(errors.isEmpty()){

        const { email, password , rememberme } = req.body;
  
      const userFound = await db.User.findOne({
        where: { email: email },
      });
  
      if (userFound) {
        const passwordMatch = bcryptjs.compareSync(password, userFound.password);
  
        if (passwordMatch) {
          req.session.userId = userFound.id;
          req.session.name = userFound.firstName;
          req.session.client = userFound.client;

          // Si se ha marcado "Recordar mi sesión", configurar una cookie que expire en 7 días
        if (rememberme) {
          res.cookie('userId', userFound.id, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
        }

            return res.status(200).json({ success: true, message: "Inicio de sesión exitoso" });
        }
      }
        return res.status(401).json({ success: false, message: "Credenciales inválidas" });
        
      }else{
        res.render("users/login.ejs", { errors: errors.array()});
      }

      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Error del servidor" });
    }
  },
  

  profile: (req, res) => {
    res.render("users/profile.ejs", { user: req.session.userLogged });
  },

  processRegister: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
  
      if (!resultValidation.isEmpty()) {
        return res.status(400).json({
          errors: resultValidation.array(),
          message: "Error de validación",
        });
      }
  
      let userInDB = await db.User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (userInDB) {
        return res.status(400).json({
          errors: [{ msg: "Este email ya está registrado" }],
          message: "Error de registro",
        });
      }
  
      let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        // image: req.file.filename,
      };
  
      await db.User.create(userToCreate);
  
      return res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await db.User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  }
  
};
