const express = require('express');
const router = express.Router();
const UserController=require('../Controller/User.controller')
// Define routes

router.get('/',UserController.getall);
router.post('/register',UserController.createUser);
router.post('/login',UserController.login);
router.delete('/delete',UserController.deleteall);


module.exports = router;
