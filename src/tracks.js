import imgSrc from "./assets/artwork.jpg";
import imgSrc2 from "./assets/artwork2.jpg";
import imgSrc3 from "./assets/artwork3.jpg";
import cali from "./assets/cali-wataboi.mp3";
import fifty from "./assets/50-tobylane.mp3";
import iwonder from "./assets/iwonder-dreamheaven.mp3";

// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/
const tracks = [
  {
    title: "Brown 900",
    artist: "LC MOD",
    // audioSrc: cali,
    audioSrc:
      "https://underdownloads.s3.amazonaws.com/Brown+900Hz+LC+Noise+MOD.mp3",
    image: imgSrc,
    color: "#ffb77a",
  },
  {
    title: "PinkBrown",
    artist: "LC Noise Together",
    audioSrc:
      "https://underdownloads.s3.amazonaws.com/Pink%2C+Brown+900Hz+LC+Noise+Together.mp3",
    image: imgSrc2,
    color: "#CFE3E2",
  },
  {
    title: "Brown 900",
    artist: "LC Noise",
    audioSrc:
      "https://underdownloads.s3.amazonaws.com/Brown+900Hz+LC+Noise.mp3",
    image: imgSrc3,
    color: "#5f9fff",
  },
  {
    title: "Brown 900",
    artist: "v3 Tighter Slopes",
    audioSrc:
      "https://underdownloads.s3.amazonaws.com/Noise+Brown+v3(131+-+600%2C+tighter+slopes).mp3",
    image: imgSrc3,
    color: "#5f1ddd",
  },
];
export default tracks;
