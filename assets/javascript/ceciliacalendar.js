$(document).ready(function () {

    var dateToday = moment().format("MMMM Do YYYY");
    $(".today-date").text(dateToday);

    var timeNow = moment().format("hh:mm:ss A");
    $(".current-time").text(timeNow);

    var firebaseConfig = {
        apiKey: "AIzaSyAKQYVUekA19ykNAVWOabpRAnt0O_alqpY",
        authDomain: "users-3ea4f.firebaseapp.com",
        databaseURL: "https://users-3ea4f.firebaseio.com",
        projectId: "users-3ea4f",
        storageBucket: "users-3ea4f.appspot.com",
        messagingSenderId: "211300685110",
        appId: "1:211300685110:web:ee26de236300c086"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

}); 