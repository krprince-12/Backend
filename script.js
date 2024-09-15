const express=require('express');
const app=express();
app.use(function(req,res,next){
    console.log("I am first over here!!");
    next();
});
app.get('/',(req,res)=>{
    res.send("Hello its connected!!");
})
app.listen(3000,()=>{
    console.log("hii");
    
});

