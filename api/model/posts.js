const Path = "./data.json";
const fs = require('fs');

class Post{
    

    get(){
        return this.readData();
    }

    getIndividualBlog (postId){
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postId);
        return foundPost;

    }

    addPost(newPost){
        const currentPost = this.readData();
        currentPost.unshift(newPost);
        this.storeData(currentPost);
    }

    readData(){
        let JsonData =fs.readFileSync(Path);
        let posts = JSON.parse(JsonData);
        return posts
        // console.log(JsonData);
    }

    storeData(rawData){
        let saveData = JSON.stringify(rawData);
        fs.writeFileSync(Path, saveData);
    }


}


module.exports = Post