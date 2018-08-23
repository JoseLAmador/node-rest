require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/user', function (req, res) {
    res.send('Get user!');
});

app.post('/user', function (req, res) {
    let body = req.body;
    if(!body.name){
        res.status(400).json({
            ok:false,
            msj:'name is required'
        })
    }else{
        res.json({
            user:body
        });
    }


});

app.put('/user/:id', function (req, res) {
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/user', function (req, res) {
    res.send('Delete user!');
});



app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!');
});
