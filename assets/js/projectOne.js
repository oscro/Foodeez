var apiKey = "w1wvrwmG8SQgOz5YXukdzsrC5FPM12g7haW9fRirPG141Gqv2YTbeqbm84u2vcZuMa3tSlZr2RAfc9hSnAzROIa5RsxdLSt41Dg7AXmcC931yBDRsgMSgvuAvIc-XHYx";

var clientId = "70tPFL3C-kkqIjxx66gBdw";

var queryURL = "https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972";

var client = clientId(apiKey);

console.log(client);



$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    
  });