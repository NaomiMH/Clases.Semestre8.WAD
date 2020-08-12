import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form onSubmit={()=>props.function(this)}>
                <label>Name of the book </label>
                <input type="text" name="bookName" />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default BookForm;