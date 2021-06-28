const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

//Register user
router.post("/register", async (req,res) => {
    try{
        //Generate new hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Creating new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            /* profilePic: {
              data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
              contentType: 'image/*'
            } */
        })

        const email = await User.findOne({ email: req.body.email });
        const user = await User.findOne({ username: req.body.username });

        //Saving user and generating response along with the user token
        if(!user && !email){
        const user = await newUser.save();
        const userToken = jwt.sign({ id: User._id, name: user.username, email: user.email }, process.env.VERY_SECRET_KEY, {
          expiresIn: parseInt(process.env.TOKEN_EXPIRATION, 10)
        })
        res.status(200).json({
          userToken,
          user
        });
        //When username is already present in the database
        }else if(user!=null){
          res.status(500).json("Username already present! Please register with a new Username or Login with the existing username");
        //When Email ID already present in the Database
        }else {
          res.status(500).json("EmailID already resgistered! Please register with a new EmailID or Login with the existing account");
        }
    } catch (err){
        console.log(err);
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    try {
      //Finding the user in the database
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("User not found, Please check your Email-ID");

      //Validating the password using bcrypt
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")

      //Creating the access token for the user session
      const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.VERY_SECRET_KEY, {
        expiresIn: parseInt(process.env.TOKEN_EXPIRATION, 10)
      })
  
      res.status(200).json({
        _id:user._id,
        token: token,
        message: "User logged in"
      })
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports = router;