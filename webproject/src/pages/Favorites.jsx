import React, { useEffect, useState } from 'react';
import { fetchUsersWithFavoriteSongs } from '../repositories/UserRepository';
import { ListGroup, Card, Col, Row, Tab, Tabs, Accordion } from 'react-bootstrap';
import AppBar from '../components/AppBar';

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
      <AppBar />
      <h1>User's favorites</h1>
      <Row className="mt-4">
        <Col md={12}>
          <Accordion>
            {usersWithFavorites.map((user, index) => (
              <Card key={user.email}>
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header>
                    {user.username} ({user.email})
                  </Accordion.Header>
                  <Accordion.Body>
                    {user.favoriteSongs.length > 0 ? (
                      <ul>
                        {user.favoriteSongs.map((song) => (
                          <li key={song.id}>
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
    </>
  );
};

export default Favorites;
