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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWNmZTQ4ZTQ0YmNmMDBmYTZjOWZjIiwibmFtZSI6IkFsbGVuIEJlZSJ9LCJpYXQiOjE2Mzg1MjYzNjl9.zsVSBm7mppiUryqn1WvYEoMUHIIBY74a7QIjP3aWaoc'
      }
    });

    const json = await response.json();
    console.log(json);
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
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWNmZTQ4ZTQ0YmNmMDBmYTZjOWZjIiwibmFtZSI6IkFsbGVuIEJlZSJ9LCJpYXQiOjE2Mzg1MjYzNjl9.zsVSBm7mppiUryqn1WvYEoMUHIIBY74a7QIjP3aWaoc'
      },
      body: JSON.stringify({title, description, tag})
    });
    

    //logic for adding note.
    const note = {
      "_id": "21qw61aa029249e6d0964cd96b15sdf",
      "user": "61a9cfe48e44bcf00fa6c9fc",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-12-03T11:42:10.085Z",
      "__v": 0
    }

    setnotes(notes.concat(note));
  }
  //Deleting a note
  const deleteNote = async(id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWNmZTQ4ZTQ0YmNmMDBmYTZjOWZjIiwibmFtZSI6IkFsbGVuIEJlZSJ9LCJpYXQiOjE2Mzg1MjYzNjl9.zsVSBm7mppiUryqn1WvYEoMUHIIBY74a7QIjP3aWaoc'
      }
    });
    const json = response.json();  
    console.log(json);

    //logic  for deleting note
    console.log("Deleting the note of id : " + id);
    const newNotes = notes.filter((obj) => { return obj._id !== id });
    setnotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhOWNmZTQ4ZTQ0YmNmMDBmYTZjOWZjIiwibmFtZSI6IkFsbGVuIEJlZSJ9LCJpYXQiOjE2Mzg1MjYzNjl9.zsVSBm7mppiUryqn1WvYEoMUHIIBY74a7QIjP3aWaoc'
      },
      body: JSON.stringify({title, description, tag})
    });
    // const json = response.json();  

    //logic to edit note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;

      }
    }



  }


  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;