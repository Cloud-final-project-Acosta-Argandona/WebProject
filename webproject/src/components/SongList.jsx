import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Button, Col, Row } from 'react-bootstrap';
import { deleteSong } from '../repositories/SongRepository';
import "../styles/SongList.css"
import { Pencil, Trash } from 'react-bootstrap-icons';

const SongsList = ({ songs, onEdit, onDelete }) => {
  const handleDelete = async (songId) => {
    await deleteSong(songId);
    onDelete(songId);
  };

  return (
    <>
      <ul>
        {songs.map(song =>
        (
          <li className='my-2 song-card' key={song.id}>
            <Row className='d-flex align-items-center'>
              <Col md={3}>
                <p className='pt-3 px-4 title' >{song.name}</p>
                <p className='px-4 subtitle'>{song.artistName}</p>
              </Col>
              <Col md={6}>
                <AudioPlayer
                  src={song.storageUrl}
                  className='custom-audio-player'
                  onPlay={e => console.log("Playing")}
                  controls
                />
              </Col>
              <Col className='text-end d-flex align-items-center justify-content-end mx-4'>
                <Button variant='outline-light' className='edit-button' onClick={() => { onEdit(song) }}>
                  <Pencil size={24} />
                </Button>
                <Button className="delete-button ms-2" onClick={() => { handleDelete(song.id) }}>
                  <Trash size={24} />
                </Button>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SongsList;