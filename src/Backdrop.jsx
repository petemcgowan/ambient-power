import React, { useLayoutEffect } from "react";

const Backdrop = ({ activeColor, trackIndex, isPlaying }) => {
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--active-color", activeColor);
  }, [trackIndex, activeColor]);

  return <div className={`color-backdrop ${isPlaying ? "playing" : "idle"}`} />;
};

export default Backdrop;
