const express = require('express');
const router = express.Router();
const cardController = require('../Controller/Card.controller');

// Define routes

router.get('/:userid/',cardController.getall);
router.post('/:userid/create', cardController.createCard);
router.get('/:id', cardController.getCardById);
router.delete('/delete',cardController.deleteall);
router.post('/:id/subtask/create',cardController.createSubtask);
router.delete('/:id',cardController.deleteCardbyId);
router.delete('/:id/subtask/delete',cardController.deleteSubtask);



module.exports = router;
