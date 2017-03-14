/* API Key: ' 432671cad45a2c4cd0b97ddf1fe4adb0
 http://api.brewerydb.com/v2/?apikey=432671cad45a2c4cd0b97ddf1fe4adb0/brewery/KR4X6i

EXAMPLE OF COMMAND-LINE SYNTAX FOR A SINGLE BEER BY NAME
http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale

EXAMPLE OF AJAX SYNTAX FOR A SINGLE BEER BY NAME
'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale'

EXAMPLE OF COMMAND-LINE SYNTAX FOR A SINGLE BREWERY BY NAME
http://api.brewerydb.com/v2/breweries\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=brewdog

EXAMPLE OF AJAX SYNTAX FOR A SINGLE BREWERY BY NAME
http http://api.brewerydb.com/v2/breweries\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=brewdog
*/

/*
 // API key for Mug Match (Face++): ttXPeCMmB4O28qFxZ-M9DuZ8yv2dBB5n
*/

/*
beer endpoint:
name: object.data[1].name
abv: object.data[2].abv
ibu: object.data[2].ibu
description1: object.data[1].description
description2: object.data[2].description
ingredients: data.ingredients

syntax for the get
jQuery.get( url [, data ] [, success ] [, dataType ] )
$.get
*/

// GLOBAL VARIABLES
var objectForGets = {};
var beerNameArray = [];
var beerNameArrayPlain = [];
var brewerNameArray = [];
var brewerNamerArrayPlain = [];

// PULL DATA FROM THE DATA FILE
// Note: beerInfo is the array of objects stored in data.js
function createObjectForGets() {
  var beerNameQuery = '';
  var brewerNameQuery = '';

  // CREATE THE ARRAYS FOR THE AJAX QUERIES: BOTH
  for (let i = 0; i <beerInfo.length; i++) {
    objectForGets.beerName = beerInfo[i].beerName;
    beerNameArrayPlain[i] = (beerInfo[i].beerName);
    beerNameArray[i] = escape(beerInfo[i].beerName);

    objectForGets.brewer = beerInfo[i].brewer;
    brewerNamerArrayPlain[i] = beerInfo[i].brewer
    brewerNameArray[i] = escape(beerInfo[i].brewer);
    console.log('objectForGets', objectForGets);
  }; // for loop

  // FORMULATE THE STRINGS FOR THE AJAX QUERIES: BEER
  for (i = 1; i < beerNameArray.length; i++) {
    beerNameQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\='  + beerNameArray[i];
    console.log('beerNameQuery', beerNameQuery);

    // GET DATA FROM THE BEERS ENDPOINT, USING THE STRINGS JUST CREATED ^
    // $.ajax ({
    //   method: 'GET',
    //   url: beerNameQuery,
    //   success: function (results) {
    //     console.log(this);
    //     console.log("ID ", results.data[0].id);
    //     console.log("Name: ", results.data[0].name);
    //     if (results.data[0].description) {
    //       console.log("description: ", results.data[0].description);
    //     }
    //     else {
    //       console.log("no description available");
    //     }
    //     // console.log("ABV: ", results.data[0].abv);
    //   },
    //   error: function (error) {
    //     console.log("Error: ", error);
    //   }
    // }); // pairs with $.ajax for beers
  } // pairs with the for loop

  //FORMULATE THE STRINGS FOR THE AJAX QUERIES: BREWERIES
  for (i = 1; i < brewerNameArray.length; i++) {
    brewerNameQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/breweries\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\='  + brewerNameArray[i];
    console.log('brewerNameQuery', brewerNameQuery);

    // GET DATA FROM THE BREWERS ENDPOINT, USING THE STRINGS JUST CREATED ^
    // $.ajax ({
    //   method: 'GET',
    //   url: brewerNameQuery,
    //   success: function (results) {
    //     console.log(this);
    //     // console.log("ID ", results.data[0].id);
    //     // console.log("Name: ", results.data[0].name);
    //     // console.log("description: ", results.data[0].description);
    //   },
    //   error: function (error) {
    //     console.log("Error: ", error);
    //   }
    // }); // pairs with $.ajax for brewers
  } // pairs with the for loop for brewers
}; //pairs with function createObjectForGets()

// GENERATE THE HTML FOR THE SEARCH-BY-NAME DROPDOWN
$('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrainWidth: false, // Does not change width of dropdown to that of the activator
     hover: true, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: false, // Displays dropdown below the button
     alignment: 'left', // Displays dropdown with edge aligned to the left of button
     stopPropagation: false // Stops event propagation
   }
 );

$(function() {
  for (var i = 0; i < beerNameArrayPlain.length; i++) {
     var beer = beerNameArrayPlain[i].replace(/\s+/g, '-').toLowerCase();
      $('#list-of-beers').append("<option value='" + beer + "'>" + beerNameArrayPlain[i] + "</option>");
      console.log(("<option value='" + beer + "'>" + beerNameArrayPlain[i] + "</option> \n"));
    }
});


createObjectForGets();

// GENERATE A NEW FEATURED BEER WHEN THE REPLAY BUTTON IS CLICKED
$(function() {
  $('#color-picker').change(function(){
    brushColor = $('#color-picker').val();
    console.log('brushColor', brushColor);
  });
}
// // GET DATA FROM THE BREWERIES ENDPOINT, USING STRINGS JUST CREATED
// $.ajax ({
//   method: 'GET',
//   url: 'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale',
//   success: function (results) {
//     console.log(results);
//     console.log("description: ", results.data[0].description);
//     console.log("ID ", results.data[0].id);
//     console.log("Name: ", results.data[0].name);
//     console.log("ABV: ", results.data[0].abv);
//
//   },
//   error: function (error) {
//     console.log("Error: ", error);
//   }
// });


// WILL NEED A RANDOM-NUMBER GENERATOR FOR PULLING FEATURED BEER
// let size = beerNameArray.length;
// let randomIndex = Math.floor(Math.random() * (size-1));

// WILL NEED A FUNCTION FOR DOING THE AJAX CALL FOR THE RANDOM BEER


// WILL NEED A SORT-BY-STATE DROPDOWN


// WILL NEED A SORT-BY-BEER-NAME DROPDOWN


// WILL NEED A SORT-BY-BREWER DROPDOWN
