import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { fetchSongs } from "../repositories/SongRepository";
import { Col, Container, Row } from "react-bootstrap";
import SongForm from "../components/SongForm";
import { fetchArtists } from "../repositories/ArtistRepository";
import SongsList from "../components/SongList";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songToEdit, setSongToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const artistList = await fetchArtists();
      const songList = await fetchSongs();
      console.log("songs retrieved", songList);
      setArtists(artistList);
      setSongs(songList);
    };

    fetchData();
  }, []);

  const handleEdit = (song) => {
    setSongToEdit(song);
    console.log("song to edit", song);
  };

  const handleDelete = (songId) => {
    setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
  };

  const handleSave = (newSong) => {
    if (songToEdit) {
      setSongs(songs.map(song => song.id === songToEdit.id ? newSong : song));
      console.log("songs at Songs", songs);
    } else {
      setSongs(prevSongs => [...prevSongs, newSong]);
    }
    setSongToEdit(null);
  };

  return(
    <>
      <AppBar />
      <Container>
        <Row>
          <Col>
            <h1>Songs</h1>
          </Col>
        </Row>
        <Row>
          <SongForm artists={artists} songToEdit={songToEdit} onSave={handleSave}/>
        </Row>
        <Row>
          <SongsList songs={songs} onEdit={handleEdit} onDelete={handleDelete} />
        </Row>
      </Container>
    </>
  )
}

export default Songs;