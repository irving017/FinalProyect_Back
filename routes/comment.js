const express = require('express')
const router = express.Router()
const {verifyToken} = require('../helpers/jwt')
const Comment = require('../models/Comment')
const Post = require('../models/Post')

router.post('/new',verifyToken,(req,res,next)=>{
  req.body['owner']=req.user._id
  Comment.create(req.body)
  .then(comment=>{
    Post.findByIdAndUpdate(comment.post,{$push:{comments:comment._id}})
    .then(post=>{
      res.status(201).json(post)
    })
    .catch(er=>nect(er))
  })
  .catch(e=>next(e))
})

router.get('/all/:id',(req,res,next)=>{
  const {id}=req.params
  Comment.find({post:id}).populate('owner')
  .then(comments=>{
    res.status(201).json(comments)
  })
  .catch(e=>next(e))
})

router.get('/user',verifyToken,(req,res,next)=>{
  Comment.find({userpost:req.user._id}).populate('owner post')
  .then(comments=>{
    res.status(201).json(comments)
  })
  .catch(e=>next(e))
})

module.exports = router