import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNewNote(note) {
    setNotes((notes) => [...notes, note]);
  }

  function deleteNote(id) {
    console.log(id);
    
    setNotes((notes) => [...notes.filter((note, index) => index !== id)]);
  }

  return (
    <div>
      <Header />
      <CreateArea onAddNote={addNewNote}/>
      {notes.map((note, index) => 
      <Note key={index} id={index} title={note.title} content={note.content} onDeleteClick={deleteNote} />)}
      <Footer />
    </div>
  );
}

export default App;
