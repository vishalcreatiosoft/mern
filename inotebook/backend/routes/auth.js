const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const {body, validator, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

JWT_SECRET = 'mernstackdevelopment';

//Route 1- /api/auth/createuser to create new user in db.

router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be atleast 5 letters').isLength({min : 5})
    ],
    async(req, res)=>{
        let success = false;
       //If here  error , return bad request and errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            success = false
            return res.status(400).json({success, errors : errors.array()});
        }
        //check whether the user exist with this email id
        try{
        let user = await User.findOne({email : req.body.email})
        if(user){
            success = false
            return res.status(400).json({success,error : 'User with this email is already exist'})
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)


        //creating new user 
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email : req.body.email
          })
        //   .then(user => res.json(user))
        //   .catch(err => {console.log(err)
        // res.json({error : 'Please enter a unique value for email'})})

        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        //console.log(authToken);
        success = true
        res.json({success, authToken});
        
        }catch(e){
            console.log(e.message);
            res.status(500).send('Internal server error.');
        }
})

//Route2- /api/auth/login to login and get authtoken

router.post('/login',[
        body('email','Enter a valid email').isEmail(),
        body('password','Password cannot be blank').exists(),
    ],
    async(req, res)=>{
        let success = false;
        //if there are errors , return bad request and the error
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const {email, password} = req.body;
        try{
            let user = await User.findOne({email});
            //console.log(user);
            if(!user){
                success = false;
                return res.status(400).json({success, error : "Try again with correct creadentials"});
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                success = false
                return res.status(400).json({success, error : "Please try to login with correct credentials"});
            }
            
            const data = {
                 user : {
                     id : user.id,
                     name : user.name,

                 }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authToken});
            //res.json(data);

        }catch(e){
            console.log(e.message);
            res.status(500).send('Internal server error')
        }

    })

// Route 3 - /api/auth/getuser to get user data after login.

router.post('/getuser', fetchuser ,async(req, res)=>{
        try{
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        }catch(e){
            console.log(e.message);
            res.status(500).send('Internal server error')
        }
    })

module.exports = router;
