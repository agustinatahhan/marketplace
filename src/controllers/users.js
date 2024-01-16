const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { log } = require("console");


const { validationResult } = require('express-validator');

const User = require('../models/User');

const usersPath = path.join(__dirname, "../data/user.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

module.exports = {
    login: (req, res) => {
        res.render("users/login.ejs")
    },
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
        res.render("users/profile.ejs", {user: req.session.userLogged});
    },
    processRegister: (req, res) => {
    const resultValidation = validationResult(req);    
    
    if (resultValidation.errors.length > 0){
        
        return res.render('users/register.ejs', {
            errors: resultValidation.mapped(),
            oldData: req.body
        })
    }

    let userInDB = User.findByField('email', req.body.email);

    if (userInDB){
        return res.render('users/register.ejs', {
            errors: {
                email: {
                    msg: 'Este email ya esta registrado'
                }
            },
            oldData: req.body
        });
    }

    let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        image: req.file.filename
        res.render("users/profile", {user: req.session.userLogged});
    }
    let UserCreated = User.create(userToCreate); 
    //console.log(req.body, req.file);
     
    //  return res.send('ok, se guardo el usuario'); 
     return res.redirect('/users/login')
   // return res.send('ok, pasaron las validaciones y no tienes errores');
    //return res.send(resultValidation);    



}
}