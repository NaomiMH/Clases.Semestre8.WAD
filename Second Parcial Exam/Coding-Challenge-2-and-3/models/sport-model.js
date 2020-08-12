const mongoose = require( 'mongoose' );

/* Your code goes here */

const sportsCollectionSchema = {
    id: Number,
    name: String,
    num_players: Number
}

const sportsCollection = mongoose.model('sports',sportsCollectionSchema);

const Sports = {
    lookid(id){
        return sportsCollection.find(id).then(response=>{return response;}).catch(err=>{return err;});
    },
    addSport(id,name,players){
        return sportsCollection.create({id,name,players}).then(response=>{return response;}).catch(err=>{return err;});
    }
};

module.exports = {Sports};