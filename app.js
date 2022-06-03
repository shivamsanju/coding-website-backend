const express = require('express')
const testConnection = require('./config/testConn');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

//Database connection test
testConnection();

// json parser
app.use(express.json());
app.use(cors());


app.listen(process.env.PORT || 3000, (res, err)=>{
    if (err){
        console.log(err)
    } else {
        console.log("server started")
    }
})

//routes
const questions = require('./routes/question.routes');
app.use('/api', questions);