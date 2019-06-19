var firebaseConfig = {
    apiKey: "AIzaSyCysfWN0-E5IpZWmwPSXt7VQNRI97tGsQg",
    authDomain: "phil-8e360.firebaseapp.com",
    databaseURL: "https://phil-8e360.firebaseio.com",
    projectId: "phil-8e360",
    storageBucket: "phil-8e360.appspot.com",
    messagingSenderId: "954718254736",
    appId: "1:954718254736:web:8784e08e96bbf460"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// database
database =firebase.database();
const speeCH = window.speechSynthesis;
const gif = $("#gif");
const logo = $("#logo");
const goBack =$("#button-goback");
const submit =$("#submit");
const task =$("#task");
const time =$("#time");
var globaltime ='';

// display the current schedule from firebase database
database.ref().on("child_added",function(snapshot){
    console.log(snapshot.val());
    var key =snapshot.key;
    var text = snapshot.val().text;
    var time = snapshot.val().time;
    $('#tablebody').append( "<tr id= "+key+"><td>"+text+"</td><td>"+time+"</td><td id= rmbtn><button class = removebtn id= rmEntry data-key= "+key+">X</td></tr>");

    })
// pushing the values to the database after clicking submit
submit.on("click",function(e){
    e.preventDefault();
    var taskToDo = task.val();
    var timeVal = time.val();
    database.ref().push({
        text: taskToDo,
        time : timeVal,
    });
    speak("New entry added");
})

// remove entry from database
$(document).on("click",".removebtn",function(e){
    e.preventDefault()
    var key = $(this).attr("data-key");
    database.ref().child(key).remove(); 
    $("#"+key).remove();
    speak("entry removed");
})
// when clicking on the gif
gif.on("click",function(e){
    e.preventDefault();
    speak("What would you like to keep track of today?");
});
// when clicking on the logo
logo.on("dblclick", function(e){
    e.preventDefault()
    speak("do you see that class?");
});
// go back button routing
goBack.on("click",function(e){
    e.preventDefault();
    window.location.href = "main.html";
})
// this code is for the watch
setInterval(function(){
    const now = moment();
    const timenow = now.format('h:mm:ss');
    globaltime = now.format('h:mm');
    $("#watch").html(timenow);
    setBkgGreeting();
},1000);
// function that tells you the current time
$("#watch").on("click",function(e){
    e.preventDefault();
    speak("time is "+globaltime);
})
// calling backgroundImage function
setBkgGreeting();
// speech function takes a string mytext varible and read it
function speak(mytext){
    if (speeCH.speaking){
        console.log("its currently speaking");
        return;
    }
    if (mytext !== ""){
        const speaktext = new SpeechSynthesisUtterance(mytext);
        gif.attr("src", gif.attr("data-animate"));
        speaktext.onend = function(){
            console.log("done");
            gif.attr("src", gif.attr("data-still"));
        }
        speaktext.onerror = function(){
            console.log("error");
        }
        speaktext.rate = 1;
        speaktext.pitch = 2;
        speeCH.speak(speaktext);
    }
}
// background image function
function setBkgGreeting() {
    var currentTime = new Date().getHours();
  
    // Morning (6 - 09:59AM)
    if (6 <= currentTime && currentTime < 10) {
      document.body.style.backgroundImage = "url('./assets/images/sunrise_LG.jpg')";
  
      // Daytime (10AM - 4:59PM)
    } else if (10 <= currentTime && currentTime < 17) {
      document.body.style.backgroundImage = "url('./assets/images/daytime_LG.jpg')";
   
  
      // Late Afternoon/Sunset (5 - 7:59PM)
    } else if (17 <= currentTime && currentTime < 20) {
      document.body.style.backgroundImage = "url('./assets/images/sunset_LG.jpg')";
      document.body.style.backgroundSize = "cover";
    }
  
    // Night (8PM - 5:59AM) // (20 <= currentTime && currentTime < 6)
    else {
      document.body.style.backgroundImage = "url('./assets/images/nightBeach_LG.jpg')";
      
    }
  }