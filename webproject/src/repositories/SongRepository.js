import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { getArtistById } from "./ArtistRepository";
import { getAnalytics, logEvent } from "firebase/analytics";

const songsCollection = collection(firebaseDb, "songs");
const analytics = getAnalytics();

export const fetchSongs = async () => {
  try {
    const songSnapshot = await getDocs(songsCollection);
    return await Promise.all(songSnapshot.docs.map(async (doc) => {
      const song = doc.data();
      const artistData = await getArtistById(song.artist);
      logEvent(analytics, "songs_retrieved");
      return {
        id: doc.id,
        artistName: artistData ? artistData.name : "Unknown Artist",
        ...doc.data()
      };
    }));
  } catch (error) {
    console.error("Error fetching songs: ", error);
  }
}

export const fetchSongById = async (songId) => {
  const songDoc = await getDoc(doc(songsCollection, songId));
  if (songDoc.exists()) {
    const songData = songDoc.data();
    const artist = await getArtistById(songData.artist);
    return {
      id: songId,
      name: songData.name,
      artistName: artist ? artist.name : "Unknown Artist",
    };
  }
  return null;
};

export const addSong = async (song) => {
  try {
    const docRef = await addDoc(songsCollection, song);
    logEvent(analytics, "song_uploaded", { song: docRef});
    return { id: docRef.id, ...song };
  } catch (error) {
    console.error("Error adding song: ", error);
  }
};

export const updateSong = async (songId, updatedSong) => {
  try {
    const songRef = doc(firebaseDb, "songs", songId);
    await updateDoc(songRef, updatedSong);
    const artistData = await getArtistById(updatedSong.artist);
    return {
      id: songRef.id,
      artistName: artistData ? artistData.name : 'Unknown Artist',
      ...updatedSong
    };
  } catch (error) {
    console.error("Error updating song: ", error);
  }
};

export const deleteSong = async (songId) => {
  try {
    const songRef = doc(firebaseDb, "songs", songId);
    await deleteDoc(songRef);
  } catch (error) {
    console.error("Error deleting song: ", error);
  }
};