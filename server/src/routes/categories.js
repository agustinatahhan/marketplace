const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categories');


router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);

module.exports = router;