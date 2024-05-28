import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSort } from "@fortawesome/free-solid-svg-icons";
import "./Landing.css";

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    releaseDate: "",
  });
  const [editSong, setEditSong] = useState({ s: false, song: null });
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    releaseDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("releaseDate");

  async function getData(sort = "") {
    const res = await fetch(`http://localhost:8000/api/songs?sort=${sort}`);
    const data = await res.json();
    console.log(data);
    setSongs(data);
  }

  useEffect(() => {
    getData();
  }, []);

  function onInputChange(event) {
    const { name, value } = event.target;
    setSongData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(songData);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openSortModal() {
    setIsSortModalOpen(true);
  }

  function closeSortModal() {
    setIsSortModalOpen(false);
  }

  async function onAddSongSubmit(event) {
    console.log();
    event.preventDefault();
    const response = await fetch("http://localhost:8000/api/songs/addSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(songData),
    });
    if (response.status === 201) {
      alert("Song Added");
      setIsModalOpen(false);
    } else {
      alert("Oops");
    }
    getData();
  }

  const handleEdit = (song) => {
    setEditSong({ s: true, song: song });
    setFormData({
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
      releaseDate: song.releaseDate.split("T")[0],
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/songs/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedSong = await res.json();
        setSongs(songs.map((song) => (song._id === id ? updatedSong : song)));
        setEditSong({ s: false, song: null });
        getData();
      } else {
        console.error("Failed to update song");
      }
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/songs/delete/${id}`, {
        method: "DELETE",
      });
      if (res.status === 201) {
        setSongs(songs.filter((song) => song._id !== id));
      } else {
        console.log("Failed to delete song");
      }
    } catch (error) {
      console.log("Error deleting song:", error);
    }
    getData();
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const applySort = () => {
    getData(sortOption);
    closeSortModal();
  };

  return (
    <>
      <div className="w-screen h-screen font-light  bg-black">
        <h1 className="text-custom-orange font-bebas py-6 px-10 text-4xl">
          Library
        </h1>
        <div className="absolute top-0 right-6 m-6 flex items-center space-x-4">
          <button
            className="text-white bg-custom-orange h-10 w-10 rounded-full p-0 text-2xl flex justify-center items-center"
            onClick={openModal}
          >
            <span className="p-0 m-0">+</span>
          </button>
          <FontAwesomeIcon
            icon={faSort}
            className="text-white  cursor-pointer text-2xl"
            onClick={openSortModal}
          />
        </div>
        <table className="text-white font-gruppo font-semibold mx-10 w-11/12">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song._id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>{new Date(song.releaseDate).toLocaleDateString()}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEdit(song)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(song._id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Song</h2>
            <form onSubmit={onAddSongSubmit}>
              <div className="form">
                <label htmlFor="title">Title</label>
                <input
                  onChange={onInputChange}
                  type="text"
                  id="title"
                  name="title"
                />
              </div>
              <div className="form">
                <label htmlFor="artist">Artist</label>
                <input
                  onChange={onInputChange}
                  type="text"
                  id="artist"
                  name="artist"
                />
              </div>
              <div className="form">
                <label htmlFor="album">Album</label>
                <input
                  onChange={onInputChange}
                  type="text"
                  id="album"
                  name="album"
                />
              </div>
              <div className="form">
                <label htmlFor="genre">Genre</label>
                <input
                  onChange={onInputChange}
                  type="text"
                  id="genre"
                  name="genre"
                />
              </div>
              <div className="form">
                <label htmlFor="releaseDate">Date</label>
                <input
                  onChange={onInputChange}
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  value={songData.releaseDate}
                />
              </div>
              <button className="my-3 px-4 py-2 w-full rounded bg-orange-500">
                Add Song
              </button>
            </form>
          </div>
        </div>
      )}
      {editSong.s && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setEditSong({ s: false, song: null })}
            >
              &times;
            </span>
            <h2>Edit Song</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editSong.song._id);
              }}
            >
              <div className="form">
                <label htmlFor="editTitle">Title</label>
                <input
                  type="text"
                  id="editTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form">
                <label htmlFor="editArtist">Artist</label>
                <input
                  type="text"
                  id="editArtist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form">
                <label htmlFor="editAlbum">Album</label>
                <input
                  type="text"
                  id="editAlbum"
                  name="album"
                  value={formData.album}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form">
                <label htmlFor="editGenre">Genre</label>
                <input
                  type="text"
                  id="editGenre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form">
                <label htmlFor="editReleaseDate">Release Date</label>
                <input
                  type="date"
                  id="editReleaseDate"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="my-3 px-4 py-2 w-full rounded bg-orange-500"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
      {isSortModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeSortModal}>
              &times;
            </span>
            <h2>Sort Filters</h2>
            <form>
              <div className="form">
                <label>
                  <input
                    type="radio"
                    name="sortOption"
                    value="title"
                    checked={sortOption === "title"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />
                  Title
                </label>
              </div>
              <div className="form">
                <label>
                  <input
                    type="radio"
                    name="sortOption"
                    value="artist"
                    checked={sortOption === "artist"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />
                  Artist
                </label>
              </div>
              <div className="form">
                <label>
                  <input
                    type="radio"
                    name="sortOption"
                    value="album"
                    checked={sortOption === "album"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />
                  Album
                </label>
              </div>
              <div className="form">
                <label>
                  <input
                    type="radio"
                    name="sortOption"
                    value="genre"
                    checked={sortOption === "genre"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />
                  Genre
                </label>
              </div>
              <div className="form">
                <label>
                  <input
                    type="radio"
                    name="sortOption"
                    value="releaseDate"
                    checked={sortOption === "releaseDate"}
                    onChange={handleSortChange}
                    className="mr-2"
                  />
                  Release Date
                </label>
              </div>
              <button
                type="button"
                className="my-3 px-4 py-2 w-full rounded bg-custom-orange"
                onClick={applySort}
              >
                Apply Sort
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Library;
