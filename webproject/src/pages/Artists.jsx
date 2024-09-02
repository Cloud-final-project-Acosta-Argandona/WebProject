import { Col, Container, Row, Modal, Button, Spinner } from "react-bootstrap";
import AppBar from "../components/AppBar";
import ArtistList from "../components/ArtistList";
import { useEffect, useState } from "react";
import ArtistForm from "../components/ArtistForm";
import { fetchArtists, updateArtist, addArtist } from "../repositories/ArtistRepository";
import "../styles/Artists.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [artistToEdit, setArtistToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const artistList = await fetchArtists();
      setArtists(artistList);
    };

    fetchData();
  }, []);

  const handleEdit = (artist) => {
    setArtistToEdit(artist);
    setShowModal(true);
  };

  const handleDelete = (artistId) => {
    setArtists(prevArtists => prevArtists.filter(artist => artist.id !== artistId));
  };

  const handleSave = async (newArtist) => {
    setIsLoading(true);

    try {
      if (artistToEdit) {
        await updateArtist(newArtist);
        setArtists(artists.map(artist => artist.id === artistToEdit.id ? newArtist : artist));
      } else {
        const savedArtist = await addArtist(newArtist);
        setArtists(prevArtists => [...prevArtists, savedArtist]);
      }

      setIsLoading(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving artist:", error);
      setIsLoading(false);
    }
  };

  const handleAddNewArtist = () => {
    setArtistToEdit(null);
    setShowModal(true);
  };

  return (
    <>
      <AppBar />
      <Container className="artists-container artist-list">
        <Row className="align-items-center mb-4">
          <Col>
            <h1 className="mb-0">Artists</h1>
          </Col>
          <Col className="text-end button-row">
            <Button variant="dark" onClick={handleAddNewArtist} className="add-button">
              Add Artist
            </Button>
          </Col>
        </Row>
        <Row>
          <ArtistList artists={artists} onEdit={handleEdit} onDelete={handleDelete} />
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="artist-modal" closeButton>
          <Modal.Title>{artistToEdit ? 'Edit Artist' : 'Add New Artist'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="artist-modal">
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            <ArtistForm artistToEdit={artistToEdit} onSave={handleSave} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Artists;
