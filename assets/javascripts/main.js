window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speeCH = window.speechSynthesis;
const recognition = new SpeechRecognition();
var mytext='';
var weatherspeech ="";
const gif = $("#gif");
const speechButton = $("#button-speech");
const transcript = $("#transcript");
const transcriptD = $("#transcript2");
const weather = $("#weather");
const recipe = $("#recipe");
const joker = $("#joker");
const scheduler = $("#scheduler");
const sportResult = $("#sport-result");
const logo = $("#logo");
var long;
var lat;

// background images
setBkgGreeting() ;
setInterval(function() {
    setBkgGreeting() ;
  }, 60000);

//  blacksky API an api for weather 
window.addEventListener("load",function(){
   
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition( function(position){
           lat =position.coords.latitude;
           long =position.coords.longitude;
           const proxy ="https://cors-anywhere.herokuapp.com/"
            const api =proxy+"https://api.darksky.net/forecast/a2131208c0be722b8182341088b7b86a/"+lat+","+long+"";
            $.ajax({
                url: api,
                method: "GET"
              }).then(function ready(response) { 
                  var sum =response.currently.summary;
                  var temp= response.currently.temperature;
                  var hum = response.currently.humidity
                  hum = hum*100;
                  hum = hum.toFixed(0);
                  weatherspeech ="the weather in you area is "+sum+", the temperature is "+temp+" degrees and the humidity is "+hum+" percent";
                  console.log(weatherspeech);
                })
        })
    }
})
// when cliking on gif it speaks the text between ()
gif.on("click",function(e){
    e.preventDefault();
    speak("what would you like to ask me today?");
})
logo.on("click", function(e){
    e.preventDefault()
    speak("do you see that class?");
});
// this section is for menu section routing
// when clicking weather on the page phil tells you the weather in your area
weather.on("click",function(e){
    e.preventDefault();
    speak(weatherspeech)
})
// when clicking it route you toward recipe page
recipe.on("click",function(e){
    e.preventDefault();
    window.location.href = "recipe.html";
})
// when clicking it route you toward joke page
joker.on("click",function(e){
    e.preventDefault();
    var queryURL = "https://icanhazdadjoke.com/";
  $.ajax({
    url: queryURL,
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    transcriptD.text(response.joke);
    speak(response.joke);
    setTimeout(function(){transcriptD.empty()},10000)
  });
})
// when clicking it route you toward scheduler page
scheduler.on("click",function(e){
    e.preventDefault();
    window.location.href = "scheduler.html";
})
// when clicking it route you toward sport results page
sportResult.on("click",function(e){
    e.preventDefault();
    window.location.href = "sportresults.html";
})
// voice recognition 
recognition.addEventListener("result",function(e){
    const myspeech =e.results[0][0].transcript;
    console.log(myspeech);
    transcript.html(myspeech);
    setTimeout(function(){ transcript.empty() }, 2000);
    if (myspeech == "weather"){
        console.log("weather");
        speak(weatherspeech);
    }
    if (myspeech == "recipe"){
        console.log("recipe");
        window.location.href = "recipe.html";
    }
    if (myspeech == "joke" || myspeech == "tell me a joke"){
        console.log("joke");
        var queryURL = "https://icanhazdadjoke.com/";
         $.ajax({
    url: queryURL,
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    transcriptD.text(response.joke);
    speak(response.joke);
    setTimeout(function(){transcriptD.empty()},10000)
  });
    }
    if (myspeech == "scheduler"){
        console.log("scheduler");
        window.location.href = "scheduler.html";
    }
    if (myspeech == "sport results"){
        console.log("sport results");
        window.location.href = "sportresults.html";
    }
    
})
// button to start the recognition voice function
speechButton.on("click",function(e){
    e.preventDefault();
    recognition.start()
})
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
