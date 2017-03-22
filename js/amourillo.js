/* API Key: ' 432671cad45a2c4cd0b97ddf1fe4adb0
http://api.brewerydb.com/v2/?apikey=432671cad45a2c4cd0b97ddf1fe4adb0/brewery/KR4X6i

EXAMPLES OF SYNTAX:
https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale

'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale'
*/

// SORT THE DATASET
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

  // GENERATE NAMES FOR THE LISTBOX/SELECTBOX
  $.each(sortedBeers, function(key, value) {
    let beer = sortedBeers[key].beerName;
    let brewer = sortedBeers[key].brewer;
    let id = sortedBeers[key].beerId;
    let nameAsDisplayed = beer + ' - ' + brewer;
    let listBoxHtml = '<option value="' + beer + '" id=' + id + '>' + nameAsDisplayed + '</option>';

    $('#list-of-beers').append(listBoxHtml);
  });
};

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
      var obj = results.data;
      var thisName = obj.name;
      var thisBrewer = obj.breweries[0].name;
      var thisAbv = obj.abv;
      var thisIbu = obj.ibu;
      var thisDescription = obj.description;
      var backupDescription = obj.style.description;

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
      if (obj.labels) {
        $('#selected-beer-image').attr('src', obj.labels.medium);
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
  let proxy = 'https://galvanize-cors-proxy.herokuapp.com/';
  let beerApi = 'https://api.brewerydb.com/v2/beers/';
  let apiKey = '\?key\=432671cad45a2c4cd0b97ddf1fe4adb0';
  let params = '\&withBreweries=Y';
  let randomIndex = Math.floor(Math.random() * (beerInfo.length-1));
  let randomBeerId = beerInfo[randomIndex].beerId;
  let beerId = `\&beerId\=${randomBeerId}`;
  let beerIdQuery = `${proxy}${beerApi}${apiKey}${beerId}${params}`;

  // UPDATE THE PLACEHOLDER IMAGE
  $.ajax ({
    method: 'GET',
    url: beerIdQuery,
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Access-Control-Allow-Headers', '*' );
    },
    success: function(results) {
      var obj = results.data;
      var thisName = obj.name;
      var thisBrewer = obj.breweries[0].name;
      var thisAbv = obj.abv;
      var thisIbu = obj.ibu;
      var thisDescription = obj.description;
      var backupDescription = obj.style.description;

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
      if (obj.labels) {
        $('#featured-beer-image').attr('src', obj.labels.medium);
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

$('select').material_select();
$('.modal').modal();   // $('.modal, .othermodal').modal();

$('#modal1').on('click', function(e) {
  $('#modal1').modal('close');
});
