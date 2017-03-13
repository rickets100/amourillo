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

// PULL DATA FROM THE DATA FILE
function createObjectForGets() {
  var objectForGets = {};
  var beerNameArray = [];
  var brewerNameArray = [];
  var beerNameQuery = ''
  for (let i = 0; i <beerInfo.length; i++) {
    objectForGets.beerName = beerInfo[i].beerName;
    beerNameArray[i] = escape(beerInfo[i].beerName);
    // objectForGets.brewer = beerInfo[i].brewer;
    // brewerNameArray[i] = beerInfo[i].brewer;
    // console.log('objectForGets', objectForGets);
  };
  //FORMULATE THE STRINGS FOR THE AJAX QUERIES
  for (i = 0; i < 3; i++) {

    beerNameQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\='  + beerNameArray[i];
    console.log('beernamearray[i]', beerNameArray[i]);
    console.log('beerNameQuery', beerNameQuery);

  // GET DATA FROM THE BEERS ENDPOINT, USING THE STRINGS JUST CREATED ^
  $.ajax ({
    method: 'GET',
    url: beerNameQuery,
    success: function (results) {
      console.log('results', results);
      // console.log("description1: ", results.data[0].description);
      console.log("ID ", results.data[i].id);
      console.log("Name: ", results.data[i].name);
      // console.log("ABV: ", results.data[0].abv);
    },
    error: function (error) {
      console.log("Error: ", error);
    }
  }); // pairs with $.ajax ({
}
}; //pairs with function createObjectForGets()

createObjectForGets();

// // GET DATA FROM THE BEERS ENDPOINT
// $.ajax ({
//   method: 'GET',
//   url: 'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale',
//   success: function (results) {
//     console.log(results);
//     console.log("description1: ", results.data[0].description);
//     console.log("ID ", results.data[0].id);
//     console.log("Name: ", results.data[0].name);
//     console.log("ABV: ", results.data[0].abv);
//
//   },
//   error: function (error) {
//     console.log("Error: ", error);
//   }
// });

// GET DATA FROM THE BREWERIES ENDPOINT
// $.ajax ({
//   method: 'GET',
//   url: 'https://crossorigin.me/http://api.brewerydb.com/v2/breweries\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=Elysian',
//   success: function (results) {
//     console.log(results);
//   },
//   error: function (error) {
//     console.log("Error: ", error);
//   }
// });


// WILL NEED A RANDOM-NUMBER GENERATOR FOR PULLING FEATURED BEER


// WILL NEED A FUNCTION FOR DOING THE AJAX CALL FOR THE RANDOM BEER


// WILL NEED A SORT-BY-STATE DROPDOWN


// WILL NEED A SORT-BY-BEER-NAME DROPDOWN


// WILL NEED A SORT-BY-BREWER DROPDOWN
