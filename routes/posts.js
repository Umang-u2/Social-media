const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Post Creation
router.post("/", async (req, res) => {
    try{
        const newPost = new Post(req.body);
        const title = req.body.title;
        const savePost = await newPost.save();
        res.status(200).json({
            message: "Posted Successfully!",
            title
        });
    }catch(err) {
        res.status(500).json(err);
    }
});

//Post Update
router.put("/:id", async (req,res) => {
    try{
    const post = await Post.findById(req.params.id);
    //To check if the user is not updating other users post.
    if(post.userId === req.body.userId){
        await post.updateOne({$set:req.body});
        res.status(200).json("Your Post was updated successfully!");
    }else{
        res.status(403).json("Sorry! You can't just sneak around other people's posts..")
    }
}catch(err){
    res.status(500).json(err);
}
})

//Post Deletion
router.delete("/:id", async (req,res) => {
    try{
    const post = await Post.findById(req.params.id);
    //To check if the user is not deleting other users post.
    if(post.userId === req.body.userId){
        await post.deleteOne({$set:req.body});
        res.status(200).json("Congratulations! Your post was deleted.. ");
    }else{
        res.status(403).json("Sorry! You can't just delete other people's posts..")
    }
}catch(err){
    res.status(500).json(err);
}
})

//get a post using Post ID
router.get("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

//get all posts created by a particular user
router.get("/timeline/all", async (req,res) => {
    try{
        const loggedUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: loggedUser._id });
        res.status(200).json(userPosts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;