import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newSongName, setNewSongName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const url = "https://music-library-server.onrender.com";

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    const id = localStorage.getItem("id");
    // localStorage.getItem("token");
    try {
        const response = await fetch(`${url}/api/playlists/all`, {
            credentials: "include",  // This is important to include cookies with the request
        });
        if (!response.ok) {
            throw new Error("Failed to fetch playlists");
        }
        const data = await response.json();
        setPlaylists(data);
    } catch (error) {
        console.error("Error fetching playlists:", error.message);
    }
};


  const handleAddPlaylist = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${url}/api/playlists/newPlaylist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ playlistName: newPlaylistName }),
      }
    );
    if (response.status === 201) {
      fetchPlaylists();
      setNewPlaylistName("");
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  };

  const handleAddSong = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(`${url}/api/playlists/addSongs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        playlistName: selectedPlaylist,
        songName: newSongName,
      }),
    });
    if (response.status === 200) {
      fetchPlaylists();
      setNewSongName("");
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  };

  const handleRemoveSong = async (playlistName, songName) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${url}/api/playlists/removeSong`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        playlistName,
        songName,
      }),
    });
    if (response.status === 200) {
      fetchPlaylists();
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  };

  return (
    <div>
      <h1>My Playlists</h1>
      <form onSubmit={handleAddPlaylist}>
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New Playlist Name"
        />
        <button type="submit">Add Playlist</button>
      </form>
      <div>
        <form onSubmit={handleAddSong}>
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
          >
            <option value="">Select Playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist._id} value={playlist.playlistName}>
                {playlist.playlistName}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newSongName}
            onChange={(e) => setNewSongName(e.target.value)}
            placeholder="Song Name"
          />
          <button type="submit">Add Song</button>
        </form>
      </div>
      {playlists.map((playlist) => (
        <div key={playlist._id}>
          <h2>{playlist.playlistName}</h2>
          <table>
            <thead>
              <tr>
                <th>Song Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
                <th>Release Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map((song) => (
                <tr key={song._id}>
                  <td>{song.songId.title}</td>
                  <td>{song.songId.artist}</td>
                  <td>{song.songId.album}</td>
                  <td>{song.songId.genre}</td>
                  <td>{new Date(song.songId.releaseDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleRemoveSong(playlist.playlistName, song.songId.title)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Home;
