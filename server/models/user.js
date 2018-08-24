const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolevalids = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let userSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum:rolevalids
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }

});

//SIN PASSWORD

userSchema.methods.toJSON = function() {
  let userP = this;
  let userObject = userP.toObject();

  delete userObject.password;

  return userObject;
};

userSchema.plugin(uniqueValidator, {message:'{PATH} debe ser unico'});

module.exports = mongoose.model('User', userSchema);