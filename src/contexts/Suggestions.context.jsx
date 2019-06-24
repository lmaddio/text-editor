import React, { Component } from 'react';
import PropTypes from 'prop-types';

const SuggestionsContext = React.createContext();

export class SuggestionsContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { word: '' };
    this.setWord = this.setWord.bind(this);
    this.cleanWord = this.cleanWord.bind(this);
  }

  setWord(word) {
    this.setState({ word });
  }

  cleanWord() {
    this.setState({ word: '' });
  }

  render() {
    const { setWord, cleanWord } = this;
    return (
      <SuggestionsContext.Provider
        value={{
          setWord,
          cleanWord,
          word: this.state.word,
        }}
      >
        { this.props.children }
      </SuggestionsContext.Provider>
    );
  }
}

SuggestionsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SuggestionsContext;
