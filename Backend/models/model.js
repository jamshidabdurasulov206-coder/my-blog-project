const mongoose=require('mongoose')
const UserScheme =new mongoose.Schema({
    name: String,
    email: {type: String , unique: true , required: true},
    password:{type: String ,unique: true },
}, {timestamps: true});

module.exports=mongoose.model('User', UserScheme);