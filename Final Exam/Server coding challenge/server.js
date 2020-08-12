const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Actors} = require( './models/actor-model' );
const {Movies} = require( './models/movie-model' );
const error = require( './middleware/errorHandler' );

const app = express();

app.post( '/api/add-movie-actor/:movie_ID', jsonParser, (req,res)=>{
    console.log("Adding a an extra actor to the list of actors of a movie");
    let movie_ID = req.params.movie_ID;
    let id = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body. lastName;
    
    if(!id){
        error(406,req,res);
    }

    if(movie_ID != id){
        error(409,req,res);
    }

    if(!firstName || !lastName){
        error(403,req,res);
    }

    Actors.getActorByName(firstName,lastName).then(result1 =>{
        if(!result1[0]){
            error(404,req,res);
        }
        Movies.getMovieByID(movie_ID).then(result2 =>{
            if(!result2[0]){
                error(404,req,res);
            }
            let element = {movie_ID: result2[0]._id,actor_ID: result1[0]._id};
            Movies.addActorToMovieList(element).then(result =>{
                Movies.getMovieByID(movie_ID).then(result =>{
                    if(result[0].actors.find(element=>{return element==result1[0]._id;})){
                        error(400,req,res);
                    }
                    return res.status(201).json(result);
                }).catch( err => {
                    error(500,req,res);
                });
            }).catch( err => {
                error(500,req,res);
            });
        }).catch( err => {
            error(500,req,res);
        });
    }).catch( err => {
        error(500,req,res);
    });

});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});