/* API Key: ' 432671cad45a2c4cd0b97ddf1fe4adb0
http://api.brewerydb.com/v2/?apikey=432671cad45a2c4cd0b97ddf1fe4adb0/brewery/KR4X6i

EXAMPLES OF SYNTAX:
https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale

'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=amarillo%20Pale%20Ale'
*/



function createListItems (beerInfo) {
  var listItem = '';

  $.each(beerInfo, function(key, value) {
    beer = beerInfo.beerName;
    brewer = beerInfo.brewer;
    listItem = beer + ' - ' + brewer;
    console.log('createListItems', listItem);

  })
}
