const express = require('express')
const upload = require("../middleware/multer");
const router = express.Router()
const indexController = require('../controllers/index');
const { isLoggedIn } = require("../middleware/userLoggedMiddleware");


router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/register', indexController.register);
router.get('/cart', indexController.cart);
// router.get('/detail', indexController.detail);
router.get('/products/detail/:id',isLoggedIn ,indexController.detail);



router.get('/create',isLoggedIn,indexController.getFormProduct);
router.post('/create', upload.single("img"), indexController.postProduct);

router.get('/edit/:id' ,isLoggedIn ,indexController.getEditForm)
router.put('/edit/:id' , upload.single('img') , indexController.putCreate)

router.delete('/delete/:id', indexController.destroy);

module.exports = router;