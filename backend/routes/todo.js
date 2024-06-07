const express = require('express')
const { checkAuth } = require("../middleware/auth")
const {
  handleAddTodo,
  handleUpdateTodo,
  handleDeleteTodo,
} = require('../controllers/todo')

const router = express.Router()

router.post('/add-todo', checkAuth, handleAddTodo)
router.post('/update-todo', checkAuth, handleUpdateTodo)
router.delete('/delete-todo', handleDeleteTodo)
// router.get('/view-todo', handleViewTodo);

module.exports = router
