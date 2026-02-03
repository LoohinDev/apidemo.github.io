const express = require("express");
const app = express()
const userController = require('../controllers/user.controller')

app.get('/get', userController.getUser)
app.post('/create', userController.createUser)
app.patch('/update/:id', userController.updateUser)
app.delete('/delete/:id', userController.deleteUser)

module.exports = app

