

function createListItems (beerInfo) {
  var listItem = '';

  $.each(beerInfo, function(key, value) {
    beer = beerInfo.beerName;
    brewer = beerInfo.brewer;
    listItem = beer + ' - ' + brewer;
    console.log('createListItems', listItem);

  })
}
