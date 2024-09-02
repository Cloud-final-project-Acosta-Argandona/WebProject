import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  //firebase configs
};

const app = initializeApp(firebaseConfig);

export const firebaseDb = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);