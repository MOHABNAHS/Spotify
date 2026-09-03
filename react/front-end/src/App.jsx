import { useEffect, useState } from "react";

function App() {
  const [songs, setSongs] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/audio")
      .then((response) => response.json())
      .then((data) => {
        setAudioFiles(data);
      });
  }, []);

  return (
    <div>
      <aside>
        <h2>Spotify</h2>

        <nav>
          <p>Home</p>
          <p>Search</p>
          <p>Your Library</p>
        </nav>
      </aside>

      <main>
        <h1>Spotify</h1>

        {audioFiles.map((file) => (
          <div className="song-card" key={file}>
            <div>
              <h3>{file}</h3>
            </div>

            <audio controls src={`/audio/${file}`}></audio>
          </div>
        ))}
      </main>

      <footer>Music Player</footer>
    </div>
  );
}

export default App;
