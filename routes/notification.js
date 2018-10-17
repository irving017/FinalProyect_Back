const express = require('express')
const router = express.Router()
const {verifyToken} = require('../helpers/jwt')
const Notification = require('../models/Notification')

router.post('/new',verifyToken,(req,res,next)=>{
  req.body['owner']=req.user._id
  Notification.create(req.body)
  .then(noti=>{
    res.status(201).json(noti)
  })
  .catch(e=>next(e))
})

router.get('/all',verifyToken,(req,res,next)=>{
  Notification.find({owner:req.user._id}).populate('post')
  .then(notis=>{
    res.status(201).json(notis)
  })
  .catch(e=>next(e))
})

module.exports = router