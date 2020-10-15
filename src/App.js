import React, { useEffect, useState } from 'react';

import SearchedBooks from './components/SearchedBooks';

import classes from './App.module.css';

const App = () => {
  const [input, setInput] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  useEffect(() => {
    input ? setSearchResultsVisible(true) : setSearchResultsVisible(false);
  }, [input]);

  const onChangeHandler = (e) => {
    console.log('dupa');
    const inputValue = e.target.value;
    setInput((prevInput) => (prevInput = inputValue));
  };

  return (
    <div className={classes.App}>
      <h1 className={classes.title}>Welcome to Bestreads!</h1>
      <h2 className={classes.subtitle}>
        Your best alternative to THE OTHER site
      </h2>
      <form>
        <input
          type="text"
          placeholder="Search for books..."
          className={classes.input}
          onChange={onChangeHandler}
          value={input}
        />
      </form>
      {searchResultsVisible ? <SearchedBooks search={input} /> : null}
    </div>
  );
};

export default App;
