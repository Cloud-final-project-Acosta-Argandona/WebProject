import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { fetchSongs } from "../repositories/SongRepository";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import SongForm from "../components/SongForm";
import { fetchArtists } from "../repositories/ArtistRepository";
import SongsList from "../components/SongList";
import "../styles/Songs.css"
import { Plus } from "react-bootstrap-icons";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const artistList = await fetchArtists();
      const songList = await fetchSongs();
      console.log("songs retrieved", songList);
      console.log("artists reteiv", artistList);
      setArtists(artistList);
      setSongs(songList);
    };

    fetchData();
  }, [isLoading]);

  const handleEdit = (song) => {
    setSongToEdit(song);
    setShowModal(true);
  };

  const handleDelete = (songId) => {
    setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
  };

  const handleSave = (newSong) => {
    setIsLoading(true);

    if (songToEdit) {
      setSongs(songs.map(song => song.id === songToEdit.id ? newSong : song));
      console.log("songs at Songs", songs);
    } else {
      setSongs(prevSongs => [...prevSongs, newSong]);
    }
    setSongToEdit(null);
    setIsLoading(false);
    setShowModal(false);
  };

  const handleAddNewSong = () => {
    setSongToEdit(null);
    setShowModal(true);
  };

  return (
    <>
      <AppBar />
      <Container className="songs-container songs-list">
        <Row className="align-items-center mb-4">
          <Col>
            <h1 className="mb-0">Songs</h1>
          </Col>
          <Col className="text-end button-row">
            <Button variant="dark" onClick={handleAddNewSong} className="add-button">
              <Plus size={22}/>
              Add song
            </Button>
          </Col>
        </Row>

        <Row>
          <SongsList songs={songs} onEdit={handleEdit} onDelete={handleDelete} />
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="song-modal" closeButton>
          <Modal.Title>{songToEdit ? 'Edit Song' : 'Add new song'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="song-modal">
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <SongForm setIsLoading={setIsLoading} artists={artists} songToEdit={songToEdit} onSave={handleSave} />
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Songs;