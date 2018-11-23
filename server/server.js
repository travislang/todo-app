// REQUIRES
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

//GLOBALS
const app = express( );
const PORT = process.env.PORT || 5000;

// USES
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( {extended: true} ) );




//Listen for requests
app.listen( PORT, ( ) => {
    console.log( 'server is listening on port:', PORT );
});