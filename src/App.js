import React from 'react';
import SearchedBooks from './components/SearchedBooks';

import classes from './App.module.css';

const App = () => {
  return (
    <div className={classes.App}>
    <h1 className={classes.title}>Welcome to Bestreads!</h1>
    <h2 className={classes.subtitle}>Your best alternative to THE OTHER site</h2>
    <form>
    <input
        type="text"
        placeholder="Search for books..."
        className={classes.input}
      />
    </form>

      <SearchedBooks />
    </div>
  );
};

export default App;
