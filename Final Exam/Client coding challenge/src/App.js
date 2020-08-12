import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      API_KEY = ""
    }
  }

  lookBook = (event) => {
    event.preventDefault();
    let url = `https://www.googleapis.com/books/v1/volumes?q=${event.target.bookName.value}`;
    let settings = {
      method: 'GET'
    };
    fetch(url,settings).then(response=>{
      console.log(response);
    }).catch(err=>{
      console.log(err);
    });
  }

  render(){
    return(
      <div>
        <label>Hello</label>
        <BookForm function={this.lookBook}/>
      </div>
    )
  }

}

export default App;
