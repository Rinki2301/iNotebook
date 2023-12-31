import React, { useContext, useEffect ,useRef, useState} from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context; 
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote]=useState({id:"", etitle:"", edescription:"", etag:""})
  
  const updateNote = (currentNote) => {
    ref.current.click();
    
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }
 
  const handleClick = (e)=>{
    console.log("Updating the note...", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    // editNote(note.id, note.etitle, note.edescription, note.etag);

}
const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}
  return (
    <>
      <AddNote />
      <button  type="button" name="n" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
        <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body"><form className="my-3">
          <div className="form-group mb-3">
            <label htmlFor="etitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle" value={note.etitle} 
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="edescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="edescription" value={note.edescription}
              name="edescription" 
              onChange={onChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="etag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="etag" value={note.etag}
              name="etag" 
              onChange={onChange}
            />
          </div>
        </form></div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          )
        })}
      </div>
      
    </>
  )
}
 
export default Notes;
