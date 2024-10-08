import React, { useEffect, useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { Button, Col, Form } from 'react-bootstrap';
import { addSong, updateSong } from '../repositories/SongRepository';

const SongForm = ({ artists, songToEdit, onSave, setIsLoading }) => {
  const [name, setName] = useState('');
  const [artistId, setArtistId] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState('');

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAudioFile(e.target.files[0]);
      setExistingFileUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let downloadURL = existingFileUrl;

    if (!existingFileUrl && audioFile) {
      setIsLoading(true);
      const storageRef = ref(storage, `songs/${audioFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, audioFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {
            console.error('Upload failed:', error);
            setIsLoading(false);
            reject(error);
          },
          async () => {
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    const song = {
      name,
      artist: artistId,
      storageUrl: downloadURL,
    };

    try {
      let savedSong;
      if (songToEdit) {
        savedSong = await updateSong(songToEdit.id, song);
        console.log("Edited song:", savedSong);
      } else {
        savedSong = await addSong(song);
        console.log("Saved song:", savedSong);
      }
      
      onSave(savedSong);
    } catch (error) {
      console.error('Error updating song:', error);
    } finally {
      setIsLoading(false);
    }
  
    setName('');
    setArtistId('');
    setAudioFile(null);
  
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  useEffect(() => {
    if (songToEdit) {
      setName(songToEdit.name || "");
      setArtistId(songToEdit.artist || "");
      setExistingFileUrl(songToEdit.storageUrl || "");
      setAudioFile(songToEdit.storageUrl || null);
    } else {
      setName("");
      setArtistId("");
      setExistingFileUrl("");
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
          ref={fileInputRef}
          required={!songToEdit}
        />
        <Form.Control.Feedback>
          Please provide an audio file
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">{songToEdit ? 'Update Song' : 'Add Song'}</Button>
    </Form>
  );
};

export default SongForm;
