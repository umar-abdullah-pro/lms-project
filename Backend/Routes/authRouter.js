const express = require("express")
const authRouter = express.Router()

const authController = require("../Controllers/authController")

authRouter.post("/register", authController.postUserRegister)
authRouter.post("/login", authController.postUserLogin)

module.exports = authRouter