const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
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
    type:String,
    required:true
  }
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Comment',commentSchema)