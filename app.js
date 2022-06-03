const express = require('express')
const cors = require('cors');
const path = require("path");
console.log(require("dotenv").config({path: path.resolve(__dirname,'config.env')}));

const app = express();

//Database connection test
const testConnection = require('./config/testConn');
testConnection();

// json parser
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000/','https://shvm-leetcode-frontend.herokuapp.com/']
}));

app.listen(process.env.PORT || 8000, (res, err)=>{
    if (err){
        console.log(err)
    } else {
        console.log("server started")
    }
})

//routes
const user = require('./routes/user.routes');
const questions = require('./routes/question.routes');
app.use('/api', user);
app.use('/api', questions);