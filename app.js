const express = require("express");
const app = express();
const Post = require("./api/model/posts");
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
const postData = new Post();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});

const getExt = (mimetype) => {
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg';
    }
}

var upload = multer({ storage: storage });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());
app.use('/uploads', express.static('uploads'));

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

app.post("/api/posts",  upload.single('post-image'), (req, res) => {
    const newPost = {        
    "id": `${Date.now()}`,
    "title":  req.body.title,
    "content": req.body.content,
    "post_image": req.file.path,
    "added_date": `${Date.now()}`
    }
    res.send(newPost);
})

app.post('/uploads', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
app.listen(3000, () => console.log("Listening on http://localhost:3000"));