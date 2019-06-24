import React from 'react';

const DefaultMessage = () => (<span>Please select a word to find synonyms</span>);

const ErrorMessage = () => (<span>Sorry, there was an error, please try again.</span>);

const WordSuggestions = ({ word, children }) => (
  <span>Suggestions for { word }: { children }</span>
);

const Suggestions = ({ word, fetchData: { fetching, data, error } }) => {
  let message = (<DefaultMessage />);
  if (error) {
    message = (<ErrorMessage />);
  } else if (word) {
    // First time url changes fetching is false
    message = (
      <WordSuggestions word={word}>
        { (fetching || !data) ? 'loading...' : data.join(', ') }
      </WordSuggestions>
    );
  }
  return (
    <div className='suggestions-container'>
      { message }
    </div>
  );
}

export default Suggestions;
