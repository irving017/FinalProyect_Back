const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User') 
const uploadCloud = require('../helpers/cloudinary')

router.get('/allproducts',(req,res,next)=>{
  const {category} = req.query
  if(category==='Todas'){
    Post.find()
    .then(posts=>{
      res.status(201).json(posts)
    })
    .catch(e=>next(e))
  }
  else{
    Post.find({category})
    .then(posts=>{
      res.status(201).json(posts)
    })
    .catch(e=>next(e))
  }
})

router.post('/new',verifyToken,uploadCloud.single('photo'),(req,res,next)=>{
  req.body.user = req.user._id
  //console.log(req.user)
  if(req.file)req.body['photoURL']=req.file.url
  Post.create(req.body)
  .then(post=>{
    User.findByIdAndUpdate(post.user,{$push:{post:post._id}})
    .then(user=>{
      //console.log(user)
    })
    res.status(201).json(post)
  })
  .catch(e=>next(e))
})

router.get('/:id',(req,res,next)=>{
  const {id}= req.params
  Post.findById(id).populate('user')
  .then(post=>{
    res.status(201).json(post)
  })
  .catch(e=>next(e))
})

module.exports = router