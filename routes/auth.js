const passport = require("passport")
const router = require('express').Router()
const jwt = require('jsonwebtoken')

// GET user


//Redirect to user login page
router.get('/google',passport.authenticate('google',{
    scope:['email','profile']
}))

//Retrieve user data

router.get('/google/callback',passport.authenticate('google',{
  session:false,
 // successRedirect:"http://41.37.62.69:3000/nahtais"
}),async (req,res,next)=>{
    user = req.user
    const token = await jwt.sign({user:req.user},'secretkey',{expiresIn:'1d'})
    res.json({user,token})
})

module.exports = router
