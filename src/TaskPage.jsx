import { use, useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import { useForm } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";

const TaskPage = () => {
  const [task, setTask] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  // Form submit logic
  const onSubmit = (data) => {
    if (data.taskname.trim()) {
      const newTask = { taskid: uuidV4(), taskItem: data.taskname };
      const allTasks = [...task, newTask]
      setTask(allTasks);
      window.localStorage.setItem("localtask",JSON.stringify(allTasks))
      reset(); // Clear form
      closeModal();
    }
  };
  // here after tasks are set to a variable, we update the taask state, with a variable which has all previous task added with our newtask input from user,
  // thus no data gets lefts behind
  // then after updating the state, we persists it to local storge with set items , and as rule local storage store in key value pair
  // 

 
  useEffect(()=>{
   let exisitingTask =  JSON.parse(localStorage.getItem("localtask",task));
    if(exisitingTask){
      setTask(exisitingTask)
    }
  },[])
  // this run on first mount or load, this gets data from localstorage and updates the hook of our task
  // the empty array represents on mount, this can also be set to dependency 

const deleteNote = (idToDelete) => {
  const locallyStoredTask  = JSON.parse(localStorage.getItem("localtask",task)) || []
  const updatedTasks = locallyStoredTask.filter((taskItem) => taskItem.taskid !== idToDelete);
  setTask(updatedTasks);
  localStorage.setItem("localtask",JSON.stringify(updatedTasks));
};
// retrive data from local storage 
// if while retreiving from local storage fails the out put then is null and filtering on null causes erros
// so if (in local storage get itme) or || this must be an empty array[]
// the received data is used for deletion, by filtering out if selected id is true, filters if selected id is not ture 
// or equal to the selected id an compare it to ids in task
// now once state is updated
// again store in local storage, conver it to json string and set to local

  return (
    <MainLayout title="Task">
      <div className="bg-[#ffffff] p-4 flex flex-col gap-4 relative">
        {task.map((task) => (
        
            <div
              key={task.taskid}
              className="flex flex-row p-4 rounded-md bg-[#f7f4f2] shadow-md justify-between"
            >
              <p className="p-2 rounded-2xl">{task.taskItem}</p>
             
              <button
              onClick={() => deleteNote(task.taskid)}
            >
              <img src="/delete-icon.svg" alt="note is empty" className="h-7" />
            </button> 
            
            </div>
            
        
        ))}

        <button
          className="bg-[#fe6847] shadow-2xl flex justify-center items-center rounded-full absolute p-4 right-2 top-18 hover:bg-[#fe1111]"
          onClick={openModal}
        >
          <img src="/add-icon-white.svg" alt="Add task" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-amber-950/40 flex items-center justify-center z-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#f5f2f2] p-4 flex flex-col gap-4 fixed rounded-2xl"
          >
            <textarea
              className="text h-20 shadow-xl rounded-xl p-4 w-xl"
              placeholder="Enter your Task"
              {...register("taskname", {
                required: {
                  value: true,
                  message: "The field seems to be empty sir",
                },
              })}
            />
            {errors.taskname && (
              <p className="text-red-500">{errors.taskname.message}</p>
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
                Save Task
              </button>
            </div>
          </form>
        </div>


      )}

    {task.length === 0 && (
          <div className="flex flex-col justify-center items-center bg-white p-4">
            <img src="/empty-list.svg" alt="note is empty" className="h-12" />
            <p>No task to show</p>
          </div>
        )}
    </MainLayout>
  );
};

export default TaskPage;
