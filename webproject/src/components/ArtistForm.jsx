import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { addArtist, updateArtist } from '../repositories/ArtistRepository';

const ArtistForm = ({ artistToEdit, onSave }) => {
  const [name, setName] = useState(artistToEdit?.name || "");
  const [genre, setGenre] = useState(artistToEdit?.genre || "");

  useEffect(() => {
    if (artistToEdit) {
      setName(artistToEdit.name || "");
      setGenre(artistToEdit.genre || "");
    } else {
      setName("");
      setGenre("");
    }
  }, [artistToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const artist = { name, genre };

    let savedArtist;
    if (artistToEdit) {
      savedArtist = await updateArtist(artistToEdit.id, artist);
      console.log("edited artist", savedArtist);
    } else {
      savedArtist = await addArtist(artist);
      console.log("saved artist", savedArtist);
    }

    onSave(savedArtist);
    setName("");
    setGenre("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Artist name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Music Genre</Form.Label>
        <Form.Control
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">
        Save Artist
      </Button>
    </Form>
  );
};

export default ArtistForm;