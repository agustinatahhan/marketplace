const express = require('express')
const upload = require("../middleware/multer");
const router = express.Router()
const indexController = require('../controllers/index');
const { body, check } = require('express-validator');
const { isLoggedIn } = require("../middleware/userLoggedMiddleware");

const validations = [
    body("name").isEmail().withMessage("Tienes que escribir un nombre"),
    body("price").notEmpty().withMessage("Tienes que escribir un precio"),
    body("description").notEmpty().withMessage("Tienes que escribir una descripcion"),
    body("sizes").notEmpty().withMessage("Tienes que seleccionar al menos un tamaño"),
    body("quantity").notEmpty().withMessage("Tienes que escribir la cantidad de stock"),
    check('img').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debes subir una imagen');
        }
        return true;
    })
  ];

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/register', indexController.register);
router.get('/cart', indexController.cart);
// router.get('/detail', indexController.detail);
router.get('/products/detail/:id',isLoggedIn ,indexController.detail);



router.get('/create',isLoggedIn,indexController.getFormProduct);
router.post('/create',validations, upload.single("img"), indexController.postProduct);

router.get('/edit/:id' ,isLoggedIn ,indexController.getEditForm)
router.put('/edit/:id' , upload.single('img') , indexController.putCreate)

router.delete('/delete/:id', indexController.destroy);

module.exports = router;