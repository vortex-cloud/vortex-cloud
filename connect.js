var userInfo = {name: "", email: "", icon: "", id: ""}
var config = {
    apiKey: "AIzaSyDYwCGZxi5LxY2por5titpA2YPjk66stnk",
    authDomain: "vortex-cloud-mc.firebaseapp.com",
    databaseURL: "https://vortex-cloud-mc.firebaseio.com",
    projectId: "vortex-cloud-mc",
    storageBucket: "vortex-cloud-mc.appspot.com",
    messagingSenderId: "892909191044",
    appId: "1:892909191044:web:1c1e3e252730a093"
};

function initFirebase() {
    console.log("Firebase?");
    firebase.initializeApp(config);
    console.log("Init Firebase.");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User logged in.");
            userInfo.name = user.displayName;
            userInfo.email = user.email;
            userInfo.icon = user.photoURL;
            userInfo.id = user.uid;
            console.log("User email verified: " + user.emailVerified);
            console.log("Calling functions");
            firebaseReady();
        } else {
            console.log("User not logged in.");
        }
    });
}

$('document').ready(function () {
    initFirebase();
});

function signOut() {
    firebase.auth().signOut().then(function () {
        console.log("Signed Out");
    }).catch(function (error) {
        console.log("Sign Out failed, " + error);
    });
}