import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ IMPORTANTE: REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES REALES
// Puedes encontrar esto en tu Consola de Firebase -> Configuración del Proyecto -> General -> Tus apps
const firebaseConfig = {
  apiKey: "REEMPLAZAR_CON_TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "REEMPLAZAR_SENDER_ID",
  appId: "REEMPLAZAR_APP_ID"
};

// Inicialización segura (evita reinicializaciones en desarrollo)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicializa Auth con persistencia en React Native para no perder la sesión
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
