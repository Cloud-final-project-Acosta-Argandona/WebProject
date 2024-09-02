import React, { useEffect, useState } from 'react';
import { fetchUsersWithFavoriteSongs } from '../repositories/UserRepository';
import { Card, Col, Row, Accordion, Container } from 'react-bootstrap';
import AppBar from '../components/AppBar';
import "../styles/Favorites.css"
import { MusicNoteBeamed, StarFill } from 'react-bootstrap-icons';

const Favorites = () => {
  const [usersWithFavorites, setUsersWithFavorites] = useState([]);

  useEffect(() => {
    const loadUsersWithFavorites = async () => {
      const users = await fetchUsersWithFavoriteSongs();
      setUsersWithFavorites(users);
    };

    loadUsersWithFavorites();
  }, []);

  return (
    <>
      <Container className='user-container user-list'>
        <AppBar />
        <h1>User's favorites</h1>
        <Row className="mt-4">
          <Col md={12}>
            <Accordion>
              {usersWithFavorites.map((user, index) => (
                <Card key={user.email}>
                  <Accordion.Item className='custom-accordion' eventKey={index.toString()}>
                    <Accordion.Header>
                      <StarFill className='mx-3' size={24}/>
                      {user.username} ({user.email})
                    </Accordion.Header>
                    <Accordion.Body>
                      {user.favoriteSongs.length > 0 ? (
                        <ul className='favorites-list'>
                          {user.favoriteSongs.map((song) => (
                            <li key={song.id}>
                              <MusicNoteBeamed className="mx-3" size={24}/>
                              {song.name} - {song.artistName}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No favorites</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Card>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Favorites;
