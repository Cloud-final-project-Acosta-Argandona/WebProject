import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import { deleteArtist } from '../repositories/ArtistRepository';
import "../styles/ArtistList.css";
import { Pencil, Trash } from "react-bootstrap-icons";

const ArtistList = ({ artists, onEdit, onDelete }) => {
  const handleDelete = async (artistId) => {
    await deleteArtist(artistId);
    onDelete(artistId);
  };

  return (
    <Row className="pb-4">
      {artists.map((artist) => (
        <Col key={artist.id} className="col-12">
          <Card className="artist-card">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className='title'>{artist.name}</Card.Title>
                <Card.Subtitle className="subtitle mb-2 text-muted">{artist.genre}</Card.Subtitle>
              </div>
              <div>
                <Button variant="outline-light" className="edit-button" onClick={() => onEdit(artist)}>
                  <Pencil size={24} />
                </Button>
                <Button className="delete-button ms-2" onClick={() => handleDelete(artist.id)}>
                  <Trash size={24} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ArtistList;
