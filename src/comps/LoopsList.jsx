import { LoopPreview } from "./LoopPreview";

export const LoopsList = ({ loops, handleClick }) => {
  return (
    <div className="loops-list">
      {loops.map((loop, idx) => (
        <LoopPreview loop={loop} key={idx} handleClick={handleClick} />
      ))}
    </div>
  );
};
