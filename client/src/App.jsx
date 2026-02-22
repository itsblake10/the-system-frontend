import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import StartLayout from "./layouts/StartLayout";
import Home from "./pages/Home/Home";
import Raids from "./pages/Raids/Raids";
import Inventory from "./pages/Inventory/Inventory";
import Shop from "./pages/Shop/Shop";
import Start from "./pages/Start/Start";
import SignUp from "./pages/Signup/Signup";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route element={<StartLayout />}>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/raids" element={<Raids />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/shop" element={<Shop />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
