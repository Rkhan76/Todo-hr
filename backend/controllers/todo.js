const { Todo } = require('../models/todo')
const { STATUS_CODE } = require('../constant/httpStatusCode')

async function handleAddTodo(req, res) {
  const { title, description, dueDate, auther, isDone } = req.body

console.log(req.body)


  try {
    const newTodo = await Todo.create({
      title,
      description,
      dueDate,
      auther,
      isDone,
    })

    if (!newTodo) {
      return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({ msg: 'Something went wrong while creating todo' })
    }

    return res
      .status(STATUS_CODE.CREATED)
      .json({ msg: 'Todo created successfully' })
  } catch (error) {
    console.error('Error adding Todo:', error)
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Something went wrong with the server' })
  }
}

async function handleUpdateTodo(req, res) {
  const { id, title, description, dueDate, isDone } = req.body

  try {
    const updateTodo = await Todo.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        dueDate,
        isDone,
      },
      { new: true } // This option returns the modified document
    )

    if (!updateTodo) {
      return res.status(STATUS_CODE.NOT_FOUND).json({ msg: 'Todo not found' })
    }

    return res
      .status(STATUS_CODE.OK)
      .json({ msg: 'Todo updated successfully', updateTodo })
  } catch (error) {
    console.error('Error updating Todo:', error)
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Something went wrong with the server' })
  }
}

async function handleDeleteTodo(req, res) {
  const { id } = req.body

  try {
    const deleteTodo = await Todo.findByIdAndDelete(id)

    if (!deleteTodo) {
      return res.status(STATUS_CODE.NOT_FOUND).json({ msg: 'Unable to delete this todo' })
    }

    return res.status(STATUS_CODE.OK).json({ msg: 'Todo deleted successfully' })
  } catch (error) {
    console.error('Error deleting Todo:', error)
    return res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Something went wrong with the server' })
  }
}

module.exports = {
  handleAddTodo,
  handleUpdateTodo,
  handleDeleteTodo,
}
