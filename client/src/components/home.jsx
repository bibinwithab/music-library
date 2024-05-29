import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Landing.css'

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    // Fetch user's playlists
    axios.get('/api/playlists/all')
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
  }, []);

  const handleAddPlaylist = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreatePlaylist = () => {
    // Create new playlist
    axios.post('/api/playlists/newPlaylist', { playlistName: newPlaylistName })
      .then(response => {
        console.log('Playlist created:', response.data.message);
        // Fetch updated playlists
        axios.get('/api/playlists/all')
          .then(response => {
            setPlaylists(response.data);
            setNewPlaylistName('');
            setShowModal(false);
          })
          .catch(error => {
            console.error('Error fetching playlists:', error);
          });
      })
      .catch(error => {
        console.error('Error creating playlist:', error.response.data.message);
      });
  };

  return (
    <div>
      <h1>My Playlists</h1>
      <button onClick={handleAddPlaylist}>Create Playlist</button>
  
      {Array.isArray(playlists) && playlists.map(playlist => (
        <div key={playlist._id}>
          <h2>{playlist.playlistName}</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map(song => (
                <tr key={song._id}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>
                    <button>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
  
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Create Playlist</h2>
            <input
              type="text"
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button onClick={handleCreatePlaylist}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
