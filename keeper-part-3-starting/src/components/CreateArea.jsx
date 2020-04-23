import React, { useState } from "react";

function CreateArea(props) {

  const [note, setNote] = useState({title: "", content: ""})

  function setNoteContent(event) {
    const {name, value} = event.target;
    setNote(note => ({
      ...note,
      [name]: value
    }));
    
  }

  return (
    <div>
      <form onSubmit={(event) => {props.onAddNote(note); setNote({title:"", content:""}); event.preventDefault();}}>
        <input onChange={setNoteContent} name="title" placeholder="Title" value={note.title} />
        <textarea onChange={setNoteContent} name="content" placeholder="Take a note..." rows="3" value={note.content}/>
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
