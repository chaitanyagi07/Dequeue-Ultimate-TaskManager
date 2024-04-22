const express = require('express');
const router = express.Router();
const ProjectController = require('../Controller/ManageProject.controller');

// Define routes

router.get('/update/:id', ProjectController.getProjectById);
router.get('/:userid/', ProjectController.getall); 
router.get('/name/:name', ProjectController.projectbyname); 
router.post('/:userid/create', ProjectController.createProject);
router.patch('/update/:id', ProjectController.updateProjectById);
router.delete('/delete', ProjectController.deleteall);
router.delete('/:id', ProjectController.deleteProjectById);



module.exports = router;