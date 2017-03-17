/* API Key: ' 432671cad45a2c4cd0b97ddf1fe4adb0
http://api.brewerydb.com/v2/?apikey=432671cad45a2c4cd0b97ddf1fe4adb0/brewery/KR4X6i

EXAMPLE OF SYNTAX:
http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale

'https://crossorigin.me/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale'

syntax for the get
jQuery.get( url [, data ] [, success ] [, dataType ] )
$.get
*/

$(document).ready(function() {
  $('select').material_select();
  $('.modal').modal();
});

// GLOBAL VARIABLES
var objectForGets = {};
var beerNameArrayPlain = [];
var brewerNameArray = [];
var brewerNameArrayPlain = [];
var beerNameQuery = '';
var brewerNameQuery = '';
var beerIdArray = [];
var beerIdArrayPlain = [];


// PULL DATA FROM THE LOCAL DATA FILE
// Note: beerInfo is the array of objects stored in data.js. My plan is to be able to replace it with data pulled from a database when we reach that part of the course - as a way to help myself practice
function createObjectForGets() {

  // CREATE THE ARRAY FOR THE AJAX QUERY BY ID
  for (let i = 0; i <beerInfo.length; i++) {
    objectForGets.beerId = beerInfo[i].beerId;
    beerIdArray[i] = beerInfo[i].beerId;
  };
};

// CREATE THE ARRAY FOR THE LISTBOX
for (let i = 0; i <beerInfo.length; i++) {
  objectForGets.beerName = beerInfo[i].beerName;
  beerNameArrayPlain[i] = beerInfo[i].beerName;
  brewerNameArrayPlain[i] = beerInfo[i].brewer;
};

// SORT THE LIST OF ITEMS FOR THE LISTBOX, THEN GENERATE HTML
beerNameArrayPlain.sort();
function createListOfBeers() {
  for (var i = 0; i < beerNameArrayPlain.length; i++) {
    var beer = beerNameArrayPlain[i];
    var beerFull = (beerNameArrayPlain[i] + ' - ' + brewerNameArrayPlain[i]);
    var beerHyphenated = beer.replace(/\s+/g, '-').toLowerCase();

    $('#list-of-beers').append("<option value='" + beer + "' id=" + beerInfo[i].beerId + ">" + beerFull + "</option>");
  }
};

createObjectForGets();
createListOfBeers();

// DISPLAY THE CHOSEN BEER'S INFO WHEN CHOSEN IN THE SELECT BOX
$('#list-of-beers').on('change', function(e) {
  let selectedBeer = $('#list-of-beers').val();
  let crossorigin = 'https://crossorigin.me/';
  let proxy = 'https://galvanize-cors-proxy.herokuapp.com/';
  let beerApi = 'https://api.brewerydb.com/v2/beers/';
  let apiKey = '\?key\=432671cad45a2c4cd0b97ddf1fe4adb0';
  let params = '\&withBreweries=Y';
  let beerId;


  // GET THE KEY FOR THE SELECTED ITEM (FROM LOCAL DATA STRUCTURE)
  for (let i = 0; i<beerInfo.length; i++) {

    if (beerInfo[i].beerName === selectedBeer) {
      beerId = `\&beerId\=${beerInfo[i].beerId}`;
      console.log('beerId', beerId);
    }
  }
  console.log('key is ', $('#list-of-beers').val());
  let beerIdQuery = `${proxy}${beerApi}${apiKey}${beerId}${params}`;
  console.log('query string', beerIdQuery);

  $.ajax ({
    method: 'GET',
    url: beerIdQuery,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    },
    success: function(results) {
      var thisName = results.data.name;
      var thisBrewer = results.data.breweries[0].name;
      var thisAbv = results.data.abv;
      var thisIbu = results.data.ibu;
      var thisDescription = results.data.description;
      var backupDescription = results.data.style.description;

      // update the placeholder paragraph
      if (thisAbv) {
        if (thisIbu) {
          // all 4 things get displayed
          $("#selected-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>` + `<p>IBU: ${thisIbu}</p>`);
        }
        else {
          // beer name, brewery & Abv get displayed
          $("#selected-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>`);
        };
      }
      else {
        if (thisIbu) {
          // beer name, brewery and Ibu get displayed
          $("#selected-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>IBU: ${thisIbu}</p>`);
        }
        else {
          // only beer name and brewery get displayed
          $("#selected-beer-data").html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>`);
        };
      };

      // update the image label
      $("#selected-beer-name").remove();

      // update the image
      if (results.data.labels) {
        $("#selected-beer-image").attr("src", results.data.labels.medium);
      }
      else {
        $("#selected-beer-image").attr("src", 'images/pint-glass-with-boca-cropped-525x350.png');
      }

      // UPDATE THE INFORMATION THAT WILL SHOW UPON CARD REVEAL
      console.log(beerIdQuery);

      $('.activator').on('click', function(e) {
        if (thisDescription) {
          $("#left-card p").html(`<p><b>${thisName}</b></p>` + `<p>${thisDescription}</p>`);
        }
        else {
          $("#left-card p").html(`<p><b>${thisName}</b></p>` + `<p>No description is available for this beer, but you can read about the type: ${backupDescription}</p>`);
        }
      });
    },
    error: function (error) {
    }
  });
}); // end of function to generate the selected beer



// GENERATE A NEW FEATURED BEER WHEN THE REPLAY BUTTON IS CLICKED
$('#featured-beer').on('click', function(e) {
  let randomIndex = Math.floor(Math.random() * (beerIdArray.length-1));
  let crossorigin = 'https://crossorigin.me/';
  let proxy = 'https://galvanize-cors-proxy.herokuapp.com/';
  let beerApi = 'https://api.brewerydb.com/v2/beers/';
  let apiKey = '\?key\=432671cad45a2c4cd0b97ddf1fe4adb0';
  let params = '\&withBreweries=Y';
  let beerId = `\&beerId\=${beerIdArray[randomIndex]}`;
  let beerIdQuery = `${proxy}${beerApi}${apiKey}${beerId}${params}`;

  // update the placeholder image
  $.ajax ({
    method: 'GET',
    url: beerIdQuery,
    beforeSend: function(xhr) {
      xhr.setRequestHeader( 'Access-Control-Allow-Headers', '*' );
    },
    success: function(results) {
      var thisName = results.data.name;
      var thisBrewer = results.data.breweries[0].name;
      var thisAbv = results.data.abv;
      var thisIbu = results.data.ibu;
      var thisDescription = results.data.description;
      var backupDescription = results.data.style.description;
      console.log(results);

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
        $("#featured-beer-image").attr("src", results.data.labels.medium);
      }
      else {
        $("#featured-beer-image").attr("src", 'images/pint-glass-with-boca-cropped-525x350.png');
      }

      console.log(beerIdQuery);
      // update the information that will show upon card-reveal
      $('.activator').on('click', function(e) {
        if (thisDescription) {
          $("#right-card p").html(`<p><b>${thisName}</b></p>` + `<p>${thisDescription}</p>`);
        }
        else {
          $("#right-card p").html(`<p><b>${thisName}</b></p>` + `<p>No description is available for this beer, but you can read about the type: ${backupDescription}</p>`);
        }
      });
    },
    error: function (error) {
    }
  });
}); // end of function to generate a new featured beer

$("#modal1").on('click', function(e) {
  $('#modal1').modal('close');
});
