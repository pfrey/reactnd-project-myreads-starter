import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
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
        books: state.books.filter(currentBook => currentBook.id !== book.id).concat([book])
      }));
    });
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch);
  }

  submitSearch() {
    if(this.state.query === "" || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    BooksAPI.search(this.state.query.trim())
    .then(results => {
      if(results.error) {
        return this.setState({ results: [] });
      } else {
        results.forEach(currentBook => {
          let found = this.state.books.filter(newBook => newBook.id === currentBook.id);
          if(found[0]) {
            currentBook.shelf = found[0].shelf;
          }
        });
        return this.setState({ results: results });
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value) } />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results.map((book, key) => <Book book={book} key={key} updateBookShelf={this.updateBookShelf} />) }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;