/* API Key: ' 432671cad45a2c4cd0b97ddf1fe4adb0
 http://api.brewerydb.com/v2/?apikey=432671cad45a2c4cd0b97ddf1fe4adb0/brewery/KR4X6i

EXAMPLE OF SYNTAX FOR A SINGLE BEER BY NAME
http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale

'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale'
*/

/*
syntax for the get
jQuery.get( url [, data ] [, success ] [, dataType ] )
$.get
*/
$(document).ready(function() {
    $('select').material_select();
});

// GLOBAL VARIABLES
var objectForGets = {};
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

  // CREATE THE ARRAY FOR THE AJAX QUERY BY ID
  for (let i = 0; i <beerInfo.length; i++) {
    objectForGets.beerId = beerInfo[i].beerId;
    beerIdArray[i] = beerInfo[i].beerId;
  };
};

//FORMULATE THE STRINGS FOR THE AJAX QUERIES: BEERID
for (i = 1; i < beerIdArray.length; i++) {
  console.log('beerIdArray[i], beerIdArray[i]');
  beerIdQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/beer\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&withBreweries=Y\&beerId\='  + beerIdArray[i];
};

// GENERATE THE LIST OF ITEMS FOR THE LISTBOX
$('#list-of-beers').on('click', function(e) {
  for (var i = 0; i < beerInfo.length; i++) {
    var beer = beerInfo[i].beerName;
    var beerHyphenated = beer.replace(/\s+/g, '-').toLowerCase();
    $('#list-of-beers').append("<option value='" + beer + "'>" + beer + "</option>");
    console.log(("<option value='" + beerHyphenated + "'>" + beer + "</option> \n"));
  }
})

createObjectForGets();

// GENERATE A NEW FEATURED BEER WHEN THE REPLAY BUTTON IS CLICKED
$('#featured-beer').on('click', function(e) {
    // generate a random # between 0 and array length
    let randomIndex = 0;
    randomIndex = Math.floor(Math.random() * (beerIdArray.length-1));

    // formulate the string for the ajax Query
    beerIdQuery = 'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&withBreweries=Y\&beerId\='  + beerIdArray[randomIndex];

    // update the placeholder image 
    $.ajax ({
      method: 'GET',
      url: beerIdQuery,
      success: function (results) {
        console.log(results);
        var thisName = results.data.name;
        var thisBrewer = results.data.breweries[0].name;
        var thisAbv = results.data.abv;
        var thisIbu = results.data.ibu;
        var thisDescription = results.data.description;
        var backupDescripton = results.data.style.description;
        var thisLocation = results.data.breweries.locations.locality + ', '  + results.data.breweries.locations.region;

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

        // update the information that will show upon card-reveal
        $('.activator').on('click', function(e) {
          if (thisDescription) {
            $(".card-reveal p").html(`<p><b>${thisName}</b></p>` + `<p>${thisDescription}</p>`);
          }
          else {
            $(".card-reveal p").html(`<p><b>${thisName}</b></p>` + `<p>${backupDescription}</p>`);
          }
          });

      },
      error: function (error) {
        console.log("Error: ", error);
      }
    });
  }); // end of function to generate a new featured beer



// WILL NEED A SORT-BY-STATE DROPDOWN
