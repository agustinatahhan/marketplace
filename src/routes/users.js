const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {body} = require('express-validator');

const storage = multer.diskStorage({
    // destination: (req, file, cb)  =>{
    //   cb(null, '../public/img/avatars');
    // },
    destination: (req, file, cb) => {
        const absolutePath = path.join(__dirname, '../public/img/avatars');
        cb(null, absolutePath);
      },
    filename: (req, file, cb) => {
        // let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        // cb(null, fileName);
        if (file) {
            let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
            cb(null, fileName);
        } else {
            cb(null, ''); // O proporciona un nombre de archivo predeterminado si lo deseas
        }
    }
})

const uploadFile = multer ({storage});
const {login, processLogin, profile, processRegister} = require("../controllers/users");
const {login, processLogin, profile} = require("../controllers/users");
const userLoggedMiddleware = require("../middleware/userLoggedMiddleware");

const validations = [
    body('firstName').notEmpty().withMessage('Tienes que escribir el nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir el apellido'),
    body('email')
    .notEmpty().withMessage('Tienes que escribir un email'),
        //.notEmpty().withMessage('Tienes que escribir un email').bail(),
        // .isEmail().withMessage('Debes escribir un formato de correo valido'),
    
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if(file){
            const fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join()}`);
            }
        }else{
            throw new Error('Tienes que subir una imagen');
        }

        

        return true   
    }

    )
];

router.get("/login", login);
router.post("/login", processLogin);

router.post('/register', uploadFile.single('image'), validations,  processRegister);

 router.get("/profile", userLoggedMiddleware, profile);


module.exports = router;
