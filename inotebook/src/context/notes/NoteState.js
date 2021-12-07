import NoteContext from "./noteContext.js";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  // getNotes function for getting  all notes 
  const getNotes = async() => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchalldata/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json();
    setnotes(json);
  }



  //Adding a new note
  const addNote = async(title, description, tag) => {
    //Api call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
      const note = await response.json();
      setnotes(notes.concat(note));
    
  }


  //Deleting a note
  const deleteNote = async(id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    // eslint-disable-next-line
    const json = await response.json();  

    //logic  for deleting note
    const newNotes = notes.filter((obj) => { return obj._id !== id });
    setnotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call
   
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line
    const json = await response.json();  
    

    //logic to edit note
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setnotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;