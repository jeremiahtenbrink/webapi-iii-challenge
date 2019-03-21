const express = require('express');

const Users = require('../data/helpers/userDb');


const {up} = require('../data/migrations/20180404090411_bootstrap');
const db = require('../data/dbConfig.js');

const router = express.Router();

// this only runs if the url has /users
router.get('/', async (req, res) => {
    
    try {
        const users = await Users.get();
        res.status(200).json(users);
    }catch (e) {
        sendError(e, res);
    }
});

const sendError = (e, res) =>{
    res.status(e.status || 500).json({message: e.errorMessage || "Server error."} );
};

const error  =(status, errorMessage = 'Error retrieving the user/s',) => ({
    status,
    errorMessage
});

router.get('/:id', async (req, res) => {
    
    try {
        let id = req.params.id;
        
        const user = await Users.getById(id);
        if(!user){
            throw error(404, `User with that ID of ${id} does not exist.`)
        }
        res.status(200).json(user);
    }catch (e) {
        sendError(e, res);
    }
});

router.post('/', async (req, res) => {
    try {
        if(!req.body.name){
            throw error(400, "Please include a name with your request.");
        }
        
        let result = await Users.insert(req.body);
        
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
        let result = await Users.remove(id);
        if (result) {
            res.status(200).
                json(
                    {message: `The user with the ID of ${id} has been removed.`});
        } else {
            throw error(404, `The user with the id of ${id} was not found.`);
        }
    }catch (e) {
        sendError(e, res);
    }
    
});

router.put('/:id', async (req, res) => {
    try {
        if(!req.params.id){
            throw error(400, "Please send a user ID in the params.");
        }
        let user = await Users.getById(req.params.id);
        if (!user){
            throw error(404, `The user with the ID ${req.params.id} does not exist.`);
        }
    
        user.name = req.body.name || user.name;
        user.image = req.body.image || user.image;
        let result = await Users.update(req.params.id, user);
        if(result){
            res.status(200).json({message: "The user was updated successfully"});
        }else {
            throw error(404, `The user with the ID of ${req.params.id} does not exist`);
        }
    }catch (e){
        sendError(e, req);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        if(!req.params.id){
            throw error(400, "Please include a user ID in the params.");
        }
        let id = req.params.id;
        
        let usersPosts = await Users.getUserPosts(id);
        if(usersPosts){
            res.status(200).json(usersPosts);
        }else {
            throw error(404, "That user or users posts does not exist.");
        }
    }catch {
        sendError(e, req);
    }
});

module.exports = router;
