export const LoopPreview = ({ handleClick, loop }) => {
    return (
      <div
        className={`btn loop-square ${loop.isSelected ? "active" : ""}`}
        onClick={() => handleClick(loop.id)}
      >
        {loop.name}
      </div>
    );
  };
  