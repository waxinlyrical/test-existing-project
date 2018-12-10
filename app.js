
const yargs = require( 'yargs' );

const geoCode = require( './geocode/geocode.js' );
const weather = require( './weather/weather.js');

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

console.log( `Getting weather information for address: ${ argv.address }`  )

geoCode.geoCodeAddress( argv.address, ( errorMessage, results ) => {
  if ( errorMessage ){
    console.log( errorMessage );
  }
  else {
    //console.log(  JSON.stringify( results, undefined, 2 ) );
    console.log( `Formatted Address: ${ results.address }` );

    weather.getWeather( results.latitude,results.longitude, ( errorMessage, weatherResults ) =>{
      if ( errorMessage ){
        console.log( errorMessage );
      }
      else{
        console.log(`Temperature is ${ weatherResults.temperature }, but the apparent temperature is ${ weatherResults.apparentTemperature}`)
      }
    }  );


  }
} );
