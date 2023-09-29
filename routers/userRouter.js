const express = require('express')
const userRoute = express()

//router
const userRouter = new express.Router()
//config
const config = require("../config/config")


const userController = require("../controllers/userContollers")
const userLogin = require("../middlewares/userLogin")

userRouter.get("/" , userController.userHomeRender)
userRouter.get("/login", userLogin.isLogout , userController.userLoginrender)
userRouter.get("/reg" , userController.userRegRender)
userRouter.get("/weather" , userLogin.isLogin ,userController.weatherRender)
// userRouter.get("/weather"  ,userController.weatherRender)

//post
userRouter.post("/reg" ,userController.userReg )
userRouter.post("/login" ,userController.userLogin )
userRouter.post("/weather" , userController.getWeather)

module.exports = userRouter