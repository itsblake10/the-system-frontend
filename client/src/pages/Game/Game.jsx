/* -------------------------------------------------------------------------- */
/*                             GAME SETTINGS PAGE                             */
/* -------------------------------------------------------------------------- */
import "./Game.css";
import { useContext, useState } from "react";
import MmaModeSelection from "../../components/MmaModeSelection/MmaModeSelection";
import QuestObjectiveSelection from "../../components/QuestObjectiveSelection/QuestObjectiveSelection";
import { PlayerContext } from "../../contexts/PlayerContext";
import { savePlayer } from "../../api/authApi";

function Game({ onOpenTaskModal }) {
  const { player, dispatch } = useContext(PlayerContext);

  const [gameSettings, setGameSettings] = useState({
    mmaMode: player.mmaMode,
    dailyQuests: {
      taskList: player.dailyQuests.taskList.map((task) => ({ ...task })),
    },
    mainObjectives: {
      taskList: player.mainObjectives.taskList.map((task) => ({ ...task })),
    },
  });

  /* ----------------------- CHECK GAME SETTINGS CHANGED ---------------------- */
  const mmaChanged = gameSettings.mmaMode !== player.mmaMode;

  const questObjectiveChanged =
    JSON.stringify(
      gameSettings.dailyQuests.taskList.map(({ id, goal }) => ({ id, goal })),
    ) !==
      JSON.stringify(
        player.dailyQuests.taskList.map(({ id, goal }) => ({ id, goal })),
      ) ||
    JSON.stringify(
      gameSettings.mainObjectives.taskList.map(({ id, goal }) => ({
        id,
        goal,
      })),
    ) !==
      JSON.stringify(
        player.mainObjectives.taskList.map(({ id, goal }) => ({ id, goal })),
      );

  /* ------------------------------- UPDATE DATA ------------------------------ */
  const updateData = (newData) => {
    setGameSettings((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  /* ------------------------- UPDATE TASK GOAL AMOUNT ------------------------ */
  const updateTaskGoal = (taskId, newData, type) => {
    setGameSettings((prev) => {
      const key = type === "quest" ? "dailyQuests" : "mainObjectives";

      return {
        ...prev,
        [key]: {
          ...prev[key],
          taskList: prev[key].taskList.map((task) =>
            task.id === taskId ? { ...task, ...newData } : task,
          ),
        },
      };
    });
  };

  /* -------------------------------- ADD TASK -------------------------------- */
  const handleAddTask = (type, item) => {
    setGameSettings((prev) => {
      if (type === "quest") {
        return {
          ...prev,
          dailyQuests: {
            taskList: [...prev.dailyQuests.taskList, item],
          },
        };
      }

      if (type === "objective") {
        return {
          ...prev,
          mainObjectives: {
            taskList: [...prev.mainObjectives.taskList, item],
          },
        };
      }

      return prev;
    });
  };

  /* ------------------------------- REMOVE TASK ------------------------------ */
  const handleRemoveTask = (type, taskId) => {
    setGameSettings((prev) => {
      if (type === "quest") {
        return {
          ...prev,
          dailyQuests: {
            ...prev.dailyQuests,
            taskList: prev.dailyQuests.taskList.filter(
              (task) => task.id !== taskId,
            ),
          },
        };
      }

      if (type === "objective") {
        return {
          ...prev,
          mainObjectives: {
            ...prev.mainObjectives,
            taskList: prev.mainObjectives.taskList.filter(
              (task) => task.id !== taskId,
            ),
          },
        };
      }

      return prev;
    });
  };

  /* ----------------------------- HANDLE SAVE MMA ---------------------------- */
  const handleSaveMma = async () => {
    const updatedPlayer = {
      ...player,
      mmaMode: gameSettings.mmaMode,
    };

    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: updatedPlayer,
    });

    await savePlayer(updatedPlayer);
  };

  /* -------------------- HANDLE SAVE QUESTS AND OBJECTIVES ------------------- */
  const handleSaveQuestObjective = async () => {
    const updatedPlayer = {
      ...player,
      dailyQuests: {
        ...player.dailyQuests,
        ...gameSettings.dailyQuests,
      },
      mainObjectives: {
        ...player.mainObjectives,
        ...gameSettings.mainObjectives,
      },
    };

    dispatch({
      type: "UPDATE_GAME_SETTINGS",
      payload: updatedPlayer,
    });

    await savePlayer(updatedPlayer);
  };

  return (
    <main className="game__page">
      <h1 className="game__title">GAME</h1>
      <div className="game__container">
        <MmaModeSelection
          data={gameSettings}
          updateData={updateData}
          next={handleSaveMma}
          disabled={!mmaChanged}
        />
      </div>
      <div className="game__container">
        <QuestObjectiveSelection
          data={gameSettings}
          onAddTask={handleAddTask}
          onRemoveTask={handleRemoveTask}
          updateTaskGoal={updateTaskGoal}
          onOpenTaskModal={onOpenTaskModal}
          onFinish={handleSaveQuestObjective}
          disabled={!questObjectiveChanged}
        />
      </div>
    </main>
  );
}

export default Game;
