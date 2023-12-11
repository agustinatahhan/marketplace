const express = require('express')
const upload = require("../middleware/multer");
const router = express.Router()
const indexController = require('../controllers/index');

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/register', indexController.register);
router.get('/cart', indexController.cart);
router.get('/detail', indexController.detail);

router.get('/create', indexController.getFormProduct);
router.post('/create', upload.single("img"), indexController.postProduct);

router.get('/update', indexController.update);
router.put('/update', indexController.update);


module.exports = router