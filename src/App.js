import './App.css';
import Musica from "./components/Musica";
import {useState} from "react";

function App() {
  const [music, setMusic] = useState("fa-solid fa-circle-pause")
  return (
      <Musica music={music} setMusic={setMusic}></Musica>
  );
}

export default App;
