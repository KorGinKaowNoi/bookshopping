const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const users = require('./routes/users');
const fileupload =require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const shopcart = require('./routes/shopcart');
//set to views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
//connect with mysql
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1590',
    database:'bookshop'
});
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('connect to database...')
});
global.db = db;
//parser middleware
app.use(fileupload());
app.use(session({secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:60*1000*30}
}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.messages = require('express-messages')(req,res);
    next();
})
app.use('/users',users);
app.use('/shopcart',shopcart);
//listen to
app.listen(8080,()=>{
    console.log('listen to 8080...');
});
//get
app.get('/',(req,res)=>{
    //all four codes below are for allow this api to access to front end 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    let query = "select * from reader";
    let infomation = req.session.thisuser;
    let allow = req.session.allow;
    console.log(`${allow} ${infomation}`);
    let info = [allow,infomation];
    db.query(query,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(info);
    });
});
