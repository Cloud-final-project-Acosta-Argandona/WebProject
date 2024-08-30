import React, { useEffect, useState } from 'react';
import AppBar from "../components/AppBar";
import { fetchUsersWithFavoriteSongs } from '../repositories/UserRepository';
import { ListGroup, Card, Col, Row } from 'react-bootstrap';

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
        <Row className="mt-4">
          {usersWithFavorites.map((user) => (
            <Col md={6} key={user.email}>
              <Card className="mb-4">
                <Card.Header>{user.username} ({user.email})</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {user.favoriteSongs.map((song) => (
                      <ListGroup.Item key={song.id}>
                        {song.name} - {song.artistName}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </>
  );
};

export default Favorites;
