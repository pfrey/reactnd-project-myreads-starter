import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Shelf from '../Shelf'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(response => {
      this.setState({ books: response });
    });
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(response => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf updateBookShelf={this.updateBookShelf} name="Currently Reading" books={this.state.books.filter(b => b.shelf === "currentlyReading")} />
            <Shelf updateBookShelf={this.updateBookShelf} name="Want to Read" books={this.state.books.filter(b => b.shelf === "wantToRead")} />
            <Shelf updateBookShelf={this.updateBookShelf} name="Read" books={this.state.books.filter(b => b.shelf === "read")} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default HomePage;