import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/register-login/Login";
import Register from "./pages/register-login/Register";
import Board from "./pages/board/Board";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
