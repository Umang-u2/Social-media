const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = require("express").Router();

//verify User
router.post("/verifyUser", async (req,res) => {
    try{
        const accessToken = req.headers["x-access-token"];
    if (!accessToken) 
    res.status(403).json("Please provide the token");

    const decoded = jwt.verify(accessToken, process.env.VERY_SECRET_KEY)
    req.userId = decoded.id;

    const user = await User.findById(req.userId);
    if(!user)
        res.status(404).json("User not found");

    req.user = user;

    }catch(err){
        res.status(500).json("Unauthorized User");
    }
})

