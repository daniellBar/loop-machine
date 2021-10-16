import bass_warwick from "../assets/audio/Bass Warwick heavy funk groove on E 120 BPM.mp3"
import electric_guitar from "../assets/audio/electric guitar coutry slide 120bpm - B.mp3";
import future_funk from "../assets/audio/120_future_funk_beats_25.mp3";
import groove_b from "../assets/audio/GrooveB_120bpm_Tanggu.mp3";
import pas_3_groove from "../assets/audio/PAS3GROOVE1.03B.mp3";
import silent_star from "../assets/audio/SilentStar_120_Em_OrganSynth.mp3";
import stompy_slosh from "../assets/audio/FUD_120_StompySlosh.mp3";
import stutter_breakbeats from "../assets/audio/120_stutter_breakbeats_16.mp3";
import maze_politics from "../assets/audio/MazePolitics_120_Perc.mp3";

export const loopsService = {
  getLoops,
};

const loopsNames = [
  {
    name: "Bass Warwick",
    audioFile: bass_warwick,
    fileName: "Bass Warwick heavy funk groove on E 120 BPM.mp3",
  },
  {
    name: "Electric Guitar",
    audioFile: electric_guitar,
    fileName: "electric guitar coutry slide 120bpm - B.mp3",
  },
  {
    name: "Future Funk",
    audioFile: future_funk,
    fileName: "120_future_funk_beats_25.mp3",
  },
  {
    name: "Groove B",
    audioFile: groove_b,
    fileName: "GrooveB_120bpm_Tanggu.mp3",
  },
  {
    name: "Maze Politics",
    audioFile: maze_politics,
    fileName: "MazePolitics_120_Perc.mp3",
  },
  {
    name: "Pas 3 Groove",
    audioFile: pas_3_groove,
    fileName: "PAS3GROOVE1.03B.mp3",
  },
  {
    name: "Silent Star",
    audioFile: silent_star,
    fileName: "SilentStar_120_Em_OrganSynth.mp3",
  },
  {
    name: "Stompy Slosh",
    audioFile: stompy_slosh,
    fileName: "FUD_120_StompySlosh.mp3",
  },
  {
    name: "Stutter Breakbeats",
    audioFile: stutter_breakbeats,
    fileName: "120_stutter_breakbeats_16.mp3",
  },
];

function getLoops() {
  return loopsNames.map(({ name, audioFile, fileName }, idx) => {
    return {
      name,
      fileName,
      id: `${idx}_${name}`,
      isSelected: false,
      audio: new Audio(audioFile),
    };
  });
}
