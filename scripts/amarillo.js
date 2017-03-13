/* API Key: ' 432671cad45a2c4cd0b97ddf1fe4adb0
 http://api.brewerydb.com/v2/?apikey=432671cad45a2c4cd0b97ddf1fe4adb0/brewery/KR4X6i

 http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale

 http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=hopzilla

*/

/*
 // API key for Mug Match (Face++): ttXPeCMmB4O28qFxZ-M9DuZ8yv2dBB5n
*/

/*
beer abv: data.abv
beer description: data.description
beer name: data.name
beer ingredients: data.ingredients
beer type: data.style.name
beer ibu: data.style.ibuMax

syntax for the get
jQuery.get( url [, data ] [, success ] [, dataType ] )
$.get
*/

var beerInfo = [
{
brewer: 'Three Floyds',
beerName: 'Gumballhead',
beerType: 'American Wheat Beer',
beerAbv: '5.6',
beerIbu: '35',
breweryCity: 'Munster',
breweryState: 'IN',
breweryCountry: 'USA',
beerDescription: 'American Wheat Beer, single-hopped with Amarillo hops. Crisp and fruity with notes of orange and grapefruit.',
otherHops: 'None'
},

{
brewer: 'Block 15',
beerName: 'Print Master’s Pale Ale',
beerType: 'American Pale Ale',
beerAbv: '5.5',
beerIbu: '34',
breweryCity: 'Corvallis',
breweryState: 'OR',
beerDescription: 'American Pale Ale brewed with 100 Amarillo hops.',
breweryCountry: 'USA',
otherHops: 'None'
}]

console.log(escape("testing access to array of objects", beerInfo[0].brewer));



// GET DATA FOR A SINGLE BEER
$.ajax ({
  method: 'GET',
  url: 'http://api.brewerydb.com/v2/beers\?key\=432671cad45a2c4cd0b97ddf1fe4adb0\&name\=juniper%20Pale%20Ale',
  success: function (results) {
    console.log("Done: ", results);
  },
  error: function (error) {
    console.log("Error: ", error);
  }
});

// WILL NEED A RANDOM-NUMBER GENERATOR FOR PULLING BEER TO features


// WILL NEED A FUNCTION FOR DOING THE AJAX CALL FOR THE RANDOM BEER


// WILL NEED A SORT-BY-STATE DROPDOWN

// WILL NEED A SORT-BY-BEER-NAME DROPDOWN

// WILL NEED A SORT-BY-BREWER DROPDOWN
