
// user router for user operations 
const express = require('express');
const router = express.Router();
const User = require('../db/User');

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
router.post('/', async (req, res) => {
    const {userName, color} = req.body;
    if(userName){
        try{
            const user = await User.create({userName, color});
            res.status(201).send(user);
        } catch(err){
            throw new Error(err);
        }
    } else {
        throw new Error('No username provided');
    }
});




module.exports = router;