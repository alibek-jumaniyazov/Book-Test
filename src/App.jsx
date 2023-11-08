import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import { UserProvider } from "./context/UserContext";
import Error from "./pages/notFountPage";

function App() {

  return (
    <UserProvider>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
