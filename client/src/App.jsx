import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/register-login/Login";
import Register from "./pages/register-login/Register";
import Board from "./pages/board/Board";
import Analytics from "./pages/analytics/Analytics";
import Setting from "./pages/setting/Setting";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/not-found/NotFound";
import ShareTask from "./pages/share-page/ShareTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => toast("Wow so easy!");
  <button onClick={notify}>Notify!</button>;

  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Board />} />
            <Route path="/home/analytics" element={<Analytics />} />
            <Route path="/home/setting" element={<Setting />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/sharetask/:taskId" element={<ShareTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
