import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import Modal from "./components/Modal/Modal";
import NavMenu from "./components/NavMenu/NavMenu";
import CopyrightModal from "./components/CopyrightModal/CopyrightModal";
import TermsOfServiceModal from "./components/TermsOfServiceModal/TermsOfServiceModal";

function App() {
  const [activeModal, setActiveModal] = useState(null);

  const handleModalClose = () => setActiveModal(null);

  const onOpenNavMenu = () => setActiveModal("nav-menu");

  const onOpenCopyright = () => setActiveModal("copyright");

  const onOpenTos = () => setActiveModal("tos");

  return (
    <>
      <Routes>
        <Route element={<StartLayout />}>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        <Route
          element={
            <MainLayout
              onOpenNavMenu={onOpenNavMenu}
              onOpenCopyright={onOpenCopyright}
              onOpenTos={onOpenTos}
            />
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/raids" element={<Raids />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/shop" element={<Shop />} />
        </Route>
      </Routes>

      {activeModal === "nav-menu" && (
        <Modal title="MENU" onClose={handleModalClose}>
          <NavMenu />
        </Modal>
      )}

      {activeModal === "copyright" && (
        <Modal title="COPYRIGHT" onClose={handleModalClose}>
          <CopyrightModal />
        </Modal>
      )}

      {activeModal === "tos" && (
        <Modal title="TERMS OF SERVICE" onClose={handleModalClose}>
          <TermsOfServiceModal />
        </Modal>
      )}
    </>
  );
}

export default App;
