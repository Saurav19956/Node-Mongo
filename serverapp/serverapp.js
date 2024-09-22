
const express = require('express');
const app = express();

const port = 3000;

// handle error and send appropiate msg instead of letting aplication crash.

app.use((err,req,res,next) => {
    // set default value for statusb and statusCode if not provided in err object

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    // log err stack to console for debugging
    console.log(err.stack);

    // send err res with formateed err detail
    err.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
    

})

// Get Endpoint

app.get('/',(req,res)=>{
    res.send('This is Endpoint')
})

app.get('/squarenumber/:num',(req,res)=>{
    let x = req.params.num;
    // handling error  if other than number passed

    // if(isNaN(x)){
    //     throw Error('Input is not a Number')
    // }

    if(isNaN(x)){
        next(new Error('Input not a number')) // pass the err to next middleware
        return;
    }
    res.json({squre: x*x})
})

/*
response object 
Error: Input not a number
    at /home/project/serverapp/serverapp.js:31:14
    at Layer.handle [as handle_request] (/home/project/serverapp/node_modules/express/lib/router/layer.js:95:5)
    at next (/home/project/serverapp/node_modules/express/lib/router/route.js:149:13)
    at Route.dispatch (/home/project/serverapp/node_modules/express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (/home/project/serverapp/node_modules/express/lib/router/layer.js:95:5)
    at /home/project/serverapp/node_modules/express/lib/router/index.js:284:15
    at param (/home/project/serverapp/node_modules/express/lib/router/index.js:365:14)
    at param (/home/project/serverapp/node_modules/express/lib/router/index.js:376:14)
    at Function.process_params (/home/project/serverapp/node_modules/express/lib/router/index.js:421:3)
    at next (/home/project/serverapp/node_modules/express/lib/router/index.js:280:10)
*/

// cube of n umber 

app.get('/cubenumber/:num', (req,res,next)=>{
    let x = req.params.num;

    if(isNaN(x)){
        new Error('Invalid Input');
        err.status = 400;
        err.detail = 'The input must be number';
        next(err);
    }else {
        res.json({
            cube: x*x*x
        })
    }

})

// GET endpoint
app.get('/getelementatindex/:mystr/:idx', async (req, res, next) => {
    let mystr = req.params.mystr;
    let idx = req.params.idx;
    if (idx<=mystr.length) {
        let chatrAtIdx = mystr.charAt(idx-1);
        res.json({"Element at index":chatrAtIdx})
    } else {
        next( new Error("Index greater than string length"))
    }
});




app.listen(port,()=>{
    `server is running on http://localhost:${port}`
})