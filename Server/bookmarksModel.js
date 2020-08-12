const mongoose = require( "mongoose" );

const bookmarksCollectionSchema = mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    }
});

const bookmarksCollection = mongoose.model( "listOfBookmarks", bookmarksCollectionSchema);

const Bookmarks = {
    //createStudent : function (newStudent){}
    createBookmark(newBookmark){
        return bookmarksCollection.create( newBookmark ).then( createdStudent => {return createdStudent;} ).catch( err=>{return err;});
    },
    getAllBookmarks(){
        return bookmarksCollection.find().then( allBookmarks => {return allBookmarks;} ).catch( err=>{return err;});
    },
    getBookmarks(title){
        return bookmarksCollection.find({title : title}).then( findedBookmarks => {return findedBookmarks;} ).catch( err=>{return err;});
    },
    getBookmark(id){
        return bookmarksCollection.find({id : id}).then( findedBookmarks => {return findedBookmarks;} ).catch( err=>{return err;});
    },
    editBookmark(id,title,description,url,rating){
        return bookmarksCollection.updateOne({id : id},{$set: {title:title,description:description,url:url,rating:rating}}).then( newBookmark => {return newBookmark;} ).catch( err=>{return err;});
    },
    deleteBookmark(id){
        return bookmarksCollection.deleteOne({id : id}).then( deletedBookmarks => {return deletedBookmarks;} ).catch( err=>{return err;});
    }
};

module.exports = {Bookmarks};