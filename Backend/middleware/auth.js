const jwt=require("jsonwebtoken");

function authMiddleware(req , res , next){

    const authHeader=req.headers['authorization'];
    if(!authHeader){
        res.status(401).json({message: 'token topilmadi'})
    }
    const token=authHeader.split(" ")[1]
    if(!token){
        res.status(401).json({message: 'token notogri'});
    
    }
    try{

        const decided=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decided;

        next();

    }
    catch(err){
        res.status(401).json({message: "tokin topilmadi yoki yaroqsiz"});
    }  
}
module.exports=authMiddleware;