// REQUIRES
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const tasksRouter = require( './routes/tasks.route.js' );
//GLOBALS
const app = express( );
const PORT = process.env.PORT || 5000;

// USES
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use( '/tasks', tasksRouter );


//Listen for requests
app.listen( PORT, ( ) => {
    console.log( 'server is listening on port:', PORT );
});