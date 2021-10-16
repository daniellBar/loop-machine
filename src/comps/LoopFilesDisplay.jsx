export function LoopFilesDisplay({ loops }) {
    const selected = loops.filter(({ isSelected }) => isSelected)
    const isSelectedFound = selected.length !== 0;
    return (
      <div className="loop-files-display-container">
        <div className="title">Selected Loops Files:</div>
        {isSelectedFound && (
          <ul className="selected-loop-files-list">
            {selected.map((loop, idx) => (
              <li key={idx} className="file-name">
                {loop.fileName}
              </li>
            ))}
          </ul>
        )}
        {!isSelectedFound && <div className='not-selected'>No Loops Selected</div>}
      </div>
    );
  }
  