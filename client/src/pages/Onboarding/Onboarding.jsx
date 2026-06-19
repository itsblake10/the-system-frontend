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

  /* ------------------------- UPDATE TASK GOAL AMOUNT ------------------------ */
  const updateTaskGoal = (taskId, newData, type) => {
    setOnboardingData((prev) => {
      const key = type === "quest" ? "dailyQuests" : "weeklyObjectives";

      return {
        ...prev,
        [key]: prev[key].map((task) =>
          task.id === taskId ? { ...task, ...newData } : task,
        ),
      };
    });
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
  const handleRemoveTask = (type, taskId) => {
    setOnboardingData((prev) => {
      if (type === "quest") {
        return {
          ...prev,
          dailyQuests: prev.dailyQuests.filter((task) => task.id !== taskId),
        };
      }

      if (type === "objective") {
        return {
          ...prev,
          weeklyObjectives: prev.weeklyObjectives.filter(
            (task) => task.id !== taskId,
          ),
        };
      }

      return prev;
    });
  };

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
          updateTaskGoal={updateTaskGoal}
          next={next}
          //   back={back}
          isFirst={isFirst}
          isLast={isLast}
          onAddTask={handleAddTask}
          onRemoveTask={handleRemoveTask}
          onFinish={handleFinish}
          onOpenTaskModal={onOpenTaskModal}
        />
      </div>
    </main>
  );
};

export default Onboarding;
