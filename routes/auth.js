const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport =  require('../helpers/passport')
const {generateToken,verifyToken} = require('../helpers/jwt')
const Post = require('../models/Post')

router.get('/profile',verifyToken,(req,res,next)=>{
  res.send('Esto solo lo ven los usuarios logeados como tu'+req.user.username)
})

router.get('/profile/post',verifyToken,(req,res,next)=>{
  User.findById(req.user._id).populate('post')
  .then(user=>{
    //console.log(user)
    res.status(201).json(user)  
  })
  .catch(e=>next(e))
})

router.post('/login',passport.authenticate('local'),(req,res,next)=>{
  const token =generateToken(req.user)
  res.status(201).json({token,user:req.user})
})

router.post('/signup', (req,res,next)=>{
  User.register(req.body, req.body.password)
  .then(user=>{
      res.status(201).json(user)
  })
  .catch(e=>next(e))
})

router.post('/editInfo',verifyToken,(req,res,next)=>{
  console.log(req.user)
  User.findByIdAndUpdate(req.user._id,{$set:req.body})
  .then(user=>{
    res.status(201).json(user)
  })
  .catch(e=>next(e))
})

router.post('/delete/:id',verifyToken,(req,res,next)=>{
  const {id} = req.params
  Post.findByIdAndRemove(id)
  .then(post=>{
    res.status(201).json(post)
  })
  .catch(e=>next(e))

})

module.exports = router