const taskController = require('../controllers/taskController.js')
const authMiddleware = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()



router.get('/', authMiddleware, taskController.getTasks)
router.post('/', authMiddleware, taskController.createTask)

router.get('/:id', authMiddleware, taskController.getTask);
router.get('/:id', authMiddleware, taskController.getTask);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);



module.exports = router