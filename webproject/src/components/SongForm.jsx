import React, { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { Button, Col, Form } from 'react-bootstrap';
import { addSong, updateSong } from '../repositories/SongRepository';

const SongForm = ({ artists, songToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [artistId, setArtistId] = useState('');
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) return;

    const storageRef = ref(storage, `songs/${audioFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, audioFile);

    uploadTask.on('state_changed',
      (snapshot) => {},
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const song = {
          name,
          artist: artistId,
          storageUrl: downloadURL,
        };

        let savedSong;
        if (songToEdit) {
          savedSong = await updateSong(songToEdit.id, song)
          console.log("Edited song:", savedSong);
        } else {
          savedSong = await addSong(song);
          console.log("Saved song:", savedSong);
        }

        onSave(savedSong);
        setName('');
        setArtistId('');
        setAudioFile(null);
      }
    );
  };

  useEffect(() => {
    if (songToEdit) {
      setName(songToEdit.name || "");
      setArtistId(songToEdit.artist || "");
      setAudioFile(songToEdit.storageUrl || null);
    } else {
      setName("");
      setArtistId("");
      setAudioFile(null);
    }
  }, [songToEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Song name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a name for the song
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col} md={4}>
        <Form.Label>Artist</Form.Label>
        <Form.Control 
          as="select"
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
          placeholder="Select a song..."
          required
        >
          {artists.map(artist => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Upload audio</Form.Label>
        <Form.Control
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          required
        />
        <Form.Control.Feedback>
          Please provide an audio file
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Add Song</Button>
    </Form>
  );
};

export default SongForm;
