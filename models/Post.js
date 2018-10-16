const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  title:{
    type:String,
    required:true
  },
  description:String,
  photoURL:{
    type:String,
    default:'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png'
  },
  price:{
    type:String,
    required:true
  },
  telefono:Number,
  category:{
    type:String,
    enum:['Todas','Audio y musica','Video','Deportes','Herramientas','Fiestas','Campamento y Excursion'],
    required:true
  },
  comments:[{
    type:Schema.Types.ObjectId,
    ref:'Comment'
  }],
},{
  timestamps:{
    createdAt:"created_at",
    updatedAt:"updated_at"
  }
})

module.exports = mongoose.model('Post',postSchema)