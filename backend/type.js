const {z} = require("zod")

const createTodo = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.string().date(),
  author: z.string(),
  isDone: z.boolean().optional()
})

const viewTodo = z.object({
  auther: z.string()
})

const updateTodo = z.object({

})


module.exports = {
    createTodo,
}