/* API Key: ' 432671cad45a2c4cd0b97ddf1fe4adb0
http://api.brewerydb.com/v2/?apikey=432671cad45a2c4cd0b97ddf1fe4adb0/brewery/KR4X6i

EXAMPLES OF SYNTAX:
https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale

'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale'
*/

$(document).ready(function() {
  $('select').material_select();
  $('.modal').modal();
});

// GLOBAL VARIABLES
var objectForGets = {};
var beerIdArray = [];

// ++SORT THE DATASET, THEN GENERATE NAMES FOR THE LISTBOX/SELECTBOX
function createListBoxItems (beerInfo) {
  let sortedBeers = beerInfo.sort(function compare(beer1,beer2) {
  let beer1Name = beer1.beerName + ' - ' + beer1.brewer;
  let beer2Name = beer2.beerName + ' - ' + beer2.brewer;

  if (beer1Name < beer2Name)
    return -1;
  if (beer1Name > beer2Name)
    return 1;
  return 0;
  });

  $.each(sortedBeers, function(key, value) {
    let beer = sortedBeers[key].beerName;
    let brewer = sortedBeers[key].brewer;
    let id = sortedBeers[key].beerId;
    let nameAsDisplayed = beer + ' - ' + brewer;
    let listBoxHtml = '<option value="' + beer + '" id=' + id + '>' + nameAsDisplayed + '</option>';

    $('#list-of-beers').append(listBoxHtml);
  });
};

// ++PULL THE ID FOR THE SELECTED ITEM
function getIdFromListBox() {
  var selectedBeerId = $(this).children(':selected').attr('id');
  // console.log(selectedBeerId);
}

// PULL DATA FROM THE LOCAL DATA FILE
// Note: beerInfo is the array of objects stored in data.js. My plan is to be able to replace it with data pulled from a database when we reach that part of the course - as a way to help myself practice
function createObjectForGets() {

  // CREATE THE ARRAY FOR THE AJAX QUERY BY ID
  for (let i = 0; i <beerInfo.length; i++) {
    objectForGets.beerId = beerInfo[i].beerId;
    beerIdArray[i] = beerInfo[i].beerId;
  };
};

createObjectForGets();
createListBoxItems(beerInfo);

// FUNCTION TO DISPLAY THE CHOSEN BEER'S INFO WHEN CHOSEN IN THE SELECT BOX
$('#list-of-beers').on('change', function(e) {
  let proxy = 'https://galvanize-cors-proxy.herokuapp.com/';
  let beerApi = 'https://api.brewerydb.com/v2/beers/';
  let apiKey = '\?key\=432671cad45a2c4cd0b97ddf1fe4adb0';
  let selectedBeerId = $(this).children(':selected').attr('id');
  let beerId = `\&beerId\=${selectedBeerId}`
  let params = '\&withBreweries=Y';

  // FORMULATE THE QUERY
  let beerIdQuery = `${proxy}${beerApi}${apiKey}${beerId}${params}`;

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

      // UPDATE THE PLACEHOLDER PARAGRAPH
      if (thisAbv) {
        if (thisIbu) {
          // all 4 things get displayed
          $('#selected-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>` + `<p>IBU: ${thisIbu}</p>`);
        }
        else {
          // beer name, brewery & Abv get displayed
          $('#selected-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>`);
        };
      }
      else {
        if (thisIbu) {
          // beer name, brewery and Ibu get displayed
          $('#selected-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>IBU: ${thisIbu}</p>`);
        }
        else {
          // only beer name and brewery get displayed
          $('#selected-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>`);
        };
      };

      // UPDATE THE IMAGE LABEL
      $('#selected-beer-name').remove();

      // UPDATE THE IMAGE
      if (results.data.labels) {
        $('#selected-beer-image').attr('src', results.data.labels.medium);
        $('#left-image').addClass('hoverable');
      }
      else {
        $('#selected-beer-image').attr('src', 'images/pint-glass-with-boca-cropped-525x350.png');
        $('#left-image').addClass('hoverable');
      }

      // UPDATE THE INFORMATION THAT WILL SHOW UPON CARD REVEAL
      $('.activator').on('click', function(e) {
        if (thisDescription) {
          $('#left-card p').html(`<p><b>${thisName}</b></p>` + `<p>${thisDescription}</p>`);
        }
        else {
          $('#left-card p').html(`<p><b>${thisName}</b></p>` + `<p>No description is available for this beer, but you can read about the type: ${backupDescription}</p>`);
        }
      });
    },
    error: function (error) {
    }
  });
  $('#modal-listbox').modal('close');
}); // end of function to display the chosen beer


// FUNCTION TO RANDOMLY GENERATE A NEW FEATURED BEER
$('#featured-beer').on('click', function(e) {
  let randomIndex = Math.floor(Math.random() * (beerIdArray.length-1));
  let proxy = 'https://galvanize-cors-proxy.herokuapp.com/';
  let beerApi = 'https://api.brewerydb.com/v2/beers/';
  let apiKey = '\?key\=432671cad45a2c4cd0b97ddf1fe4adb0';
  let params = '\&withBreweries=Y';
  let beerId = `\&beerId\=${beerIdArray[randomIndex]}`;
  let beerIdQuery = `${proxy}${beerApi}${apiKey}${beerId}${params}`;

  // UPDATE THE PLACEHOLDER IMAGE
  $.ajax ({
    method: 'GET',
    url: beerIdQuery,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Access-Control-Allow-Headers', '*' );
    },
    success: function(results) {
      var thisName = results.data.name;
      var thisBrewer = results.data.breweries[0].name;
      var thisAbv = results.data.abv;
      var thisIbu = results.data.ibu;
      var thisDescription = results.data.description;
      var backupDescription = results.data.style.description;

      // UPDATER THE PLACEHOLDER PARAGRAPH
      if (thisAbv) {
        if (thisIbu) {
          // all 4 things get displayed
          $('#featured-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>` + `<p>IBU: ${thisIbu}</p>`);
        }
        else {
          // beer name, brewery & Abv get displayed
          $('#featured-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>ABV: ${thisAbv}</p>`);
        };
      }
      else {
        if (thisIbu) {
          // beer name, brewery and Ibu get displayed
          $('#featured-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>` + `<p>IBU: ${thisIbu}</p>`);
        }
        else {
          // only beer name and brewery get displayed
          $('#featured-beer-data').html(`<p><b>${thisName}</b></p>` + `<p><i>${thisBrewer}</i></p>`);
        };
      };

      // update the image label
      $('#featured-beer-name').remove();

      // update the image
      if (results.data.labels) {
        $('#featured-beer-image').attr('src', results.data.labels.medium);
        $('#right-image').addClass('hoverable');

      }
      else {
        $('#featured-beer-image').attr('src', 'images/pint-glass-with-boca-cropped-525x350.png');
        $('#right-image').addClass('hoverable');
      }

      // UPDATE THE INFORMATION THAT WILL DISPLAY UPON CARD-REVEAL
      $('.activator').on('click', function(e) {
        if (thisDescription) {
          $('#right-card p').html(`<p><b>${thisName}</b></p>` + `<p>${thisDescription}</p>`);
        }
        else {
          $('#right-card p').html(`<p><b>${thisName}</b></p>` + `<p>No description is available for this beer, but you can read about the type: ${backupDescription}</p>`);
        }
      });
    },
    error: function (error) {
    }
  });
}); // end of function to randomly generate a new featured beer

$('#modal1').on('click', function(e) {
  $('#modal1').modal('close');
});
