/* -------------------------------------------------------------------------- */
/*                                  HOME PAGE                                 */
/* -------------------------------------------------------------------------- */
import PlayerStats from "../../components/PlayerStats/PlayerStats";
import DailyQuests from "../../components/DailyQuest/DailyQuests";
import MainObjectives from "../../components/MainObjectives/MainObjectives";
import "./Home.css";
import LevelProgress from "../../components/LevelProgress/LevelProgress";

function Home() {
  return (
    <main className="home__page">
      <h1 className="home__title">HOME</h1>
      <PlayerStats />
      <DailyQuests />
      <MainObjectives />
      <LevelProgress />
    </main>
  );
}

export default Home;
