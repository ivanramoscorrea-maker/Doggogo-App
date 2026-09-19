import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Esta es una configuración simulada.
// Para que la app funcione correctamente, deberás reemplazar estos valores
// con tus credenciales reales de Firebase Console.
const firebaseConfig = {
  apiKey: "SIMULATED_API_KEY",
  authDomain: "doggogo-app.firebaseapp.com",
  databaseURL: "https://doggogo-app.firebaseio.com",
  projectId: "doggogo-app",
  storageBucket: "doggogo-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Inicializar Firebase (En un entorno real sin credenciales válidas, esto lanzará advertencias/errores)
// Para el desarrollo de la UI, usaremos mocks en el Contexto.
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
