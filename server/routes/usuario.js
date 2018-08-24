const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();


app.get('/user', function (req, res) {
//    res.send('Get user!');

    let from = req.query.from || 0;
    //Transfromar a numero
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

                        //incluir/excluir campos
    User.find({status:true}, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err,users)=>{
            if(!err){
                User.count({status:true}, (err, count)=>{
                    res.json({
                        ok:true,
                        users,
                        count
                    })
                });

            }else{
                res.status(400).json({
                    ok:false,
                    err
                })
            }
        })
});

app.post('/user', function (req, res) {
    let body = req.body;

    let user = new User({
        name:body.name,
        email:body.email,
        password: bcrypt.hashSync(body.password,10),
        role:body.role
    });

    user.save((err, userDB)=>{
       if(!err){
           res.json({
               ok:true,
               user:userDB
           });

       } else{
           res.status(400).json({
               ok:false,
               err
           })
       }
    });


});

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    //Para no editar pass y google sin underscore
    //delete body.password;
    //delete body.google;

    User.findByIdAndUpdate(id, body, {new:true, runValidators:true}, (err, userDb)=>{
        if(!err){
            res.json({
                ok:true,
                user:userDb
            })
        }else{
            res.status(400).json({
                ok:false,
                err
            })
        }
    });

});

app.delete('/user/:id', function (req, res) {

    let id = req.params.id;

    //User.findByIdAndRemove(id, (err, userDeleted)=>{

    let changeStatus={
        status:false
    };
    User.findByIdAndUpdate(id, changeStatus, {new:true}, (err, userDeleted)=>{

        if(err){
            res.status(400).json({
                ok:false,
                err
            });
        }

        if(!userDeleted){
            return res.status(400).json({
                ok:false,
                err:{
                    message: "User not found"
                }
            });
        }

        res.json({
            ok:true,
            userDeleted
        });

    });
});


module.exports = app;