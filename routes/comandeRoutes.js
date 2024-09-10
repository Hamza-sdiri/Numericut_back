const express = require('express');
const router = express.Router();
const comandeController = require("../controllers/comandeController")
router.get('/', comandeController.getAllComandes);
router.get('/:id', comandeController.getComandeById);
router.post('/', comandeController.createComande);
router.put('/:id', comandeController.updateComande);
router.delete('/:id',comandeController.deleteComande);

module.exports = router;