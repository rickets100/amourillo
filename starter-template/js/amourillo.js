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
var beerNameQuery = '';
var brewerNameQuery = '';
var beerIdArray = [];
var beerIdArrayPlain = [];
var beerIdQuery = '';


// PULL DATA FROM THE LOCAL DATA FILE
// Note: beerInfo is the array of objects stored in data.js
function createObjectForGets() {

  // CREATE THE ARRAYS FOR THE AJAX QUERIES (NAME, ID, BREWER)
  for (let i = 0; i <beerInfo.length; i++) {
    objectForGets.beerName = beerInfo[i].beerName;
    beerNameArrayPlain[i] = beerInfo[i].beerName;
    beerNameArray[i] = escape(beerInfo[i].beerName);

    objectForGets.beerId = beerInfo[i].beerId;
    beerIdArray[i] = beerInfo[i].beerId;

    objectForGets.brewer = beerInfo[i].brewer;
    brewerNamerArrayPlain[i] = beerInfo[i].brewer;
    brewerNameArray[i] = escape(beerInfo[i].brewer);
  }; // for loop

  // FORMULATE THE STRINGS FOR THE AJAX QUERIES: BEER
  for (i = 1; i < beerNameArray.length; i++) {
    beerNameQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&withBreweries=Y\&name\='  + beerNameArray[i];
  } // pairs with the for loop

  //FORMULATE THE STRINGS FOR THE AJAX QUERIES: BREWERIES
  for (i = 1; i < brewerNameArray.length; i++) {
    brewerNameQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/breweries\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&withBreweries=Y\&name\='  + brewerNameArray[i];
  } // pairs with the for loop for brewers
}; //pairs with function createObjectForGets()

//FORMULATE THE STRINGS FOR THE AJAX QUERIES: BEERID
for (i = 1; i < beerIdArray.length; i++) {
  console.log('beerIdArray[i], beerIdArray[i]');
  beerIdQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/beer\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&withBreweries=Y\&beerId\='  + beerIdArray[i];
}

// this is currrently-abandoned attempt to get dropdown working
// GENERATE THE HTML FOR THE SEARCH-BY-NAME DROPDOWN
// $('.dropdown-button').dropdown({
//      inDuration: 300,
//      outDuration: 225,
//      constrainWidth: false, // Does not change width of dropdown to that of the activator
//      hover: true, // Activate on hover
//      gutter: 0, // Spacing from edge
//      belowOrigin: false, // Displays dropdown below the button
//      alignment: 'left', // Displays dropdown with edge aligned to the left of button
//      stopPropagation: false // Stops event propagation
//    });

// $(function() {
//   for (var i = 0; i < beerNameArrayPlain.length; i++) {
//      var beer = beerNameArrayPlain[i].replace(/\s+/g, '-').toLowerCase();
//       $('#list-of-beers').append("<option value='" + beer + "'>" + beerNameArrayPlain[i] + "</option>");
//       console.log(("<option value='" + beer + "'>" + beerNameArrayPlain[i] + "</option> \n"));
//     }
// });


createObjectForGets();

// GENERATE A NEW FEATURED BEER WHEN THE REPLAY BUTTON IS CLICKED
$('#featured-beer').on('click', function(e) {
    // generate a random # between 0 and array length
    let randomIndex = 0;
    randomIndex = Math.floor(Math.random() * (beerIdArray.length-1));

    // formulate the string for the ajax Query
    beerIdQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&withBreweries=Y\&beerId\='  + beerIdArray[randomIndex];

    // update the placeholder image <img src="images/small-hops2.jpg">
    $.ajax ({
      method: 'GET',
      url: beerIdQuery,
      success: function (results) {
        console.log(results);
        var thisName = results.data.name;
        var thisBrewer = results.data.breweries[0].name;
        var thisAbv = results.data.abv;
        var thisIbu = results.data.ibu;

        // update the placeholder paragraph
        if (thisAbv) {
          if (thisIbu) {
            // all 4 things get displayed
            $("#featured-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>` + `<p>IBU: ${thisIbu}</p>`);
          }
          else {
            // beer name, brewery & Abv get displayed
            $("#featured-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>`);
          };
        }
        else {
          if (thisIbu) {
            // beer name, brewery and Ibu get displayed
            $("#featured-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>IBU: ${thisIbu}</p>`);
          }
          else {
            // only beer name and brewery get displayed
            $("#featured-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>`);
          };
        };

        // update the image label
        $("#featured-beer-name").remove();

        // update the image
        if (results.data.labels) {
          console.log('labels ', results.data.labels);
          $("#featured-beer-image").attr("src", results.data.labels.medium);
        }
        else {
          $("#featured-beer-image").attr("src", 'images/pint-glass-with-boca-cropped.png');
        }
      },
      error: function (error) {
        console.log("Error: ", error);
      }

    });

    $('.image-as-link.img').on('click', function(e) {
      console.log('hey');
      $(".card-title").html('please work');
      });

  });



// WILL NEED A SORT-BY-STATE DROPDOWN
