AMOURILLO
all things related to the amarillo hop


GOALS
Create something that can be added-to and amended as I learn new skills.

Constrain the scope.

Improve jQuery comfort-level and skills.

Learn  a few new general CSS/HTML skills, but don’t spend too much time tweaking.



FEATURES
Utilizes the Materialize framework.

Allows the user to pick a specific beer and then populates the card with info from breweryDB. The user can bring-up additional information by clicking on the image to trigger a card reveal.

Allows the user to bring up details about the amarillo hop in a modal that is launched via a button, and dismissed on click.

Allows the user to have a random beer chosen for them, then populates the card with info from breweryDB. The user can bring-up additional information by clicking on the image to trigger a card reveal.


UNDER THE HOOD
Sample object from the local data structure:
{
brewer: 'Ale Asylum',
beerName: 'Ballistic IPA',
beerId: 'MOaHtz',
beerType: 'American IPA',
beerAbv: '7.5',
beerIbu: '',
beerDescription: 'American IPA which uses Amarillo for flavoring and aroma.',
breweryCity: 'Madison',
breweryState: 'WI',
breweryCountry: 'USA',
otherHops: ''
},

USED: JAVASCRIPT, JQUERY, HTML, CSS


CHALLENGES
Materialize was completely new to me.

Original search arrays only worked in some cases (had to rewrite as search by id).

Actions on one card would affect the display of the other (had to use IDs instead of classes to target them).


LESSONS LEARNED
Structuring the data - crucial to get this right, worth putting a lot of thought into.

Organizing the code - I wound up with a lot of duplicate code due to the overlap in behavior of the left and right cards. Refactoring definitely in my future.

New to me:  the .escape JavaScript function!
