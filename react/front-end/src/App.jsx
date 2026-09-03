import { useEffect, useState } from "react";

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
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

        {songs.map((song) => (
          <div key={song.id}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        ))}
      </main>

      <footer>Music Player</footer>
    </div>
  );
}

export default App;
