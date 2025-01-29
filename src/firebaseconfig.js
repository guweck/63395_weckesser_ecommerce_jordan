import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBuCaRRtsX3MyHXydEmkhcpFLcC3T0HN7M",
    authDomain: "ecommerce-gweckesser.firebaseapp.com",
    projectId: "ecommerce-gweckesser",
    storageBucket: "ecommerce-gweckesser.firebasestorage.app",
    messagingSenderId: "193784692060",
    appId: "1:193784692060:web:84f4660a57d64450db5599"
}

// Inicializamos la app de Firebase
const app = initializeApp(firebaseConfig)


export const db = getFirestore(app)