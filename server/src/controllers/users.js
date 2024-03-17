const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../../database/models");
// const usersPath = path.join(__dirname, "../data/user.json");
// const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

module.exports = {
  login: (req, res) => {
    res.render("users/login.ejs");
  },
  processLogin: async (req, res) => {
    try {
      const { email, password, rememberme } = req.body;
      // const userFound = users.find((user) => user.email === email);
      const userFound = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (userFound) {
        const passwordMatch = bcryptjs.compareSync(
          password,
          userFound.password
        );

        if (passwordMatch) {
          req.session.userLogged = {
            id: userFound.id,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            email: userFound.email,
          };

          const sessionOptions = {
            maxAge: rememberme ? 30 * 24 * 60 * 60 * 1000 : null,
            httpOnly: true,
          };

          req.session.cookie = sessionOptions;

          return res.redirect("/users/profile");
        }
      }

      return res.redirect("/users/login");
    } catch (error) {
      console.log(error);
    }
  },

  profile: (req, res) => {
    res.render("users/profile.ejs", { user: req.session.userLogged });
  },

  processRegister: async (req, res) => {
    try {
      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
        return res.render("users/register.ejs", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }

      // let userInDB = User.findByField("email", req.body.email);
      let userInDB = await db.User.findOne({
        where: {
          email: req.body.email
        }
      })

      if (userInDB) {
        return res.render("users/register.ejs", {
          errors: {
            email: {
              msg: "Este email ya está registrado",
            },
          },
          oldData: req.body,
        });
      }

      let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        image: req.file.filename,
      };

      await db.User.create(userToCreate);

      return res.redirect("/users/login");
    } catch (error) {
      console.log(error);
    }
  },
};
