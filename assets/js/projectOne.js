console.log("This js is all linked up!");

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

var database = firebase.database().ref("/users");

var userNumber;

// var user = firebase.auth().currentUser;
// console.log(user);

// var name, email, uid;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   uid = user.uid;
// }

// Sign In button click
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById("userEmail").value;
    var password =document.getElementById("userPassword").value;
    if(email.length < 4) {
      console.log("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      console.log("Please enter a password.");
      return;
    }
    // Sign in with email and password
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === "auth/wrong-password") {
        console.log("Wrong password.");
      } else {
        console.log(errorMessage);
      }
      console.log(error);
      document.getElementById("signInButton").disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  document.getElementById("signInButton").disabled = true;
}

// Sign Up button click
function handleSignUp() {
  var email = document.getElementById("userEmail").value;
  var password = document.getElementById("userPassword").value;
  if (email.length < 4) {
    console.log("Enter an email address.");
    return;
  }
  if (password.length < 4) {
    console.log("Enter a password.");
    return;
  }

  // Sign in with email and password
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Error here
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == "auth/weak-password") {
      console.log("Weak password.");
    } else {
      console.log(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]

  var addDataBase = database.push();

  addDataBase.set({
    email: email,
  });

}

// initApp handles setting up UI event listeners and registering Firebase auth listeners
function initApp() {
  // Listen for auth state change
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User signed in
      var displayName = user.displayName;
      var email = user.email;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      document.getElementById("signInButton").textContent = ("Sign Out");
      document.getElementById("signInHome").textContent = ("Sign Out");
      // [END_EXCLUDE]    
    } else {
      // User is signed out
      // [START_EXCLUDE]
      document.getElementById("signInButton").textContent = ("Sign In");
      document.getElementById("signInHome").textContent = ("Sign In");
      // [END_EXCLUDE]
    }
    document.getElementById("signInButton").disabled = false;

    console.log(displayName);
    console.log(email);
    if (email !== undefined) {
      document.getElementById("signInHome").textContent = (email);
    } else {
      document.getElementById("signInHome").textContent = ("Sign In")
    }
    console.log(uid);
    console.log(providerData);

  });
  // [END authstatelistener]
  document.getElementById("signInButton").addEventListener("click", toggleSignIn, false);
  document.getElementById("signUpButton").addEventListener("click", handleSignUp, false);
}
window.onload = function() {
  initApp();
};

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

          var newRow = $("<div>").attr("class", "row bg-light text-center");

          for (var i = 0; i < 3; i++) {
            var newColumn = $("<div>").attr("class", "col-4");
            var rest = result.restaurants[i].restaurant;
            var name = rest.name;
            var cost = rest.average_cost_for_two;
            var location = rest.location.address;
            var rating = rest.user_rating.aggregate_rating;
            $(newColumn).html(name + "<br/>" + "$" + cost + " for two" + "<br/>" + location + "<br/>" + "Rating " + rating);

            $("#resultDiv").append(newRow);
            $(newRow).append(newColumn);
          }

          $("#cuisineSearchBar").val("");
          $("#localeSearchBar").val("");


          // $("#resultDiv").html(restOne.name + "<br/>" + "$" + restOne.average_cost_for_two + " for two" + "<br/>" + restOne.location.address + "<br/>" + "Rating " + restOne.user_rating.aggregate_rating);
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
