const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  dueDate:{
    type: Date,
    require: false
  },
  auther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isDone:{
    type: Boolean,
    requied: false,
    default: false
  }
})


const Todo = mongoose.model("Todo", todoSchema)

module.exports = { 
    Todo,
}