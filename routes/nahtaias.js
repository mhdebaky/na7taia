const router = require('express').Router()

router.get('/',(req, res)=>{
    res.send({status:"successful",
message:"you have accessed nahtais"})
})

module.exports = router