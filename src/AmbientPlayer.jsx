import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from "react";
import PlayAudioControl from "./PlayAudioControl";
import Backdrop from "./Backdrop";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  EffectCube,
} from "swiper";
import "swiper/swiper-bundle.css";
import "./styles.css";
import TimePicker from "./components/TimePicker";
import TimerCountdown from "./components/TimerCountdown";
import PickerContextProvider from "./contexts/PickerContext";
// import { PickerContext } from "./contexts/PickerContext";

const AmbientPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  // const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // const { isPlaying, setIsPlaying } = useContext(PickerContext);
  const [swiperTracks, setSwiperTracks] = useState([]);
  const [detailSlides, setDetailSlides] = useState([]);

  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  // const intervalRef = useRef();
  const isReady = useRef(false);

  // const currentPercentage = duration
  //   ? `${(trackProgress / duration) * 100}%`
  //   : "0%";
  // const trackStyling = `
  //   -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  // `;

  // const startTimer = () => {
  //   // Clear any timers already running
  //   clearInterval(intervalRef.current);

  //   intervalRef.current = setInterval(() => {
  //     if (audioRef.current.ended) {
  //       toNextTrack();
  //     } else {
  //       setTrackProgress(audioRef.current.currentTime);
  //     }
  //   }, [1000]);
  // };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  /* Effect is mutating the DOM (via a DOM node ref) and the DOM mutation will change the appearance of the DOM node between the time
  that it is rendered and your effect mutates it, then you don't want to use useEffect. You'll want to use useLayoutEffect.
  And this actually causes user agent permission issues on mobile if using useEffect*/
  useLayoutEffect(() => {
    console.log("useEffect(isPlaying): audioRef:" + audioSrc);
    if (isPlaying) {
      audioRef.current.play();
      // startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useLayoutEffect(() => {
    console.log("useLayoutEffect(trackIndex): audioRef:" + audioSrc);

    audioRef.current.pause();
    console.log("useLayoutEffect, before changing track");
    audioRef.current = new Audio(audioSrc);

    if (isReady.current) {
      // Experimental mobile play test: Start
      // if it's already playing, would it help to not ask to play again?  (for mobile user agent issue)
      // This following block of code automatically plays (which happens on swipe etc).  However mobile doesn't like this and gives the user agent issue.  I likely have to restructure things a bit similar to this:https://arrangeactassert.com/posts/how-to-fix-the-request-is-not-allowed-by-the-user-agent-or-the-platform-in-the-current-context-possibly-because-the-user-denied-permission/
      // if (!isPlaying) {
      //   audioRef.current.play();
      //   setIsPlaying(true);
      // }
      // Experimental mobile play test: End
      // startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect([]]): audioRef:" + audioSrc);
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
    };
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect(swiperTracks)");
    // ////////////////////////////////////////////////////////////////////
    // // array setup (the tracks)
    console.log(
      "useLayoutEffect, swiperTracks:" + JSON.stringify(swiperTracks)
    );
    console.log(
      "useLayoutEffect, swiperTracks[0]:" + JSON.stringify(swiperTracks[0])
    );
    // SwiperSlide setup (aka data in the form Swiper needs it)
    var projectDetailSlides = [];
    tracks.map((track, index) =>
      projectDetailSlides.push(
        <SwiperSlide key={`detailSlide-${index}`} tag="li">
          <div className="track-info">
            <img
              className="artwork"
              src={track.image}
              alt={`track artwork for ${track.title} by ${track.artist}`}
            />
            <h2 className="title">{track.title}</h2>
            <h3 className="artist">{track.artist}</h3>
          </div>
        </SwiperSlide>
      )
    );

    setDetailSlides(projectDetailSlides);
    console.log(
      "useLayoutEffect, projectDetailSlides" +
        JSON.stringify(projectDetailSlides)
    ); ////////////////////////////////////////////////////////////////////
  }, [swiperTracks]);

  return (
    <div className="audio-player">
      <PickerContextProvider>
        <div className="track-info">
          {/* <img
            className="artwork"
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
          <h2 className="title">{title}</h2>
          <h3 className="artist">{artist}</h3> */}
          {/* <PlayAudioControl
            isPlaying={isPlaying}
            // onPrevClick={toPrevTrack}
            // onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          /> */}
        </div>
        <Backdrop
          trackIndex={trackIndex}
          activeColor={color}
          isPlaying={isPlaying}
        />
        <Swiper
          id="controller"
          // onSwiper={setControlledSwiper}
          navigation
          pagination
          loop
          // onSlideNextTransitionStart={() =>
          //   console.log(`onSlideNextTransitionStart, trackIndex${trackIndex}`)
          // }
          // onSlidePrevTransitionStart={() =>
          //   console.log(`onSlidePrevTransitionStart, trackIndex${trackIndex}`)
          // }
          onSlidePrevTransitionStart={toPrevTrack}
          onSlideNextTransitionStart={toNextTrack}
        >
          {detailSlides.map((detailSlide, index) => (
            <div key={`detailSlide-${index}`}>{detailSlide}</div>
          ))}
        </Swiper>
        <div className="track-info">
          <PlayAudioControl
            isPlaying={isPlaying}
            // onPrevClick={toPrevTrack}
            // onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
        </div>
        <TimerCountdown
            isPlaying={isPlaying}
            // onPrevClick={toPrevTrack}
            // onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
        />
        <TimePicker />
      </PickerContextProvider>
    </div>
  );
};

export default AmbientPlayer;
