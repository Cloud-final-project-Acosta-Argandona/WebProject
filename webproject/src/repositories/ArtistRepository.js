import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '../firebase';

const artistsCollection = collection(firebaseDb, "artists");

export const getArtistById = async (artistId) => {
  try {
    const artistRef = doc(firebaseDb, "artists", artistId);
    const artistDoc = await getDoc(artistRef);
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
    const artistRef = doc(firebaseDb, "artists", artistId);
    await deleteDoc(artistRef);
  } catch (error) {
    console.error("Error deleting artist: ", error);
  }
};
