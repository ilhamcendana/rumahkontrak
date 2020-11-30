import firebase from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyD5BugGbEMrA5wF8fpSP2B9U029bfy5FSA",
    authDomain: "rumah-kontrak.firebaseapp.com",
    databaseURL: "https://rumah-kontrak.firebaseio.com",
    projectId: "rumah-kontrak",
    storageBucket: "rumah-kontrak.appspot.com",
    messagingSenderId: "803920610476",
    appId: "1:803920610476:web:8972f8ec262df0ec5d0b09",
    measurementId: "G-NDRC53K43J"
};


firebase.initializeApp(firebaseConfig);

export default firebase;