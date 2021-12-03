const express = require('express');
const {body, validationResult, validator}        = require('express-validator');
const router = new express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/notes-model');

//Route 1 -  to fetch all the notes of the user using POST : /api/notes/fetchalldata.

router.get('/fetchalldata', fetchuser, async(req, res)=>{
    
    const notes = await Notes.find({user : req.user.id});
    res.json(notes);
})

//Route 2 - to add new note by the user using POST : /api/notes/addnote

router.post('/addnote', fetchuser, [
    body('title','Enter a valid title').isLength({min : 3}),
    body('description','Enter at leat one word in description').isLength({min : 5}),
    ], async(req, res)=>{
        try{
            const {title, description, tag} = req.body;
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({errors : errors.array()});
            }
            const note = new Notes({
                title, description, tag, user : req.user.id
            })
            const saveNote = await note.save()
            res.json(saveNote);

        }catch(e){
            console.log(e.message);
            res.status(500).send("Internal server error");    
        }

    })

//Route 3 - update an existing note using POST: /api/notes/updatenote . 

router.put('/updatenote/:id', fetchuser, async(req, res)=>{

    const {title, description, tag} = req.body;
    //create a new note object .

    try{
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
   
        //find the note to updated and update it.
        let note = await Notes.findById(req.params.id);
    
        console.log(note);

        if(!note){return res.status(404).send("Not found")}
        
        if(note.user.toString() !== req.user.id){
            res.status(401).send('You dont have access to modify it.');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true})
        res.json({note});

    }catch(e){
        console.log(e.message);
        res.status(500).send('Internal Server Error');
    }

})

//Route 4 - find and delete the note using : /api/notes/deletenote/id

router.delete('/deletenote/:id', fetchuser, async(req, res)=>{

    try{
        //find the note to delete and delete it.
        let note = await Notes.findById(req.params.id);
    
        if(!note){return res.status(404).send("Not found")}
        
        if(note.user.toString() !== req.user.id){
            res.status(401).send('You dont have access to delete it.');
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Successs" : "Note has been deleted", note : note});

    }catch(e){
        console.log(e.message);
        res.status(500).send('Internal Server Error');
    }

})




module.exports = router;
