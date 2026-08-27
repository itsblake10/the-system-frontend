/* -------------------------------------------------------------------------- */
/*                                  GAME ITEM                                 */
/* -------------------------------------------------------------------------- */
import "./GameItem.css";
import iconPlaceholder from "../../../public/icon-placeholder.svg";

const GameItem = ({ item, mode, onClick }) => {
  if (!item) {
    return <div className="game-item__empty"></div>;
  }

  const itemIcon = item.image || iconPlaceholder;

  return (
    <button className="game-item" onClick={() => onClick?.(item, mode)}>
      <p className="game-item__name">{item.name}</p>
      <img className="game-item__icon" src={itemIcon} alt={item.name} />
    </button>
  );
};

export default GameItem;
