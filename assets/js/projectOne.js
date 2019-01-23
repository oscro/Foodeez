// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHonm8D-x8rwzlmmREf8PXIMCixe7h-AA",
  authDomain: "foodeez-38531.firebaseapp.com",
  databaseURL: "https://foodeez-38531.firebaseio.com",
  projectId: "foodeez-38531",
  storageBucket: "foodeez-38531.appspot.com",
  messagingSenderId: "502818216303"
};

firebase.initializeApp(config);

var database = firebase.database();

console.log("This js is all linked up!");

var cuisine = "";
var locale = "";

$(".cuisine-item").on("click", function() {
  console.log($(this).val());
  $("#cuisineSearchBar").val($(this).val());
});

$(".locale-item").on("click", function() {
  console.log($(this).val());
  $("#localeSearchBar").val($(this).val());
});

$("#userSubmit").on("click", function(e) {
  event.preventDefault(e);

  cuisine = $("#cuisineSearchBar").val();

  locale = $("#localeSearchBar").val();

  if (cuisine === "" || locale === "") {
    return;
  }

  console.log(cuisine);
  console.log(locale);

  $.ajax({
    method: "GET",
    crossDomain: true,
    url: "https://developers.zomato.com/api/v2.1/locations?query=" + locale,
    dataType: "json",
    async: true,
    headers: {
      "user-key": "482b50d967243f8b099277473c602735"
    },

    success: function(data) {
      console.log(data);
      locale = data.location_suggestions[0].city_id;
      console.log(locale);

      $.ajax({
        method: "GET",
        crossDomain: true,
        url:
          "https://developers.zomato.com/api/v2.1/search?entity_id=" +
          locale +
          "&entity_type=city&q=" +
          cuisine,
        dataType: "json",
        async: true,
        headers: {
          "user-key": "482b50d967243f8b099277473c602735"
        },

        success: function(result) {
          console.log(result);
          var restOne = result.restaurants[0].restaurant;
          console.log(restOne.name);
          console.log("$" + restOne.average_cost_for_two + " for two");
          console.log(restOne.location.address);
          console.log(restOne.location.city);
          console.log("zipcode " + restOne.location.zipcode);
          console.log("Rating " + restOne.user_rating.aggregate_rating);
          console.log("- - - - - - - - - -");
          cuisine = "";
          $("#cuisineSearchBar").val("");
          $("#localeSearchBar").val("");
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
