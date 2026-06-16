import "./Onboarding.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MmaModeSelection from "../../components/MmaModeSelection/MmaModeSelection";
import QuestObjectiveSelection from "../../components/QuestObjectiveSelection/QuestObjectiveSelection";

const Onboarding = ({ onOpenTaskModal }) => {
  const navigate = useNavigate();

  const [onboardingData, setOnboardingData] = useState({
    mmaMode: "",
    dailyQuests: [],
    weeklyObjectives: [],
  });

  const [step, setStep] = useState(0);
  const steps = [MmaModeSelection, QuestObjectiveSelection];
  const StepComponent = steps[step];

  /* ------------------------------- UPDATE DATA ------------------------------ */
  const updateData = (newData) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  /* ------------------------------- NAVIGATION ------------------------------- */
  const next = () => {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  //   const back = () => {
  //     setStep((s) => Math.max(s - 1, 0));
  //   };

  /* ---------------------------- FIRST / LAST STEP --------------------------- */
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  /* -------------------------------- ADD TASK -------------------------------- */
  const handleAddTask = (type, item) => {
    setOnboardingData((prev) => {
      if (type === "quest") {
        return {
          ...prev,
          dailyQuests: [...prev.dailyQuests, item],
        };
      }

      if (type === "objective") {
        return {
          ...prev,
          weeklyObjectives: [...prev.weeklyObjectives, item],
        };
      }

      return prev;
    });
  };

  /* ------------------------------- REMOVE TASK ------------------------------ */
  //   const handleRemoveTask = (index) => {
  //     setOnboardingData((prev) => ({
  //       ...prev,
  //       questObjectiveSelection: prev.questObjectiveSelection.filter(
  //         (_, i) => i !== index,
  //       ),
  //     }));
  //   };

  /* ------------------------------ HANDLE FINISH ----------------------------- */
  const handleFinish = () => {
    console.log("FINAL DATA:", onboardingData);
    navigate("/home");
  };

  return (
    <main className="onboarding">
      <div className="onboarding__container">
        <h1 className="onboarding__title">INITIAL SETUP</h1>
        <StepComponent
          data={onboardingData}
          updateData={updateData}
          next={next}
          //   back={back}
          isFirst={isFirst}
          isLast={isLast}
          onAddTask={handleAddTask}
          onFinish={handleFinish}
          onOpenTaskModal={onOpenTaskModal}
        />
      </div>
    </main>
  );
};

export default Onboarding;
