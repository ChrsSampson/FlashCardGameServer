
// user router for user operations
const express = require('express');
const router = express.Router();
const User = require('../db/User');
const Response = require('../lib/Response');


// get one by id
router.get('/:id', async(req, res) => {
    const {id} = req.params;
    if(id){
        try{
            const user = await User.getOneById(id);
            res.status(200).send(user);
        } catch(err){
            throw new Error(err);
        }
    } else {
        throw new Error('No id provided');
    }
});

// create one user
// required fields: userName - display name
// optional fields: color - user accent color
router.post('/', async (req, res, next) => {
    const {username, color} = req.body;
    if(username){
        try{
            const user = await User.create(username, color );
            const response = new Response(201, 'User created', user);
            response.send(res);
        } catch(err){
            const response = new Response(400, err.message, null);
            response.send(res);
        }
    } else {
        throw new Error('No username provided');
    }
});

router.delete('/:username', async (req, res, next) => {
    const {username} = req.params;
    if(username){
        try{
            const user = await User.deleteByUsername(username);
            const response = new Response(200, 'User deleted', user);
            response.send(res);
        } catch(err){
            const response = new Response(400, err.message, null);
            response.send(res);
        }
    } else {
        throw new Error('No username provided');
    }
});

router.patch('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {username, color} = req.body;
    if(id){
        try{
            const user = await User.updateById(id, {username, color});
            const response = new Response(200, 'User updated', user);
            response.send(res);
        } catch(err){
            const response = new Response(400, err.message, null);
        }
    } else {
        throw new Error('No id provided');
    }
});

// throw 400 error if invalid route
router.use((req, res, next) => {
    const response = new Response(400, 'Unsupported Method/Route', null);
    response.send(res);
});

module.exports = router;