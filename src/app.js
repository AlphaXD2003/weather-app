const express = require('express')
const app = express()
const path = require('path')
const hbs =require('hbs')
const bodyParser = require('body-parser')
//used js
app.use(express.json())
require("../db/conn")


//body parser
app.use(bodyParser.urlencoded({extended : false}))
//static path
const staticPath = path.join(__dirname , "../public")
app.use(express.static(staticPath))

//view engine
app.set("view engine" , "hbs")
const viewPath = path.join(__dirname , "../templates/views")
app.set("views" , viewPath)

//partial
const partialPath = path.join(__dirname , "../templates/partials")
hbs.registerPartials(partialPath)
//config
const config = require("../config/config")
//session
const session = require('express-session')
app.use(session(
    {
    secret : config.sesssionSecret,
    resave: true,
    saveUninitialized: true
    }
    ));

//user router
const userRouter = require("../routers/userRouter")
app.use(userRouter)

const port = process.env.PORT || 8000;

app.listen(port , ()=>{
    console.log("Listening to the port " , port)
})