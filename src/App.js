import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage'
import SearchPage from './components/pages/SearchPage'

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component = {HomePage} />
        <Route exact path="/search" component = {SearchPage} />
      </div>
    );
  }
}

export default BooksApp
