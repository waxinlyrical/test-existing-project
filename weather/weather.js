const request = require( 'request' );

const chinDarkSkyAPIKey = 'fe92fe7fc6d54b03aec3b553ef79ac5e';

var getWeather = ( latitude, longitude, callback  ) =>{
  var darkSkyconstructedURLString = `https://api.darksky.net/forecast/${ chinDarkSkyAPIKey }/${ latitude },${ longitude }`;
  request( {
    url: darkSkyconstructedURLString,
    json: true,
  }, ( error, request, body ) => {
    if ( error ){
      callback( 'Error connecting to DarkSky servers, please try again later.' );
    }
    else if ( request.statusCode === 400 ){
      callback( 'Unable to fetch weather, please check the longitude/latitude are valid!' );
    }
    else if ( request.statusCode === 200 ){
      callback( undefined, {

        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      } );
      //console.log( `Current temperature is: ${body.currently.temperature}` )
    }
    else{
      callback( 'Unknown error!' );
    }
  });
};

module.exports ={
  getWeather,
}
