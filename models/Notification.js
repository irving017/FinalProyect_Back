const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notSchema = new Schema({
    owner:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  post:{
    type:Schema.Types.ObjectId,
    ref:'Post'
  },
  userpost:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  content:{
    type:String
  },
  initDay:String,
  lastDay:String,
  phone:Number
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Notification',notSchema)