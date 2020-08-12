const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Sports} = require( './models/sport-model' );

const app = express();


/* Your code goes here */

app.post( '/sports/addSport/:sportId', jsonParser, (req,res)=>{
    console.log("Adding a sport");
    let name = req.body.name;
    let players = req.body.num_players;
    let id = req.body.id;

    console.log(name);
    console.log(players);
    console.log(id);
    if( !name || !players || !id ){
        res.statusMessage = "No all information in the body was send";
        return res.status(406).end();
    }

    console.log("another id");
    let idp = req.params.sportId;
    console.log(idp);
    if( idp != id ){
        res.statusMessage = "The ids dont match";
        return res.status(409).end();
    }

    Sports.lookid(id).then(response=>{
        if(response[0]){
            res.statusMessage = "The id exist";
            return res.status(400).end();
        }
        Sports.addSport(id,name,players).then(response2=>{
            return res.status(201).json(response2);
        }).catch(err=>{
            res.statusMessage = "The player wasnt created";
            return res.status(400).end();
        });
    }).catch(err=>{
        res.statusMessage = "Something went wrong";
        return res.status(400).end();
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