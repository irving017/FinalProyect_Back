const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  name:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  phone:Number,
  post:[{
    type:Schema.Types.ObjectId,
    ref: 'Post'
  }],
  paymethod:String,
  addres:String
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

userSchema.plugin(passportLocalMongoose, {usernameField:"email"})
module.exports = mongoose.model('User',userSchema)