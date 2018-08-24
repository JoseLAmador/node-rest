require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(require('./routes/usuario'));




//CONEXION BD

mongoose.connect(process.env.URLDB , { useNewUrlParser: true }).then(
    (res) => {
        console.log("Connected to Database Successfully.")
    }
).catch(() => {
    console.log("Conntection to database failed.");
});

//mongoose.connect(, { useNewUrlParser: true }, (err, res)=>{
  //  if(err) throw err;
    //console.log("Base de datos Online");
//});


app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!');
});
