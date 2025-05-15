import { useState } from "react";
import MainLayout from "./MainLayout";

const TaskPage = () => {
  const [task, setTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState();

  const taskFn = (e) => {
    setTaskInput(e.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTask = () => {
    if (taskInput.trim()) {
      const newTask = { taskItem: taskInput };
      setTask([...task, newTask]);
      setTaskInput("");
    }
    closeModal();
  };
  return (
    <MainLayout>
      <div className="bg-[#ffffff] p-4 flex flex-col gap-4 relative">
        {task.map((task, index) => (
          <div
            key={index}
            className="flex flex-col p-4 rounded-md bg-[#f7f4f2] shadow-md"
          >
            <p className="p-2 rounded-2xl">{task.taskItem}</p>
          </div>
        ))}

        <button
          className="bg-[#fe6847] shadow-2xl flex justify-center items-center rounded-full absolute p-4 right-4 bottom-4 hover:bg-[#fe1111]"
          onClick={openModal}
        >
          <img src="\add-icon-white.svg" alt="" />
        </button>
      </div>

      {isModalOpen && (
        <div className="z-10 flex items-center justify-center">
          <div className="bg-[#f5f2f2] p-4 flex flex-col gap-4 fixed rounded-2xl">
            <textarea
              onChange={taskFn}
              value={taskInput}
              className="text h-20 shadow-xl rounded-xl p-4 w-xl"
              type="text"
              name="task"
              placeholder="Enter your Task"
            />
            <button
              className="bg-gray-300 p-2 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-[#57b9ffad] p-2 hover:bg-[#57b8ff]"
              type="button"
              onClick={saveTask}
            >
              Save Task
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TaskPage;
