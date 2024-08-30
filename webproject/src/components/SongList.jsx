import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Button } from 'react-bootstrap';
import { deleteSong } from '../repositories/SongRepository';

const SongsList = ({songs, onEdit, onDelete}) => {
  const handleDelete = async (songId) => {
    await deleteSong(songId);
    onDelete(songId);
  };

  return (
    <>
      <ul>
        {songs.map(song => 
        (
          <li key={song.id}>
            <p>{song.name} - {song.artistName}</p>
            <AudioPlayer
              src={song.storageUrl}
              onPlay={e => console.log("Playing")}
              controls
            />
            <Button onClick={() => {onEdit(song)}}>Edit</Button>
            <Button onClick={() => {handleDelete(song.id)}}>Delete</Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SongsList;