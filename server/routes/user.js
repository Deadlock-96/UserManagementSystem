const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

//create, find, update, delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/addUser', userController.addUser);

//Router
// router.get('/', (req, res) => {
//     res.render('home');
// })



module.exports = router;