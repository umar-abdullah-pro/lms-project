const express = require("express")
const authRouter = express.Router()

const authController = require("../Controllers/userController")

authRouter.post("/register", authController.postUserRegister)
authRouter.post("/login", authController.postUserLogin)

module.exports = authRouter