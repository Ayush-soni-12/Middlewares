const express =require("express");
const app =express();

// Middlewares == middleware in express are function that come into play after the server receives the request and before the response is sent to the client
// These perform many task
//.execute ANY CODE, make changes to the request and the response objects,end the request-response cycle,call the next middleware function in the stack

app.listen(8000,(req,res)=>{
    console.log("server is started");
  
});

// how to create middlewares
// agr middleware kuch response bejta hai to age ki process ruk jati hai 
//agr hum middleware me path define nhi krege to bo har path ke liye same response bejega
// using next()=> if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function

// app.use((req,res,next)=>{
//     console.log("hello , I am 1st  middleware")
//     // res.send("Bye");
//     next();
// });
// app.use((req,res,next)=>{
//     console.log("hello , I am 2nd  middleware")
//     // res.send("Bye");
//     next();
// });

// app.get("/",(req,res)=>{
//     res.send("Ayush soni");
// });
// ................ Creating utility Middleware ..................................
 // loger --morgan is a npm packgage  
app.use("/random",(req,res,next)=>{
    // hum req ki help se bahut sari information nikal skte hai 
    // agr hum path define krde to middleware kebal usi path ke liye chlega
    // middleware also manipulate req body the create new object in reqbody
     req.time =Date.now();
    console.log(req.method ,req.hostname ,req.path , req.time);
    // res.send("Bye");
    next();
});


app.get("/",(req,res)=>{
    res.send("Ayush soni");
});
app.get("/random",(req,res)=>{
    res.send("Rishi sahu");
});
// hum chaye to end me hum middleware create kr skte hai jab koi bhi path match na ho raha ho
// app.use((req,res)=>{
//     res.send("page not found");
// })


// .......................... Small activity .............................

app.use("/api",(req,res,next)=>{
    let {token} =req.query;
    if(token =="giveaccess"){
     next();
    }
    res.send("access denied")
})
app.get("/api",(req,res)=>{
    res.send("data");
})

