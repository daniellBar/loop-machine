import React, { useState, useEffect} from "react";
import { useInterval } from "../hooks/useInterval.js";
import { LoopsList } from "../comps/LoopsList.jsx";
import { Controls } from "../comps/Controls.jsx";
import { loopsService } from "../services/loopsService.js";
import { LoopFilesDisplay } from "../comps/LoopFilesDisplay.jsx";

const DELAY = 8000;

export const Home = () => {
  const [loops, setLoops] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [recordedInfo, setRecordedInfo] = useState([]);

  //runs when component is mounted only
  useEffect(() => {
    //get the loops from loopService and set loops
    const _loops = loopsService.getLoops();
    setLoops(_loops);
  }, []);

  // runs when component mounts and when play/stop buttons are clicked
  useEffect(() => {
    toggleLoopsPlay(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // custom hook to handle setInterval. this hook make sure the 8 seconds
  // audio files will repeat playing
  useInterval(
    () => {
      toggleLoopsPlay();
    },
    isPlaying ? DELAY : null
  );

  // this effect is for playing the recorded actions (the bonus)
  // it is not working correctly. it renders all states properly until
  // the last one. i know why but its to late to think of a better solution.
  // i really wanted to render all the steps to the screen and to play the audio.
  // i could have used some external library to record just the audio i guess but chose not to
  // i am leaving it like this at the moment
  useEffect(() => {
    let renderState;
    let timeBetweenStates;

    if (isPlayingRecorded && recordedInfo.length) {
      const stateToRender = recordedInfo[0];

      timeBetweenStates = stateToRender.endTime - stateToRender.startTime;
      renderState = () => {
        setLoops(stateToRender.loops);
        setIsPlaying(stateToRender.isPlaying);
        setRecordedInfo((prevRecordedInfo) => {
          const [first, ...rest] = prevRecordedInfo;
          return rest;
        });
      };

      const timer = setInterval(() => {
        renderState();
      }, timeBetweenStates);
      return () => clearInterval(timer);
    }
  }, [isPlayingRecorded, recordedInfo]);

  useEffect(() => {
    // this effect wont take place unless we started recording
    // which means in this effect, recordedInfo is updated with only the
    // actions that comes after clicking record button

    if (isRecording) {
      setRecordedInfo((prevRecordedInfo) => {
        const now = new Date().getTime();
        const lastIndex = prevRecordedInfo.length - 1;
        // updating the endTime prop for the last info(the state to render) to now
        prevRecordedInfo[lastIndex].endTime = now;
        return [
          ...prevRecordedInfo,
          // adding the new info and setting its startTime to now
          { loops, isPlaying, startTime: now },
        ];
      });
    }
  }, [isRecording, isPlaying, loops]);

  // according to isPlaying state, toggle audio object property of paused by calling functions play/pause.
  // this action is done for each loop which is checked.
  // paused property automatically set to true once the audio track length is done (8 seconds in our case)
  // this is why this function will also be called inside useInterval hook
  const toggleLoopsPlay = () => {
    loops.forEach((loop) => {
      if (loop.isSelected) {
        isPlaying
          ? controlAudio(loop.audio, "play")
          : controlAudio(loop.audio, "pause");
      }
    });
  };

  // pause or play an audio object
  const controlAudio = (audio, action = "pause") => {
    const actions = ["play", "pause"];
    if (!actions.includes(action)) {
      throw new Error(`action can only be of values: ${actions}`);
    }
    audio.pause();
    audio.currentTime = 0;
    if (action === "play") audio.play();
  };

  // called when a loop is being clicked
  const handleClick = (_id) => {
    const updatedLoops = loops.map((loop) => {
      if (loop.id === _id && loop.isSelected) {
        controlAudio(loop.audio, "pause");
      }
      return loop.id === _id ? { ...loop, isSelected: !loop.isSelected } : loop;
    });
    setLoops(updatedLoops);
  };

  const initLoopsPlay = () => {
    if (isPlaying) return;
    if (loops.some(({ isSelected }) => isSelected)) {
      setIsPlaying(!isPlaying);
    }
  };

  const stopLoopsPlay = () => {
    if (!isPlaying) return;
    setIsPlaying(!isPlaying);
  };

  const recordSession = () => {
    setRecordedInfo((prevRecordedInfo) => {
      // set recorded info for the time when first clicking record
      if (!prevRecordedInfo.length) {
        console.log("start recording");
        return [
          ...prevRecordedInfo,
          { loops, isPlaying, startTime: new Date().getTime(), endTime: null },
        ];
      } else {
        console.log("stop recording");
        const now = new Date().getTime();
        const lastIndex = prevRecordedInfo.length - 1;
        prevRecordedInfo[lastIndex].endTime = now;
        // prevRecordedInfo[lastIndex].last = true;
        return [...prevRecordedInfo];
      }
    });

    // set is recording to call the effect that deals with the recording
    setIsRecording(!isRecording);
  };

  // will be called when clicking play recorded button
  const playRecordedSession = () => {
    setIsPlaying(false);
    setIsPlayingRecorded(!isPlayingRecorded);
  };

  const controls = [
    {
      action: "play",
      func: initLoopsPlay,
      isActive: isPlaying && !isPlayingRecorded,
    },
    { action: "stop", func: stopLoopsPlay, isActive: !isPlaying },
    { action: "record", func: recordSession, isActive: isRecording },
    {
      action: "play_recording",
      func: playRecordedSession,
      isActive: isPlayingRecorded,
    },
  ];

  return (
    <section className="home">
      <div className="loop-machine-container">
        <h1 className="loop-machine-title">Loop Machine</h1>
        {loops && (
          <div className="control-panel">
            <LoopsList loops={loops} handleClick={handleClick} />
            <div className="controls-info-container">
              <Controls controls={controls} />
              <LoopFilesDisplay loops={loops} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
