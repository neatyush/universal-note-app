import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NotePage from "./NotePage";
import TaskPage from "./TaskPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NotePage />}></Route>
          <Route path="/task" element={<TaskPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
