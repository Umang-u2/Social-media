const router = require("express").Router();

router.get("/", (req,res) => {
    res.send("Hey! Welcome User Router..");
})

module.exports = router