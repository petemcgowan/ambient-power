import { useState, useRef } from "react";
import React from "react";
import tracks from "./tracks";

// Note this is a POC for the user agent problem.  Ironically this shouldn't work, but does in my case.
// Original code found here
// https://arrangeactassert.com/posts/how-to-fix-the-request-is-not-allowed-by-the-user-agent-or-the-platform-in-the-current-context-possibly-because-the-user-denied-permission/

const App = ({ tracks }) => {
  const [audioError, setAudioError] = useState();
  const [trackIndex, setTrackIndex] = useState(0);

  const { title, artist, color, image, audioSrc } = tracks[trackIndex];
  const audioRef = useRef(null);

  //Conclusion audioRef still doesn't work on mobile, even though it's not instantiated initially
  // 1. Put both components in the same app (works)
  // 2.  Try converting working component to audioRef usage (referring to the audio component as an audio ref)
  //

  const handleClick = () => {
    setAudioError(undefined);
    // new Audio(
    //   "https://www.videomaker.com/sites/videomaker.com/files/downloads/free-sound-effects/Free_ExplosionSharp_6048_97_1.wav"
    // )
    audioRef.current = new Audio(audioSrc);
    audioRef.current.play().catch((e) => {
      setAudioError(e);
    });
  };

  return (
    <div>
      <p className="mb-4">Clicking play works everywhere!</p>
      <button
        className="border-2 border-green-700 bg-green-500 text-white rounded-md px-4 py-2 text-center"
        onClick={handleClick}
      >
        Play ▶
      </button>
      {audioError && (
        <div className="mt-4 text-red-600">
          AUDIO ERROR: {audioError.message}
        </div>
      )}
    </div>
  );
};

export default App;
