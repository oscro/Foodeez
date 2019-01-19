console.log("This js is all linked up!");

var userCuisineSelector = $("#cuisineSelector");

var localeSelector = $("#localeSelector");

$("#userSubmit").on("click", function(e) {
  event.preventDefault(e);

  var cuisine = userCuisineSelector.val();
  var locale = localeSelector.val();

  console.log(cuisine);
  console.log(locale);

  $.ajax({
    method: "GET",
    crossDomain: true,
    url:
      "https://developers.zomato.com/api/v2.1/locations?query=" + locale,
    dataType: "json",
    async: true,
    headers: {
      "user-key": "482b50d967243f8b099277473c602735"
    },

    success: function(data) {
      console.log(data);
      locale = data.location_suggestions[0].city_id;

      $.ajax({
        method: "GET",
        crossDomain: true,
        url:
          "https://developers.zomato.com/api/v2.1/search?entity_id=" + locale + "&entity_type=city&q=" + cuisine,
        dataType: "json",
        async: true,
        headers: {
          "user-key": "482b50d967243f8b099277473c602735"
        },

        success: function(result) {
          console.log(result);

        },

        error: function() {
          console.log("error");
        }
      });
    },
    
    error: function() {
      console.log("error");
    }
  });
});
