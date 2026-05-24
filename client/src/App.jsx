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
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Modal from "./components/Modal/Modal";
import NavMenu from "./components/NavMenu/NavMenu";
import CopyrightModal from "./components/CopyrightModal/CopyrightModal";
import TermsOfServiceModal from "./components/TermsOfServiceModal/TermsOfServiceModal";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  /* --------------------------------- MODALS --------------------------------- */
  const [activeModal, setActiveModal] = useState(null);

  const handleModalClose = () => setActiveModal(null);

  const onOpenNavMenu = () => setActiveModal("nav-menu");

  const onOpenCopyright = () => setActiveModal("copyright");

  const onOpenTos = () => setActiveModal("tos");
  /* ------------------------------------ . ----------------------------------- */

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
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/raids"
            element={
              <ProtectedRoute>
                <Raids />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {activeModal === "nav-menu" && (
        <Modal title="MENU" onClose={handleModalClose}>
          <NavMenu handleModalClose={handleModalClose} />
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
