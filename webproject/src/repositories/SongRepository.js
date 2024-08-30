import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { getArtistById } from "./ArtistRepository";

const songsCollection = collection(firebaseDb, "songs");

export const fetchSongs = async () => {
  try {
    const songSnapshot = await getDocs(songsCollection);
    return await Promise.all(songSnapshot.docs.map(async (doc) => {
      const song = doc.data();
      const artistData = await getArtistById(song.artist);
      return {
        id: doc.id,
        artistName: artistData ? artistData.name : 'Unknown Artist',
        ...doc.data()
      };
    }));
  } catch (error) {
    console.error("Error fetching songs: ", error);
  }
}

export const addSong = async (song) => {
  try {
    const docRef = await addDoc(songsCollection, song);
    return { id: docRef.id, ...song };
  } catch (error) {
    console.error("Error adding song: ", error);
  }
};

export const updateSong = async (songId, updatedSong) => {
  try {
    const songRef = doc(firebaseDb, "artists", songId);
    await updateDoc(songRef, updatedSong);
    return { id: songRef.id, ...updatedSong };
  } catch (error) {
    console.error("Error updating artist: ", error);
  }
};