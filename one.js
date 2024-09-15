// const express=require('express');
// const app=express();
// app.get('/',(req,res)=>{
//     res.send("Hello its connected!!");
// });
// app.get('/prince',(req,res)=>{
//     res.send("Hello its connected!!");
// });
// app.get('/prince/:username',(req,res)=>{
//     res.send(`it is ${req.params.username}`);
// })
// app.listen(3000,()=>{
//     console.log("hii");
    
// });

const express = require('express');
const app = express();

app.use(express.json());
app.get('/user/:id', (req, res, next) => {
    try {
      let userId = req.params.id;
  
      if (!userId) {
        throw new Error('User ID is required');
      }
  
      // If everything is OK
      res.send(`User ID: ${userId}`);
    } catch (err) {
      next(err); // Pass the error to the error-handling middleware
    }
  });
  
// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
