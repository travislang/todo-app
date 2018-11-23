const express = require( 'express' );
const router = express.Router( );
const bodyParser = require('body-parser');
const pg = require( 'pg' );

// DB CONNECTION
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

const pool = new pg.Pool( config );

pool.on( 'connect', () => {
    console.log( 'connected to DB' );
});

pool.on( 'error', () => {
    console.log( 'error connecting to DB' );
});

// ROUTES //

// GET
router.get( '/', ( req, res ) => {
    let queryString = 'SELECT * FROM "tasks" ORDER BY "completed" ASC;';
    pool.query( queryString )
    .then( (results ) => {
        res.send( results.rows );
    }).catch( err => {
        console.log( 'error in GET:', err );
        res.sendStatus( 500 );
    }); // end query
}); // end GET route

router.post( '/', ( req, res ) => {
    let queryString = 'INSERT INTO "tasks" ("note") VALUES ($1)'
    pool.query( queryString, [req.body.task] )
    .then( results => {
        res.sendStatus( 201 );
    }).catch( err => {
        console.log( 'error in post:', err );
        res.sendStatus( 500 );
    }); // end DB query
}); // end POST route

router.put( '/:id', ( req, res ) => {
    // get id of task to change
    let id = req.params.id;
    // toggle if completed or not
    let queryString = `UPDATE "tasks" SET "completed" = NOT "completed"
    WHERE "id" = $1;`;
    pool.query( queryString, [id])
    .then( result => {
        res.sendStatus( 201 );
    }).catch( err => {
        console.log( 'error on put:', err );
        res.sendStatus( 500 );
    })// end query
}); // end PUT route

router.delete( '/:id', ( req, res ) => {
    //get id of task to delete
    let id = req.params.id;
    let queryString = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query( queryString, [ id ] )
    .then( result => {
        res.sendStatus( 200 );
    }).catch( error => {
        console.log( 'error on delete:', error );
        res.sendStatus( 500 );
    })// end query
}); // end delete route




module.exports = router;