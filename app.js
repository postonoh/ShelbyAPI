const express = require("express");
const app = express();
const Post = require("./api/model/posts");
const postData = new Post();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get("/api/posts", (req, res) => {
    console.log()
    res.status(200).send(postData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const foundPost = postData.getIndividualBlog(postId);
    if(foundPost){
        res.status(200).send(foundPost);
    } else{
        res.status(400).send("Not Found");
    }
})


app.listen(3000, () => console.log("Listening on http://localhost:3000"));