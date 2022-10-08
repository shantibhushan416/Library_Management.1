import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import "./Container/FontAwesome/FontAwesome";
import Auth from "./Container/Authentication/Auth";
import Navigation from "./Container/Navigation/NavBar";
import Home from "./Container/Home/Home";
import AddBookForm from "./Container/AddBookForm/AddBookForm";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/add-book/:id" element={<AddBookForm />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
