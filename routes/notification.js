const express = require('express')
const router = express.Router()
const {verifyToken} = require('../helpers/jwt')
const Notification = require('../models/Notification')
const sendMail = require('../helpers/mailer').sendMail

router.post('/new',verifyToken,(req,res,next)=>{
  req.body['owner']=req.user._id
  Notification.create(req.body)
  .then(noti=>{
    // sendMail(element,`Bienvenido a AutoSardina.com`, `Bienvenido ${user.email} ,
    // <p>Agradecemos tu preferencia, tu contraseña inicial es <b>${contraseña}</b>, Loggeate
    // y empieza a disfrutar del verdadero transporte rapido, seguro y barato</p>
    // <h3><a href="http://localhost:3000/login">Dale click aqui para loggearte a tu pagina</a></h3>`)
    res.status(201).json(noti)
  })
  .catch(e=>next(e))
})

router.get('/all',verifyToken,(req,res,next)=>{
  Notification.find({userpost:req.user._id}).populate('post owner')
  .then(notis=>{
    res.status(201).json(notis)
  })
  .catch(e=>next(e))
})

// router.get('/all/noti',verifyToken,(req,res,next)=>{
//   Notification.find({owner:req.user._id}).populate('post userpost')
//   .then(notis=>{
//     res.status(201).json(notis)
//   })
//   .catch(e=>next(e))
// })

module.exports = router