// My API Key:
var apikey = "937b5f5cf2msh6f1ada73819b362p1803a1jsnae9a3ceff279";

// URL we need to query the database:
var queryURL = "https://webknox-jokes.p.rapidapi.com/jokes/oneLiner";

$("#submit-button").on("click", function() {
  $.ajax({
    url: queryURL,

    headers: {
      "X-RapidAPI-Host": "webknox-jokes.p.rapidapi.com",
      "X-RapidAPI-Key": "937b5f5cf2msh6f1ada73819b362p1803a1jsnae9a3ceff279"
    },
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    console.log(queryURL);
    console.log(response.text);

    // Transfer API response content to HTML:
    $(".card-text").text(response.text);
    console.log(response);
  });
});
