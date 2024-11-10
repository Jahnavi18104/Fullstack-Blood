const mongoose=require("mongoose");

var mongoURL="mongodb+srv://steevemondithoka:steeven.m@cluster0.zd3xi.mongodb.net/Blood"

mongoose.connect(mongoURL);

var connection=mongoose.connection;

connection.on('error',()=>{
    console.log("Database connection failed");
});

connection.on('connected',()=>{
    console.log("Database connection sucessful");
});

module.exports=mongoose
