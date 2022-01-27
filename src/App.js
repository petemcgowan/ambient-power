import "./App.css";
import "./style.css";
import React, { useState, useRef, useLayoutEffect } from "react";

function App() {
  const [isToggledOn, setIsToggledOn] = useState(false);

  function handleToggleButton() {
    setIsToggledOn(!isToggledOn);

    // this.setState((prevState) => ({
    //   isToggledOn: !prevState.isToggledOn,
    // }));
  }

  return React.createElement(PowerButton, {
    isToggledOn: isToggledOn,
    onToggleButton: handleToggleButton,
  });
}

function PowerButton({ isToggledOn, onToggleButton }) {
  // prettier-ignore
  const audioRef = useRef<HTMLAudioElement>(null);

  // One of the key differences is that useLayoutEffect gets executed right after a React component render lifecycle, and before useEffect gets triggered.  It's specifically for DOM manipulation like useRef
  useLayoutEffect(() => {
    console.log();
    if (audioRef.current) {
      if (isToggledOn) {
        audioRef.current.load();
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isToggledOn]);

  return (
    <div>
      <button
        className={`power_button ${isToggledOn ? "is-active" : ""}`}
        onClick={onToggleButton}
      >
        <div className="power_button__icon">
          <span className="power_button__icon__arrow"></span>
        </div>
      </button>
      <p className="power_status">{isToggledOn ? "On" : "Off"}</p>

      <audio
        ref={audioRef}
        src="https://underdownloads.s3.amazonaws.com/Brown+900Hz+LC+Noise+MOD.mp3"
        type="audio/mpeg" //this causes a typescript error
      />
    </div>
  );

  // TODO  Convert this to JSX
  // If it doesn't work, can I make it more readable with variables?  Or partial JSX?
  // TODO  Add the audio element here
  // return React.createElement(
  //   "div",
  //   null,
  //   React.createElement(
  //     "button",
  //     {
  //       className: "power_button " + (isToggledOn ? "is-active" : ""),
  //       onClick: onToggleButton,
  //     },
  //     React.createElement(
  //       "div",
  //       { className: "power_button__icon" },
  //       React.createElement("span", { className: "power_button__icon__arrow" })
  //     )
  //   ),

  //   React.createElement(
  //     "p",
  //     { className: "power_status" },
  //     isToggledOn ? "On" : "Off"
  //   )
  // );
  //"https://underdownloads.s3.amazonaws.com/Brown+900Hz+LC+Noise+MOD.mp3"
  //<div className="container"></div>
}

export default App;
