const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const uuid = require( 'uuid' );
const app = express();
const jsonParser = bodyParser.json();
const validateAPIKEY = require( './middleware/validateAPIKEY' );
const {Bookmarks} = require( "./bookmarksModel.js" );
const mongoose = require( "mongoose" );
const cors = require( './middleware/cors' );

app.use( cors );
app.use( express.static( "public" ) );
app.use( validateAPIKEY ); 
app.use( morgan( 'dev' ));

app.get( '/bookmarks', (req,res)=>{
    console.log( "Getting all bookmarks" );
    Bookmarks.getAllBookmarks().then( result => {return res.status(200).json( result );}).catch( err => {res.statusMessage = "Something went wrong with the Database";return res.status(500).end();});
});

app.get( '/bookmark', (req,res)=>{
    console.log("Getting bookmark by title");
    console.log(req.query);
    let title = req.query.title;
    if ( !title ){
        res.statusMessage = "Please send the 'title' as parameter.";
        return res.status(406).end();
    }
    Bookmarks.getBookmarks(title).then( result => {
        if( !result[0] ){
            res.statusMessage = "The title doesnt exist. ";
            return res.status( 404 ).end();
        }
        return res.status( 200 ).json( result );
    }).catch( err => {res.statusMessage = "Something went wrong with the Database";return res.status(500).end();});
});

app.post( '/bookmarks', jsonParser, (req,res)=>{
    console.log( "Adding a new bookmark to the list");
    console.log(req.body);

    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;

    if ( !title || !description || !url || !rating ){
        res.statusMessage = "One of these parameters is missing: 'title' 'description' 'url' 'rating'";
        return res.status(406).end();
    }

    let id = uuid.v4();
    let newBookmark = { id, title, description, url, rating};
    Bookmarks.createBookmark(newBookmark).then( result => {return res.status(201).json( result );}).catch( err => {res.statusMessage = "Something went wrong with the Database";return res.status(500).end();});
});

app.delete( '/bookmark/:id', (req, res)=>{
    console.log( "Removing a bookmark");
    console.log(req.params);
    let id = req.params.id;

    if ( !id ){
        res.statusMessage = "Please send the 'id' as parameter.";
        return res.status(406).end();
    }

    Bookmarks.deleteBookmark(id).then( result => {return res.status(200).json( result );}).catch( err => {res.statusMessage = "Something went wrong with the Database";return res.status(500).end();});
});

app.patch( '/bookmark/:id', jsonParser, (req, res)=>{
    console.log( "Updating a bookmark");
    console.log(req.body);
    console.log(req.params);

    let idB = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;

    let id = req.params.id;

    if ( !idB ){
        res.statusMessage = "Please send the 'id' as parameter.";
        return res.status(406).end();
    }

    if(idB != id){
        res.statusMessage = "Both 'id's need to match.";
        return res.status(409).end();
    }

    let newBookmark = {title,description,url,rating};
    console.log(newBookmark);

    Bookmarks.getBookmark(id).then( result => {
        if(result.errmsg ){
            res.statusMessage = "The id doesnt exist. ";
            return res.status( 404 ).end();
        }
        console.log(result);
        console.log("despues");
        if( !title )
            title = result[0].title;
        if( !description )
            description = result[0].description;
        if( !url )
            url = result[0].url;
        if( !rating )
            rating = result[0].rating;
        console.log(result);
        Bookmarks.editBookmark(id,title,description,url,rating).then( result2 => {
            if(result2.errmsg ){
                res.statusMessage = "The bookmark wasnt updated. ";
                return res.status( 404 ).end();
            }
            return res.status(202).json( result2 );
        }).catch( err => {res.statusMessage = "Something went wrong with the Database";return res.status(500).end();});
    }).catch( err => {res.statusMessage = "Something went wrong with the Database";return res.status(500).end();});
    
});

app.listen( 8080, ()=>{
    console.log("This is running port 8080");

    new Promise( (resolve, reject)=>{
        mongoose.connect( "mongodb://localhost/bookmarksdb", {useNewUrlParser : true, useUnifiedTopology: true}, (err)=>{
            if(err)
                reject(err);
            else{
                console.log("bookmarksdb connected succesfully")
                return resolve();
            }
        });
    }).catch( err => {
        mongoose.disconnect();
        console.log(err);
    })
});