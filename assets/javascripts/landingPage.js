const speeCH = window.speechSynthesis;

// DOM elements to be updated
(currentTime = document.getElementById("currentTime")),
  (greeting = document.getElementById("greeting")),
  (name = document.getElementById("name")),
  (caption = document.getElementById("caption")),
  
// Show Current Time
setInterval(function() {
  var currentTime = moment().format("h:mm:ss A");
  $("#currentTime").html(currentTime);
}, 1000);

// Set background and Greeting based on currentTime
function setBkgGreeting() {
  var currentTime = new Date().getHours();

  // Morning (6 - 09:59AM)
  if (6 <= currentTime && currentTime < 10) {
    document.body.style.backgroundImage = "url('./images/sunrise_LG.jpg')";
    greeting.textContent = "Good Morning";
    console.log(greeting.textContent);

    // Daytime (10AM - 4:59PM)
  } else if (10 <= currentTime && currentTime < 17) {
    document.body.style.backgroundImage = "url('./images/daytime_LG.jpg')";
    greeting.textContent = "Good Day";
    document.body.style.color = "white";
    console.log(greeting.textContent);

    // Late Afternoon/Sunset (5 - 7:59PM)
  } else if (17 <= currentTime && currentTime < 20) {
    document.body.style.backgroundImage = "url('./images/sunset_LG.jpg')";
    greeting.textContent = "Good Evening";
    document.body.style.color = "white";
    console.log(greeting.textContent);
  } 

  // Night (8PM - 5:59AM) // (20 <= currentTime && currentTime < 6)
  else {
    document.body.style.backgroundImage = "url('./images/nightBeach_LG.jpg')";
    greeting.textContent = "Good Night";
    document.body.style.color = "white";
    console.log(greeting.textContent);
  }
};

// ==== Call function ====== //
setBkgGreeting();

// When user clicks the image (Baymax) it routes to 2nd page (main.html):
$("#DA-image").on("click", function(e) {
  e.preventDefault();
  speak("let the fun begin!")
  setTimeout(function() { 
    window.location.href = "main.html";
  },2000)
});

// Speak greeting when the logo image is clicked at upper left corner
$("#logo").on("click",function(){
  speak('Hi human, my name is Phil, i am a digital assistant')
});

function speak(mytext){
  if (speeCH.speaking){
      console.log("its currently speaking");
      return;
  }
  if (mytext !== ""){
      const speaktext = new SpeechSynthesisUtterance(mytext);
      
      speaktext.onend = function(){
          console.log("done");
      }
      speaktext.onerror = function(){
          console.log("error");
      }
      speaktext.rate = 1;
      speaktext.pitch = 1;
      speeCH.speak(speaktext);
  }
};

