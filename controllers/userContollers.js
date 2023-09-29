const bcrypt = require('bcrypt')
const userModel = require("../models/userSchema");
const session = require('express-session');
const rounds = 10;
var requests = require('requests');

const securePassword = async(password)=>{
    const securepassword = await bcrypt.hash(password , rounds)
    return securepassword
}

const createData = async(username , email , password)=>{
    try {
        const newUserData =  new userModel({
            name : username,
            email : email,
            password : await securePassword(password)
        })
        const result = await newUserData.save();
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }
}

const userHomeRender = async(req , res)=>{
    try {
        res.render('index')
        
    } catch (error) {
        console.log(error.message)
    }
}

const userLoginrender = async(req , res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}
const userRegRender = async(req , res)=>{
    try{
        res.render("reg")
    }catch (error) {
        console.log(error.message)
    }
}

const userReg = async(req ,res)=>{
    try {
        
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password !== cpassword){
            res.render("reg" , {message : "Passwords do not match"})
        }
        else{
            const username = req.body.name;
            const email = req.body.email;
            const findEmail =  await userModel.findOne({email:email})
            console.log(findEmail)
            if(!findEmail){

                createData(username , email , password)
                res.redirect("login")
            }
            else{
                res.render("reg" , {message : "Email Existed"})
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}

const userLogin = async(req , res)=>{
    try {
        const email = req.body.email;
        const emailFind = await userModel.findOne({email :  email})
        console.log(emailFind._id)
        if(!emailFind){
            res.render("login" , {message : "invalid details"})
        }
        else{

            const password =  req.body.password;
            
            const result = await bcrypt.compare(password , emailFind.password)
            if(!result){
                res.render("login" , {message : "invalid details"})
            }
            else{
                req.session.user_id = emailFind._id;

                // if(!req.session.count){
                //     req.session.count = 1
                // }
                // else{
                //     req.session.count += 1
                // }
                // console.log(req.session.count)
                res.redirect("weather")
            }
        }

    } catch (error) {
        console.log(error.message)
    }
}


const weatherRender = async(req , res)=>{
    res.render("weather")
}


const getWeather = async(req , res)=>{
    try {
        const city = req.body.city;
        console.log(city)
        requests(`http://api.weatherstack.com/current?access_key=55106dfb403764e6242f6209f65ecfdd&query=${city}`)
        .on('data', function (chunk) {
            const objData = JSON.parse(chunk)
            const arrData = [objData]
            const acctualData = arrData[0].current.temperature
            console.log(acctualData)
            res.render("weather" , {acctualData : acctualData , city : city})
        })
        .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
 
        console.log('end');
        
});
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    userHomeRender,
    userLoginrender,
    userRegRender,
    userReg,
    userLogin,
    weatherRender
    ,
    getWeather
}
