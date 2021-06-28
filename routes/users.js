const router = require("express").Router();

router.get("/", (req,res) => {
    res.send("Hey! Welcome to our Page");
})

module.exports = router