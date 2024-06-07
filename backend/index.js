const express = require("express")
require('dotenv').config()
const { connectToMongoDB } = require('./db')
const UserRoute = require("./routes/user")
const todoRoute = require("./routes/todo")


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


connectToMongoDB("mongodb://127.0.0.1:27017/Todo-harkirat").then(()=>{
    console.log("successfully connected to mongodb")
})



app.use("/user", UserRoute)
app.use("/todo", todoRoute)
// app.unsubscribe("/view-todo", viewTodo)
// app.use("/markdone-todo", markdoneTodo)


app.listen(port, ()=>{
    console.log(`Your express server is running on ${port} successfully`)
})