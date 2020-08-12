function errorHandler(error, req, res) {
    if(error == 500){
        res.statusMessage = "Something went wrong with the Database";
        return res.status(500).end();
    }else if(error == 400){
        res.statusMessage = "The actor is already in this movie list";
        return res.status(400).end();
    }else if(error == 406){
        res.statusMessage = "Id is missing in the body of the request";
        return res.status(406).end();
    }else if(error == 409){
        res.statusMessage = "id and movie_ID do not match";
        return res.status(409).end();
    }else if(error == 403){
        res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list";
        return res.status(403).end();
    }else if(error == 404){
        res.statusMessage = "The actor or movie do not exist";
        return res.status(404).end();
    }
}

module.exports = errorHandler;