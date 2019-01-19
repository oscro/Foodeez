$(document).ready(function(){

  console.log("EDAMAM!!!!!!!!!!!!!!!!");
  
  var appId = "fb64e6f4";
  
  var apiKey = "ca1d2e84cd055e2aea3d2b71186fa559";

  

  function displayObjectArry (object) {

      for(var i = 0; i <= object.hits[0].recipe.ingredients.length; i++){
          
          console.log(object.hits[i].recipe.ingredients[i].text);
          
      };

  };
  
  
  $.ajax({
      method: "GET",
      url: "https://api.edamam.com/search?q=chicken&app_id=" + appId + "&app_key=" + apiKey,
      dataType: "json",
      success: function(result) {

        console.log(result);

        displayObjectArry(result);

      },
      error: function() {
        console.log("error");
      }
    });
  
  });