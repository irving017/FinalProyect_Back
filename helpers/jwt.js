const jwt = require ('jsonwebtoken')
const User = require('../models/User')

exports.verifyToken = (req,res,next)=>{
  //1.-checar si llego un token
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorizacion']
  if(!token) return res.status(401).json({message:'No estas loggeado'})
  //2.-Si llego,Checar que el token sea valido
  jwt.verify(token,process.env.TOKEN_GENERATOR,(err,decoded)=>{
    if(!token) return res.status(401).json({message:'Tu token no sirve'})
    //3.-si llego y es valido, regresar si la info que trae el token exista en la base de datos
    User.findById(decoded.userId)
    .then(user=>{
      req.user=user
      next()
    })
  })
  //4.-Si existe lo dejamos pasar con next
}

exports.generateToken = (user)=>{
  return jwt.sign({
    userId:user._id,
    email:user.email
  },
  process.env.TOKEN_GENERATOR,
  {expiresIn:'72 hours'}  
  )
}