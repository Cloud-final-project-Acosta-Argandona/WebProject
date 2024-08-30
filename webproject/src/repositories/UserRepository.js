import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { getArtistById } from './ArtistRepository';
import { firebaseDb } from '../firebase';
import { fetchSongById } from './SongRepository';

const usersCollection = collection(firebaseDb, "users");
const songsCollection = collection(firebaseDb, "songs");

export const fetchUsers = async () => {
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return users;
};

export const fetchUsersWithFavoriteSongs = async () => {
  const users = await fetchUsers();

  const usersWithFavorites = await Promise.all(users.map(async (user) => {
    const favoriteSongs = await Promise.all(user.idSongs.map(songId => fetchSongById(songId)));
    return { ...user, favoriteSongs };
  }));

  return usersWithFavorites;
};
