const mongoose = require('mongoose')
mongoose.connect("mongodb://0.0.0.0:27017/weatheAppLogin" )
.then(()=>{
    console.log("Connection Successful")
})
.catch((error)=>{
    console.log(error.message)
})
