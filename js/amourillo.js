// KAY KREWSON GALVANIZE SEATTLE G48 Q1 PROJECT

// FUNCTION TO SORT THE DATASET
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

// FUNCTION TO CREATE THE QUERY STRING
function makeQuery(param) {
  let proxy = 'https://galvanize-cors-proxy.herokuapp.com/';
  let beerApi = 'https://api.brewerydb.com/v2/beers/';
  let apiKey = '\?key\=432671cad45a2c4cd0b97ddf1fe4adb0';
  let brewInfo = '\&withBreweries=Y';
  let thisQuery = `${proxy}${beerApi}${apiKey}${param}${brewInfo}`;

  return thisQuery;
}

// FUNCTION TO UPDATE THE CARD TEXT
function updateCardText(beer, brewer, abv, ibu, card) {
  let basicInfo = `<p><b>${beer}</b></p>` + `<p><i>${brewer}</i></p>`;

  if (abv) {
    if (ibu) {
      // all 4 things get displayed
      $(card).html(basicInfo + `<p>ABV: ${abv}</p>` + `<p>IBU: ${ibu}</p>`);
    }
    else {
      // beer name, brewery & Abv get displayed
      $(card).html(basicInfo + `<p>ABV: ${abv}%</p>`);
    };
  }
  else {
    if (ibu) {
      // beer name, brewery and Ibu get displayed
      $(card).html(basicInfo + `<p>IBU: ${ibu}</p>`);
    }
    else {
      // only beer name and brewery get displayed
      $(card).html(basicInfo);
    };
  };
};

// FUNCTION TO UPDATE THE CARD IMAGE
function updateCardImage(label, imageAtt, imageClass) {
  let defaultBeerImage = 'images/pint-glass-with-boca-cropped-525x350.png';
  if (label) {
    $(imageAtt).attr('src', label.medium);
    $(imageClass).addClass('hoverable');
  }
  else {
    $(imageAtt).attr('src', defaultBeerImage);
    $(imageClass).addClass('hoverable');
  }
};

// FUNCTION TO DO THE CARD REVEAL
function cardReveal(target, name, description, backup) {
  $('.activator').on('click', function(e) {
    if (description) {
      $(target).html(`<p><b>${name}</b></p>` + `<p>${description}</p>`);
    }
    else {
      $(target).html(`<p><b>${name}</b></p>` + `<p>No description is available for this beer, but you can read about the type: ${backup}</p>`);
    };
  });
};

// FUNCTION TO DISPLAY THE SELECT BOX'S CHOSEN-BEER INFO
$('#list-of-beers').on('change', function(e) {
  let selectedBeerId = $(this).children(':selected').attr('id');
  let beerId = `\&beerId\=${selectedBeerId}`
  let beerIdQuery = makeQuery(beerId);
  let thisCard = '#selected-beer-data';

  // MAKE THE QUERY
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
      var label = obj.labels;

      // UPDATE THE CARD TEXT (MAIN PARAGRAPH)
      updateCardText(thisName, thisBrewer, thisAbv, thisIbu, thisCard);

      // UPDATE THE IMAGE LABEL
      $('#selected-beer-name').remove();
      updateCardImage(label,'#selected-beer-image','#left-image');

      // DO THE CARD REVEAL
      cardReveal('#left-card p', thisName, thisDescription, backupDescription);
    },
    error: function (error) {
    }
  });
  $('#modal-listbox').modal('close');
});


// FUNCTION TO RANDOMLY GENERATE A NEW FEATURED BEER
$('#featured-beer').on('click', function(e) {
  let randomIndex = Math.floor(Math.random() * (beerInfo.length-1));
  let randomBeerId = beerInfo[randomIndex].beerId;
  let beerId = `\&beerId\=${randomBeerId}`;
  let beerIdQuery = makeQuery(beerId);
  let thisCard = '#featured-beer-data';

  // MAKE THE QUERY
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
      var label = obj.labels;

      // UPDATE THE CARD TEXT (MAIN PARAGRAPH)
      updateCardText(thisName, thisBrewer, thisAbv, thisIbu, thisCard);

      // UPDATE THE IMAGE LABEL
      $('#featured-beer-name').remove();
      updateCardImage(label,'#featured-beer-image','#right-image');

      // DO THE CARD-REVEAL
      cardReveal('#right-card p', thisName, thisDescription, backupDescription);
    },
    error: function (error) {
    }
  });
});

$('select').material_select();
$('.modal').modal();   // $('.modal, .othermodal').modal();

// FUNCTION TO MAKE THE CENTER MODAL GO AWAY IF CLICKED
$('#modal1').on('click', function(e) {
  $('#modal1').modal('close');
});
