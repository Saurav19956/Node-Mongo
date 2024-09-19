
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'secret';



app.use(express.json());

// Sample user data (Replace with your database or actual authentication logic)
const users = [];

// registeration

app.post('/register',(req,res)=>{
  const {username, password} =  req.body;

  // check if username exist
   const existingUser =  users.find((u)=> u.username === username);
    if(existingUser){
        return res.status(400).json({message: "user already exist "})
    }
        
    // add new user  into db or  users array

    const newUser = {
    id: users.length +1,
    username,
    password 
}

    users.push(newUser);

    res.status(201).json({message: 'used added'})
   
})


// login Api

app.post('/',(req,res)=>{
    const {username, password} = req.body;

    // find user by username and pass
    const user = users.find((u)=>u.username === username && u.password === password);

    if(user){
        // user authemnticatred, and generate token
       const token =  jwt.sign({id: user.id, username: users.username }, secretKey);
        res.json({token})
    }else {
        res.status(401).json({message: "unauthorised user/ Invalid credential "})
    }
})

 // protectecting routes ex(dashboard)

 app.get('/dashboard', verifyToken,(req,res)=>{
   // Return dashboard data or user-specific information
   res.json({ message: 'Welcome to the Customer Portal!' });
 })


 // middleware to verify the token

 function verifyToken(req,res,next){
    //const token = req.header.authorization
    const token = req.header['authorization']

    if(!typeof token !== 'undefined'){
        jwt.verify(token, secretKey,(err, authData)=>{
            if(err) { res.sendStatus(403)}
            else { 
                req.authData = authData
                next();
            }
        })
    } else {
        res.sendStatus(401)
    }
 }

 // Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

