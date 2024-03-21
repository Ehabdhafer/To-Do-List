import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/Authcontext";
import Sidebar from "./components/sidebar";
import Home from "./components/home";
import Signup from "./components/signup";
import SignIn from "./components/SignIn";
import Forgetpass from "./components/forget_pass";
import Resetpass from "./components/reset_pass";
import AddTask from "./components/add_task";
import UpdateTask from "./components/details";
import TodayTasks from "./components/today_tasks";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Sidebar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/forget_pass" element={<Forgetpass />} />
            <Route exact path="/reset_password" element={<Resetpass />} />
            <Route exact path="/addtask" element={<AddTask />} />
            <Route exact path="/details/:id" element={<UpdateTask />} />
            <Route exact path="/today" element={<TodayTasks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
