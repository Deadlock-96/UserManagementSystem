const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

//create, find, update, delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/addUser', userController.form);
router.post('/addUser', userController.createUser);
router.get('/editUser/:id', userController.editUser);
router.post('/editUser/:id', userController.updateUser);
router.get('/:id', userController.deleteUser);
router.get('/viewAllUser/:id', userController.viewAllUsers);

//Router
// router.get('/', (req, res) => {
//     res.render('home');
// })



module.exports = router;