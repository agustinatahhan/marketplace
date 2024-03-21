const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { body } = require("express-validator");
const { isLoggedIn } = require("../middleware/userLoggedMiddleware");



const storage = multer.diskStorage({
  // destination: (req, file, cb)  =>{
  //   cb(null, '../public/img/avatars');
  // },
  destination: (req, file, cb) => {
    const absolutePath = path.join(__dirname, "../public/img/avatars");
    cb(null, absolutePath);
  },
  filename: (req, file, cb) => {
    // let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
    // cb(null, fileName);
    if (file) {
      let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
      cb(null, fileName);
    } else {
      cb(null, ""); // O proporciona un nombre de archivo predeterminado si lo deseas
    }
  },
});

const uploadFile = multer({ storage });
const {
  login,
  processLogin,
  profile,
  processRegister,
  getAllUsers
} = require("../controllers/users");

const validations = [
  body("firstName").notEmpty().withMessage("Tienes que escribir el nombre"),
  body("lastName").notEmpty().withMessage("Tienes que escribir el apellido"),
  body("email").isEmail().withMessage("Tienes que escribir un email"),
  //.notEmpty().withMessage('Tienes que escribir un email').bail(),
  // .isEmail().withMessage('Debes escribir un formato de correo valido'),

  body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
  // body("image").custom((value, { req }) => {
  //   let file = req.file;
  //   let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

  //   if (file) {
  //     const fileExtension = path.extname(file.originalname);
  //     if (!acceptedExtensions.includes(fileExtension)) {
  //       throw new Error(
  //         `Las extensiones de archivo permitidas son ${acceptedExtensions.join()}`
  //       );
  //     }
  //   } else {
  //     throw new Error("Tienes que subir una imagen");
  //   }
];

const validationslogin = [
  body("email").isEmail().withMessage("Tienes que escribir un email"),
  body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
];

router.get("/login", login);
router.post("/login", validationslogin,processLogin);

router.post(
  "/register",
  uploadFile.single("image"),
  validations,
  processRegister
);

router.get("/:id", profile);
router.get('/', getAllUsers);

module.exports = router;
