import React from 'react';
import SuggestionsContext from '../contexts/Suggestions.context';
import Fetch from '../fetch';
import { getSuggestionsUrl, formatResponse } from '../utils/suggestions';
import Suggestions from './Suggestions';

const SuggestionsWrapper = (props) => (
  <Fetch url={getSuggestionsUrl(props.word)} onSuccess={formatResponse}>
    <Suggestions {...props} />
  </Fetch>
);

const SuggestionConsumer = (props) => (
  <SuggestionsContext.Consumer>
    {
      ({ word }) => (
        <SuggestionsWrapper {...props} word={word} />
      )
    }
  </SuggestionsContext.Consumer>
);

export default SuggestionConsumer;
