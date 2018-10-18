import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD6X3E8kZj39rTgH4TdxnR9WiomfuC4s0o",
    authDomain: "lets-meetapp.firebaseapp.com",
    databaseURL: "https://lets-meetapp.firebaseio.com",
    projectId: "lets-meetapp",
    storageBucket: "lets-meetapp.appspot.com",
    messagingSenderId: "593787650317"
};
firebase.initializeApp(config);

export default firebase;