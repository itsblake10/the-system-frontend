import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
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
import Modal from "./components/Modals/Modal/Modal.jsx";
import NavMenu from "./components/NavMenu/NavMenu";
import CopyrightModal from "./components/Modals/CopyrightModal/CopyrightModal.jsx";
import TermsOfServiceModal from "./components/Modals/TermsOfServiceModal/TermsOfServiceModal.jsx";
import DailyQuestListModal from "./components/Modals/DailyQuestListModal/DailyQuestListModal.jsx";
import WeeklyObjectiveListModal from "./components/Modals/WeeklyObjectiveListModal/WeeklyObjectiveListModal.jsx";
import PreviewImageModal from "./components/Modals/PreviewImageModal/PreviewImageModal.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Onboarding from "./pages/Onboarding/Onboarding";
import OnboardingRoute from "./components/OnboardingRoute/OnboardingRoute.jsx";
import { PlayerContext } from "./contexts/PlayerContext.jsx";
import Game from "./pages/Game/Game.jsx";
import Player from "./pages/Player/Player.jsx";
import Account from "./pages/Account/Account.jsx";
import ConfirmActionModal from "./components/Modals/ConfirmActionModal/ConfirmActionModal.jsx";
import InventoryItemModal from "./components/Modals/InventoryItemModal/InventoryItemModal.jsx";
import ShopItemModal from "./components/Modals/ShopItemModal/ShopItemModal.jsx";

function App() {
  /* --------------------------------- MODALS --------------------------------- */
  const [activeModal, setActiveModal] = useState(null);

  const handleModalClose = () => setActiveModal(null);

  const onOpenNavMenu = () => setActiveModal("nav-menu");

  const onOpenCopyright = () => setActiveModal("copyright");

  const onOpenTos = () => setActiveModal("tos");

  const onOpenPreviewImage = () => setActiveModal("preview-image");

  const [selectedItem, setSelectedItem] = useState([]);

  const [onSelectTask, setOnSelectTask] = useState(null);

  const [selectedTasks, setSelectedTasks] = useState([]);

  const [confirmAction, setConfirmAction] = useState(null);

  const [confirmMessage, setConfirmMessage] = useState("");

  const [selectedShopMode, setSelectedShopMode] = useState("buy");

  const [mmaMode, setMmaMode] = useState(false);

  const { player, token, loading } = useContext(PlayerContext);

  /* ----------------------- OPEN ONBOARDING TASK MODAL ----------------------- */
  const onOpenTaskModal = (
    modalType,
    callback,
    currentTasks = [],
    currentMmaMode = false,
  ) => {
    setOnSelectTask(() => callback);
    setSelectedTasks(currentTasks);
    setMmaMode(currentMmaMode);
    setActiveModal(modalType);
  };

  /* --------------------------- OPEN CONFIRM MODAL --------------------------- */
  const onOpenConfirmModal = (action, message) => {
    setConfirmAction(() => action);
    setConfirmMessage(message);
    setActiveModal("confirm");
  };

  /* ------------------------ OPEN INVENTORY ITEM MODAL ----------------------- */
  const onOpenInventoryItem = (item) => {
    setSelectedItem(item);
    setActiveModal("inventory-item");
  };

  /* -------------------------- OPEN SHOP ITEM MODAL -------------------------- */
  const onOpenShopItem = (item, mode) => {
    setSelectedItem(item);
    setSelectedShopMode(mode);
    setActiveModal("shop-item");
  };

  /* --------------- HANDLE SELECT TASK FOR TASK SELECTION MODAL -------------- */
  const handleSelectTask = (task) => {
    if (onSelectTask) {
      onSelectTask(task);
    }
    handleModalClose();
  };

  /* -------------------- HANDLE CONFIRM FOR CONFIRM MODAL -------------------- */
  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }

    handleModalClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route element={<StartLayout />}>
          <Route path="/" element={<Start />} />

          <Route
            path="/signup"
            element={
              token ? (
                <Navigate
                  to={player?.onboarding ? "/home" : "/onboarding"}
                  replace
                />
              ) : (
                <SignUp />
              )
            }
          />
          <Route
            path="/signin"
            element={
              token ? (
                <Navigate
                  to={player?.onboarding ? "/home" : "/onboarding"}
                  replace
                />
              ) : (
                <SignIn />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              <OnboardingRoute>
                <Onboarding onOpenTaskModal={onOpenTaskModal} />
              </OnboardingRoute>
            }
          />
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
                <Inventory onOpenInventoryItem={onOpenInventoryItem} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <Shop onOpenShopItem={onOpenShopItem} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game onOpenTaskModal={onOpenTaskModal} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/player"
            element={
              <ProtectedRoute>
                <Player onOpenPreviewImage={onOpenPreviewImage} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account onOpenConfirmModal={onOpenConfirmModal} />
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

      {activeModal === "quest-list" && (
        <Modal title="DAILY QUEST LIST" onClose={handleModalClose}>
          <DailyQuestListModal
            onSelectTask={handleSelectTask}
            onClose={handleModalClose}
            selectedQuests={selectedTasks}
            mmaMode={mmaMode}
          />
        </Modal>
      )}

      {activeModal === "objective-list" && (
        <Modal title="WEEKLY OBJECTIVE LIST" onClose={handleModalClose}>
          <WeeklyObjectiveListModal
            onSelectTask={handleSelectTask}
            onClose={handleModalClose}
            selectedObjectives={selectedTasks}
            mmaMode={mmaMode}
          />
        </Modal>
      )}

      {activeModal === "preview-image" && (
        <Modal title="IMAGE PREVIEW" onClose={handleModalClose}>
          <PreviewImageModal />
        </Modal>
      )}

      {activeModal === "confirm" && (
        <Modal title="ARE YOU SURE?" onClose={handleModalClose}>
          <ConfirmActionModal
            handleModalClose={handleModalClose}
            handleConfirm={handleConfirm}
            message={confirmMessage}
          />
        </Modal>
      )}

      {activeModal === "inventory-item" && (
        <Modal title="" onClose={handleModalClose}>
          <InventoryItemModal item={selectedItem} />
        </Modal>
      )}

      {activeModal === "shop-item" && (
        <Modal title="" onClose={handleModalClose}>
          <ShopItemModal item={selectedItem} mode={selectedShopMode} />
        </Modal>
      )}
    </>
  );
}

export default App;
