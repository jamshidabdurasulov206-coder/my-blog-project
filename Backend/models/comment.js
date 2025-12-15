const mongoose=require('mongoose')

const commentschema= new mongoose.Schema({
    text: {type: String, required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    

})