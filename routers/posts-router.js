const express = require('express');

const Posts = require('../data/helpers/postDb');
const Users = require('../data/helpers/userDb');

const router = express.Router();

// this only runs if the url has /posts
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get();
        res.status(200).json(posts);
    }catch (e) {
        sendError(e, res);
    }
});

const sendError = (e, res) =>{
    res.status(e.status || 500).json({message: e.errorMessage || "Server error."} );
};

const error  =(status, errorMessage = 'Error retrieving the post/s',) => ({
    status,
    errorMessage
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        const post = await Posts.getById(id);
        if(!post){
            throw error(404, 'Post with that ID does not exist.')
        }
        res.status(200).json(posts);
    }catch (e) {
        sendError(e, res);
    }
});

router.post('/', async (req, res) => {
    try {
        if(!req.body.text || !req.body.user_id){
            throw error(400, "Please include a user_id and text field with your request.");
        }
        
        let user = await Users.getById(req.body.user_id);
        
        if(!user){
            throw error(404, `The user with a id of ${req.body.user_id} does not exist.`);
        }
        
        let result = await Posts.insert(req.body);
        
        if(result){
            res.status(201).json(result);
        }
    }catch (e){
        sendError(e, res);
    }

});

router.delete('/:id', async (req, res) => {
    try {
    
        let id = req.params.id;
        let result = await Posts.remove(id);
        if (result) {
            res.status(200).
                json(
                    {message: `The post with the ID of ${id} has been removed.`});
        } else {
            throw error(404, `The post with the id of ${id} was not found.`);
        }
    }catch (e) {
        sendError(e, res);
    }

});

router.put('/:id', async (req, res) => {
    try {
        if(!req.body.id){
            throw error(400, "Please send a post ID in the params.");
        }
        let post = await Posts.getById(req.body.id);
        if (post){
            post.user_id = req.body.id || post.user_id;
            post.text = req.body.text || post.text;
            if(Posts.update(req.body.id, post)){
                res.status(200).json({message: "The post was updated successfully"});
            }else {
                throw error(404, `The post with the ID of ${req.body.id} does not exist`);
            }
        }
    }catch {
        sendError(e, req);
    }
});

module.exports = router;
