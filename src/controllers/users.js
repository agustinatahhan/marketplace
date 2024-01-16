const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { log } = require("console");

const usersPath = path.join(__dirname, "../data/user.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

module.exports = {
    login: (req, res) => {
        res.render("users/login.ejs")
    },
    // processLogin: (req, res) => {
    //     const { email, password } = req.body;
    //     const userFound = users.find(user => user.email === email);

    //     if (userFound && userFound.password === password) {
    //         req.session.userLogged = userFound;
    //         res.redirect("/");
    //     } else {
    //         res.redirect("/login");
    //     }
    // },
    processLogin: (req, res) => {
        const { email, password } = req.body;
        const userFound = users.find(user => user.email === email);
    
        if (userFound && userFound.password === password) {
            req.session.userLogged = userFound;
            
            // if (rememberme === 'on') {
            //     res.cookie('rememberme', userFound.email, { maxAge: 60000 * 60 });
            // }
            
            res.redirect("/users/profile");
        } else {
            res.send("El password o el email es incorrecto");
        }
    },
    profile: (req, res) => {
        res.render("users/profile", {user: req.session.userLogged});
    }
}