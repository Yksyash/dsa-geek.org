const jwt = require('jsonwebtoken')

const {port,clientUrl,dbName,dbUsername,dbPassword,secretKey,rabbitmqUrl} = require('../config');

function verifyToken(requiredRole) {
   return (req, res, next) =>{

  const token = req.header('Authorization');

  
  if(!token){
    return res.status(401).json({message:'Unauthorized!'});
  }
  
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
      

    const userRole = decoded.role; // Assuming 'role' is included in the token payload
    // Check user's role against the required role for the route
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
    }

    // If the user has the required role, continue to the protected route
    req.decoded=decoded;
    next();
  });
};
}

module.exports = verifyToken;

