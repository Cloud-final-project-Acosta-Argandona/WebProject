import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  //firebase configs
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebaseDb = getFirestore(app);
export const storage = getStorage(app);