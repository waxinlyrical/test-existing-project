
const yargs = require( 'yargs' );
const axios = require( 'axios');

const mapAPIURLRoot = 'https://maps.googleapis.com/maps/api/geocode/json?';
const chinGoogleAPIKey = 'AIzaSyBfvORQdIUMAysaBpc865k82O9z__KUT50';
const chinDarkSkyAPIKey = 'fe92fe7fc6d54b03aec3b553ef79ac5e';


const argv = yargs
.options({
  a:{
    demand: true,
    alias: 'address',
    describe: 'Address of location to get weather info on',
    string: true,
  }
})
.help()
.alias( 'help', 'h' )
.argv;


var constructedURLString = mapAPIURLRoot + 'key=' + chinGoogleAPIKey + '&' + 'address=' + encodeURIComponent( argv.address );

axios.get( constructedURLString ).then( ( response ) => {
  if ( response.data.status === 'ZERO_RESULTS' ){
    throw new Error( 'Unable to find that address' );
  }

  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var darkSkyconstructedURLString = `https://api.darksky.net/forecast/${ chinDarkSkyAPIKey }/${ latitude },${ longitude }`;

  console.log( `Formatted address: ${response.data.results[0].formatted_address}` );
  return axios.get( darkSkyconstructedURLString );
} )
.then( ( response ) => {

  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

  console.log( `It's currently ${ temperature }, but it feels like ${ apparentTemperature }.` );
} )
.catch( ( error ) =>
{
  if ( error.code === 'EAI_AGAIN' ){
    console.log( 'Unable to connect to API servers' );
  }
  else{
    console.log( error.message );
  }
} );
