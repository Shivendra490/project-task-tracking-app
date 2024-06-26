import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/register-login/Login";
import Register from "./pages/register-login/Register";
import Board from "./pages/board/Board";
import Analytics from "./pages/analytics/Analytics";
import Setting from "./pages/setting/Setting";

// import BoardProvider from "./store/BoardProvider";
// import AddEditTask from "./pages/add-edit-task/AddEditTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}>
            <Route index element={<Board/>} />
            <Route path="/home/analytics" element={<Analytics/>} />
            <Route path="/home/setting" element={<Setting/>} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
