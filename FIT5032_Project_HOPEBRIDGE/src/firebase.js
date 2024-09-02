//This file is reuqired by firebase which allows the whole app communicate with firebase

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQM6sMoTu2wiE8g4vO9G_up9WfM0xGIKc",
  authDomain: "hopebridge-845f9.firebaseapp.com",
  projectId: "hopebridge-845f9",
  storageBucket: "hopebridge-845f9.appspot.com",
  messagingSenderId: "452002754304",
  appId: "1:452002754304:web:fe33ac84218e169450cde5",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
