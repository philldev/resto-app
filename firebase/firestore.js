import { getFirestore } from "firebase/firestore"
import firebaseApp from "./app";

const db = getFirestore(firebaseApp);

export default db