export function Controls({controls}){
    return(
        <div className="controls">
        {controls.map((control, idx) => (
          <div
            key={idx}
            className={`control-btn-container ${control.action} ${
              control.isActive ? "active" : ""
            }`}
          >
            <div className="btn" onClick={control.func}></div>
          </div>
        ))}
      </div>
    )
}