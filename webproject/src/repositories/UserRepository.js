import { collection, getDocs } from 'firebase/firestore';
import { firebaseDb } from '../firebase';
import { fetchSongById } from './SongRepository';
import { getAnalytics, logEvent } from 'firebase/analytics';

const usersCollection = collection(firebaseDb, "users");
const analytics = getAnalytics();

export const fetchUsers = async () => {
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  logEvent(analytics, "favorites_retrieved");
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
