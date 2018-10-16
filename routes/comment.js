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
  })
  .catch(e=>next(e))
})

module.exports = router