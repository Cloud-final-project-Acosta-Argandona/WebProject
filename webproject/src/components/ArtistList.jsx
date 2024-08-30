import { deleteArtist } from '../repositories/ArtistRepository';
import { Button } from 'react-bootstrap';

const ArtistList = ({ artists, onEdit, onDelete }) => {
  const handleDelete = async (artistId) => {
    await deleteArtist(artistId);
    onDelete(artistId);
  };

  return (
    <>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name} - {artist.genre}
            <Button onClick={() => onEdit(artist)}>Edit</Button>
            <Button onClick={() => handleDelete(artist.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArtistList;