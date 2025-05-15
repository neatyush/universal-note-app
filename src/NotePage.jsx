import { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import { v4 as uuidV4 } from "uuid";
import Form from "./Form";

const NotePage = () => {

  const defaultNote = {
    "id": "",
    "title": "",
    "body": "",
  }

  const [note, setNote] = useState(defaultNote)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  const closeModal = () => setIsModalOpen(false);

  const saveNote = () => {
    if (note.title !== "" && note.body !== "") {
      const newNote = { id: uuidV4(), title: note.title, body: note.body };
      
      setNotes([...notes, newNote]);
      setNote(defaultNote)
    } else {
      alert("Donot leave a field empty");
    }
    closeModal();
  };

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])

  useEffect(()=>{
    const storedNotes = localStorage.getItem("notes");
    if(storedNotes){
      setNotes(JSON.parse(storedNotes));
    }
  },[])

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }

  // delete the current id and generate new notes index
  return (
    <>
      <MainLayout>
        {/* cards */}
        <div className="bg-[#ffffff] p-4 grid grid-cols-2 justify-around gap-4 relative">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col p-4 rounded-md bg-[#f7f4f2] shadow-md"
            >
              <input
                value={note.title}
                className="font-bold"
                maxLength="40"
                type="text"
                readOnly
              />
              <input
                value={note.body}
                className="text h-auto"
                type="text"
                readOnly
              />
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))}
          <button
            className="bg-[#fe6847] shadow-2xl flex justify-center items-center rounded-full absolute p-4 right-4 bottom-4 hover:bg-[#fe1111]"
            onClick={()=>{
              setIsModalOpen(true)
            }}
          >
            <img src="\add-icon-white.svg" alt="" />
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-amber-950/40 flex items-center justify-center">
            <div className="bg-[#f5f2f2] p-4 flex flex-col gap-4 fixed rounded-2xl">
              <input
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                value={note.title}
                className="font-bold h-10 shadow-xl rounded-xl p-4 w-xl"
                type="text"
                name="notes"
                placeholder="Note heading goes here"
              />
              <textarea
                onChange={(e) => setNote({ ...note, body: e.target.value })}
                value={note.body}
                className="text h-20 shadow-xl rounded-xl p-4 w-xl"
                type="text"
                name="notes"
                placeholder="Notes Appear here"
              />
              <button
                className="bg-gray-300 p-2 rounded hover:bg-gray-400"
                onClick={()=>{
                  setIsModalOpen(false)
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#57b9ffad] p-2 hover:bg-[#57b8ff]"
                type="button"
                onClick={saveNote}
              >
                Save Note
              </button>
            </div>
          </div>
        )}

        {notes.length === 0 && (
          <div className="flex flex-col justify-center items-center  bg-white p-4">
            <img src="/empty-note.svg" alt="note is empty" className="h-12" />
            <p>Add Notes</p>
          </div>
        )}
      </MainLayout>
      <Form></Form>
    </>
  );
};

export default NotePage;
