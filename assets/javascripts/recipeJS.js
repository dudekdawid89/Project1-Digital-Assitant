$(window).on("load", function(){
  $("#sorryMsg").hide();
  buttonOne();
  enterSign();
})
function displayRecipe(response) {

  var indexRandom = Math.ceil(Math.floor(Math.random() * 2))

  if (response.hits.length == 1) {
    indexRandom = 0
  }

  else if (response.hits.length == 0) {
$("#buttonFirst").hide();
$("#sorryMsg").show();
again();

  //  $(".again").animate({fontSize: '6em'}, "slow");
    
  }
  var name = response.hits[indexRandom].recipe.label;
  var dinnerName = $("<p>").html(name);
  var dinnerImage = $("<img>");
  dinnerImage.attr("src", response.hits[indexRandom].recipe.image);
  dinnerImage.addClass("dinnerImage img-thumbnail");
  console.log(response.hits[indexRandom].recipe.ingredientLines);

  var ingredients = response.hits[indexRandom].recipe.ingredientLines
  var displayIngredients = $("<p>").html(ingredients);


  console.log("External link for instructions " + response.hits[indexRandom].recipe.url);
  console.log("Total calories " + response.hits[indexRandom].recipe.calories);

  var buttonInstructions = $("<a>");
  buttonInstructions.addClass(" btn btn-primary btn-lg ins");
  buttonInstructions.attr("href", response.hits[indexRandom].recipe.url)
  buttonInstructions.text("Instructions");


  $("#buttonFirst").append(dinnerName);
  $("#buttonFirst").append(dinnerImage);
  $("#buttonFirst").append(displayIngredients);
  $("#buttonFirst").append(buttonInstructions);

};

$(document).on("click", "#acceptButton", function () {


  var dish = $("#firstInput").val().trim();
  var diet = $("#secondInput").val().trim();
  var calories = $("#thirdInput").val().trim();

  if (dish.length > 0 && diet.length > 0 && calories.length > 0) {


    console.log(diet);
    console.log(calories)
    console.log(dish);
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=" + dish + "&app_id=e9e42f5d&app_key=18a87aa5bad861b0ae0782c825526c1c&from=0&to=2&diet=" + diet + "&calories=" + calories + "&health=alcohol-free";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      displayRecipe(response);

    });



    $(".modal").css("display", "none");
    $(".btn").hide();

  }
  else if(dish.length ===0)
  {
    $("#dishmsg").html("Required")
  }
  else if(diet.length ===0)
  {
    $("#dietmsg").html("Required")
  }
  else if(calories.length ===0)
  {
    $("#caloriesmsg").html("Required")
  }
})


function buttonOne() {
  var buttonFirstPage = $("<button>");
  buttonFirstPage.addClass("firstButton btn btn-light btn-lg");
  buttonFirstPage.text("Click ME!")


  $("#buttonFirst").html(buttonFirstPage);


}

function enterSign(){
  var sign = $("<h1>").text("If you want the best recipe CLICK the button!");


  $("#buttonFirst").prepend(sign);
}
function buttonTwo() {
  var buttonFirstPage2 = $("<button>");
  buttonFirstPage2.addClass("secondButton btn btn-light btn-lg");
  buttonFirstPage2.text("OMG! Your .js have some bug, Click again Please!")
  $("#buttonFirst").html(buttonFirstPage2);
}
function button3() {
  var buttonFirstPage2 = $("<button>");
  buttonFirstPage2.addClass("thirdButton btn btn-light btn-lg");
  buttonFirstPage2.text("Coding is not easy I told you")
  $("#buttonFirst").html(buttonFirstPage2);
}
function button4() {
  var buttonFirstPage2 = `
<button id="button4" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >Ok I just kidding, 
<br>Click me I'll give you nice recipe </button>`

  //  var buttonFirstPage2 = $("<button>");
  //  buttonFirstPage2.addClass("btn btn-light btn-lg");
  //  buttonFirstPage2.attr("id","button4");
  //  buttonFirstPage2.text("I am 4 buahahaha");
  //  buttonFirstPage2.attr("data-target","#"+exampleModal);
  //  buttonFirstPage2.attr("data-toggle", modal);


  $("#buttonFirst").html(buttonFirstPage2);
}
$(document).on("click", ".firstButton", function () {

  buttonTwo();
})

$(document).on("click", ".secondButton", function () {

  button3();
})
$(document).on("click", ".thirdButton", function () {

  button4();

})

$(document).on("click", "#button4", function () {
  $(".modal").css("display", "block")
  $("#button4").hide();
})

$("#modalClose").on("click", function () {
  console.log("test")
  $(".modal").css("display", "none")
})


function again(){
  var again = $("<h1>");
  again.attr("id","again");
  again.text("Please try again");

  $("#sorryMsg").append(again)
}

$("#button-goback").on("click",function(e){
  e.preventDefault();
  window.location.href = "main.html";
})