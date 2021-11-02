import { initializeApp } from "firebase/app";
import FIREBASE_CONFIG from "./config";

const firebaseApp = initializeApp(FIREBASE_CONFIG)

export default firebaseApp