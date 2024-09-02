import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc, getDoc, writeBatch } from 'firebase/firestore';
import { firebaseDb } from '../firebase';
import { getAnalytics, logEvent } from 'firebase/analytics';

const artistsCollection = collection(firebaseDb, "artists");
const songsCollection = collection(firebaseDb, "songs");
const analytics = getAnalytics();

export const getArtistById = async (artistId) => {
  try {
    const artistRef = doc(firebaseDb, "artists", artistId);
    const artistDoc = await getDoc(artistRef);
    logEvent(analytics, "artists_retrieved");
    return { id: artistDoc.id, ...artistDoc.data() };
  } catch (error) {
    console.error("Error deleting artist: ", error);
  }
}

export const addArtist = async (artist) => {
  try {
    const docRef = await addDoc(artistsCollection, artist);
    return { id: docRef.id, ...artist };
  } catch (error) {
    console.error("Error adding artist: ", error);
  }
};

export const fetchArtists = async () => {
  try {
    const artistSnapshot = await getDocs(artistsCollection);
    console.log("artists", artistSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })))
    return artistSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching artists: ", error);
  }
};

export const updateArtist = async (artistId, updatedArtist) => {
  try {
    const artistRef = doc(firebaseDb, "artists", artistId);
    console.log("artist ref", artistRef);
    await updateDoc(artistRef, updatedArtist);
    return { id: artistRef.id, ...updatedArtist };
  } catch (error) {
    console.error("Error updating artist: ", error);
  }
};

export const deleteArtist = async (artistId) => {
  try {
    const batch = writeBatch(firebaseDb);
    const artistRef = doc(firebaseDb, "artists", artistId);
    const songSnapshot = await getDocs(songsCollection);

    for (const songDoc of songSnapshot.docs) {
      const songData = songDoc.data();
      if (songData.artist) {
        const artistData = await getArtistById(songData.artist);
        if (songData.artist === artistId) {
          console.log("artist is included", artistData);
          const songRef = doc(firebaseDb, "songs", songDoc.id);
          batch.update(songRef, { artist: "" });
        }
      }
    }

    batch.delete(artistRef);
    await batch.commit();
  } catch (error) {
    console.error("Error deleting artist: ", error);
  }
};
