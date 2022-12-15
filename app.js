const express=require('express');
const bodyParser=require('body-parser');
require('dotenv').config();
const app=express();
const route=express.Router();
const Router=require('./routes/index');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))
 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    next();
});
app.use('/',Router(route));
app.listen(process.env.port,()=>{
    console.log("listening on port "+process.env.port);
});

app.get("/", (req, res) => {
    res.send("Ikore Backend working,connection created successfully");
});
