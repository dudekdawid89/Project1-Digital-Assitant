// AnimationEvent, this is a jquery event when the date is selected
 
$('#data-date').focusin(function(){
    $('#data-date').datepicker('widget').css({bottom:"-=127"});
  });
  
  $("#data-date").datepicker({
    
    onSelect: function (dateText, inst) {
      $(".scores").empty();
  
       
      var newdate = moment($(this).val(), 'MM/DD/YYYY')
  //Antonine, this is using moment to convert from MM/DD/YYYY to YYYYMMDD for the api
      // console.log(newdate.format("YYYYMMDD"))
  
  //cors-anywhere is to break the security for invalid domain
      var queryURL = "https://cors-anywhere.herokuapp.com/http://data.nba.net//prod/v1/"+newdate.format("YYYYMMDD")+"/scoreboard.json";
      console.log(queryURL)
      $.ajax({
        url: queryURL,
  
        method: "GET"
      }).then(function (response) {
        console.log("test")
        console.log(response);
       
  
        var str="";
  
        //Antonnie this is to create one row with all the columns
        
  for(var i=0;i <response.games.length;i++)
  {
    var tr=$("<tr>")
  
        var td=$("<td class= res style='font-size:17pt'>")
        td.append(" "+response.games[i].vTeam.triCode + "&nbsp; &nbsp; " +response.games[i].vTeam.score +"&nbsp;&nbsp;");
        td.append(" "+response.games[i].hTeam.triCode + " &nbsp; &nbsp; " +response.games[i].hTeam.score +"   " );
         
        tr.append(td)
        $(".scores").append(tr)
   
  }
  
  
   
                    
        
  
        // })
  
        // var scores = $("<div>");
      });
  
      // $("#start").val(date + time.toString(' HH:mm').toString());
      // console.log(date + time.toString(' HH:mm').toString());
    }
  });
  $("#button-goback").on("click",function(e){
    e.preventDefault();
    window.location.href = "main.html";
  })