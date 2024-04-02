const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
    req.session.destroy((err)=>{
      if(err){
        console.error('Error destroying session:', err);
        return res.status(500).json({message: 'Server error'});
      }else{
        return res.clearCookie('myCookie').status(200).json({message:'Logout Successful'});
      }
    })
  });

module.exports = router;