// DOM elements to be updated
currentTime = document.getElementById('currentTime'),
greeting = document.getElementById('greeting'),
name = document.getElementById('name'),
caption = document.getElementById('caption'),

// Show Current Time
setInterval(function() {
    var currentTime = moment().format("h:mm:ss a");
    $("#currentTime").html(currentTime);
}, 1000);

// Set background and Greeting based on currentTime
function setBkgGreeting () {
    var currentTime = new Date().getHours();

    // Morning (6 - 09:59AM)
    if (6 <= currentTime && currentTime < 10) {
        document.body.style.backgroundImage = "url('/Project1-MB/images/sunrise_cloud.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        
        greeting.textContent = "Good Morning";
        console.log(greeting.textContent);
 
    // Daytime (10AM - 4:59PM)    
    } else if (10 <= currentTime && currentTime < 17) {

        document.body.style.backgroundImage = "url('/Project1-MB/images/beach_daytime.jpg')";
        greeting.textContent = "Good Day";
        document.body.style.backgroundRepeat = "no-repeat";
        console.log(greeting.textContent);

    // Late Afternoon/Sunset (5 - 7:59PM)
    } else if (17 <= currentTime && currentTime < 20) {
        document.body.style.backgroundImage = "url('/Project1-MB/images/sunset_pink.jpg')";
        greeting.textContent = "Good Evening";
        console.log(greeting.textContent);
    }

    // Night (8PM - 5:59AM)
    else   // (20 <= currentTime && currentTime < 6)
        document.body.style.backgroundImage = "url('/Project1-MB/images/beach_night.jpg')";
        greeting.textContent = "Good Night";
        document.body.style.color = 'white';
        // document.body.background = "night";
        console.log(greeting.textContent);   
};
 
// Save input name in local storage
// Get name
function getName() {
    if (local.Storage.getItem("name") === null) {
        name.textContent = "[Enter Your Name]";
    } 
    else {
        name.textContent = local.Storage.getItem("name");
    }
};

// ==== Call functions ====== //
setBkgGreeting();
getName();

// When user clicks the image (Baymax) it routes to 2nd page (main.html):
$("#DA-image").on("click", function(e){
    e.preventDefault();
    window.location = URL("main.html");
});