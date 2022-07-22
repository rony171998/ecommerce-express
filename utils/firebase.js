const { initializeApp } = require('firebase/app');
const {getStorage} = require('firebase/storage');
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9lE2FE5ELQx2Qf243x10-eykbYwSvvb0",
  authDomain: "rony-academlo.firebaseapp.com",
  projectId: "rony-academlo",
  storageBucket: "rony-academlo.appspot.com",
  messagingSenderId: "994107524742",
  appId: "1:994107524742:web:6619a10f1139c8418c7307"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };