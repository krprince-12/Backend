const express=require('express');
const app=express();
const port=3000;
app.get('/',(req,res)=>{
res.send("Hello world");
});
app.get('/about',(req,res)=>{
    res.send("hii");
    });
app.listen(port,()=>{
    console.log("Running successfully");
})
