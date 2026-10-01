import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Reemplaza esto con el código exacto que copiaste de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDl0N1qEEzg5sCZqGGL8rwtpT88MU_J9k",
  authDomain: "experienciaia-19b03.firebaseapp.com",
  projectId: "experienciaia-19b03",
  storageBucket: "experienciaia-19b03.firebasestorage.app",
  messagingSenderId: "1075998884054",
  appId: "1:1075998884054:web:efbfd074924efeb8ef0977"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Preparamos la autenticación para usarla en tus componentes
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // NUEVO: Exportamos la base de datos