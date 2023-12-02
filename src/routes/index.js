const express = require('express')
const router = express.Router()
const indexController = require('../controllers/index');

router.get('/', indexController.index);
router.get('/login', indexController.login);
router.get('/register', indexController.register);
router.get('/cart', indexController.cart);
router.get('/detail', indexController.detail);

router.get('/create', indexController.create);
router.post('/create', indexController.store);

router.get('/update', indexController.update);
router.put('/update', indexController.update);


module.exports = router