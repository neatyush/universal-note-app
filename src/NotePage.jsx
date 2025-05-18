import { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import { v4 as uuidV4 } from "uuid";
import { useForm } from "react-hook-form";
import { jsxs } from "react/jsx-runtime";

const NotePage = () => {
  // use form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = (data) => {
    const newNote = { id: uuidV4(), title: data.notes, body: data.noteBody };
    const newNotes = [...notes, newNote]
    setNotes(newNotes);
    localStorage.setItem("localnotes", JSON.stringify(newNotes))
    reset(); // clear form
    closeModal();
  };

// localstorage>retrive>filter>set state>save 
// 
// 

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("localnotes"));
    if (storedNotes) {
      setNotes(storedNotes);
    } 
  }, []);

  const deleteNote = (id) => {
    const notesOnDisk = JSON.parse(localStorage.getItem("localnotes")) || []
    const newNotes = notesOnDisk.filter((note) => note.id !== id);
    setNotes(newNotes);
    localStorage.setItem("localnotes",JSON.stringify(newNotes));
  };

  return (
    <>
      <MainLayout title="Notes">
        {/* cards */}
        <div className="bg-[#ffffff] p-4 grid grid-cols-2 justify-around gap-4 relative ">
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

              <button
                className="flex items-center justify-center"
                onClick={() => deleteNote(note.id)}
              >
                <img
                  src="/delete-icon.svg"
                  alt="note is empty"
                  className="h-7"
                />
              </button>
            </div>
          ))}
          <button
            className="bg-[#fe6847] shadow-2xl flex justify-center items-center rounded-full absolute p-4 right-2 top-18
             hover:bg-[#fe1111]"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <img src="\add-icon-white.svg" alt="" />
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-amber-950/40 flex items-center justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-[#f5f2f2] p-4 flex flex-col gap-4 fixed rounded-2xl"
            >
              <input
                className="font-bold h-10 shadow-xl rounded-xl p-4 w-xl"
                type="text"
                placeholder="Note heading goes here"
                {...register("notes", {
                  required: "Ops! You need to input note title",
                  maxLength: { value: 20, message: "Yes! There is a limit" },
                })}
              />
              {errors.notes && (
                <p className="text-red-500">{errors.notes.message}</p>
              )}

              <textarea
                className="text h-20 shadow-xl rounded-xl p-4 w-xl"
                placeholder="Notes Appear here"
                {...register("noteBody", {
                  required: "Note Body appears to be empty",
                })}
              />
              {errors.noteBody && (
                <p className="text-red-500">{errors.noteBody.message}</p>
              )}

              <div className="flex gap-2 justify-end">
                <button
                  className="bg-gray-300 p-2 rounded hover:bg-gray-400"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#57b9ffad] p-2 hover:bg-[#57b8ff]"
                  type="submit"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        )}

        {notes.length === 0 && (
          <div className="flex flex-col justify-center items-center bg-white p-4">
            <img src="/empty-note.svg" alt="note is empty" className="h-12" />
            <p>No notes to show</p>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default NotePage;
