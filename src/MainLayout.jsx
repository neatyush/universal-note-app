import { Link } from "react-router-dom";
import NotePage from "./NotePage";

const MainLayout = (props) => {
  return (
    <>
      <p className="text-[#ffffff] pt-6 ml-6 text-1xl font-bold">
        Notes By Ayush v- 1.1
      </p>
      <div className="min-w-5/6 bg-[#57b8ff] p-6 m-6 rounded-2xl h-4/5">
        <div className="flex-col justify-around">
          <h1 className="text-3xl text-center">Notes</h1>
          {props.children}

          <div className="flex flex-row justify-between text-2xl border-t-1">
            <Link
              to="/"
              className="bg-[#fff] p-4 hover:bg-[#dedee0fa] grow text-center"
            >
              <button>Notes</button>
            </Link>
            <Link
              to="/task"
              className="bg-[#fff] p-4 hover:bg-[#dedee0fa] grow text-center"
            >
              <button>Task</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
