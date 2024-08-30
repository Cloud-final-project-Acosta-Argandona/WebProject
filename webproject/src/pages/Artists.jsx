import { Col, Container, Row } from "react-bootstrap";
import AppBar from "../components/AppBar";
import ArtistList from "../components/ArtistList";
import { useEffect, useState } from "react";
import ArtistForm from "../components/ArtistForm";
import { fetchArtists } from "../repositories/ArtistRepository";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [artistToEdit, setArtistToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const artistList = await fetchArtists();
      setArtists(artistList);
    };

    fetchData();
  }, []);

  const handleEdit = (artist) => {
    setArtistToEdit(artist);
    console.log("artist to edit", artist);
  };

  const handleDelete = (artistId) => {
    setArtists(prevArtists => prevArtists.filter(artist => artist.id !== artistId));
  };

  const handleSave = (newArtist) => {
    if (artistToEdit) {
      setArtists(artists.map(artist => artist.id === artistToEdit.id ? newArtist : artist));
      console.log("artists at Artists", artists);
    } else {
      setArtists(prevArtists => [...prevArtists, newArtist]);
    }
    setArtistToEdit(null);
  };

  return (
    <>
      <AppBar />
      <Container>
        <Row>
          <Col>
            <h1>Artists</h1>
          </Col>
        </Row>
        <Row>
          <ArtistForm artistToEdit={artistToEdit} onSave={handleSave} />
        </Row>
        <Row>
          <ArtistList artists={artists} onEdit={handleEdit} onDelete={handleDelete} />
        </Row>
      </Container>
    </>
  )
}

export default Artists;