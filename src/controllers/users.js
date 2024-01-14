const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");

const usersPath = path.join(__dirname, "../data/user.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

module.exports = {
    login: (req, res) => {
        res.render("users/login.ejs")
    },
    processLogin: (req, res) => {
        const {email, password} = req.body;
        let userFound = users.find(user => user.email == email);
        if(userFound && bcryptjs.compareSync(password, userFound.password)){
            req.session.userLogged = userFound;
            res.redirect("/");
        }else{
            res.send("El password o el email es incorrecto");
        }
    },
    profile: (req, res) => {
        res.render("users/profile.ejs", {user: req.session.userLogged});
    }
}