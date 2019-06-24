import React from 'react';
// Context
import { SuggestionsContextProvider } from './contexts/Suggestions.context';
import { EditorContextProvider } from './contexts/Editor.context';
// Components
import ControlPanel from './control-panel';
import Suggestions from './suggestions';
import FetchFileZone from './FetchFileZone';
import './App.css';

const App = () => (
  <div className='App'>
    <header>
      <span>Simple Text Editor</span>
    </header>
    <main>
      <div className='editor-container'>
        <EditorContextProvider>
          <ControlPanel />
          <SuggestionsContextProvider>
            <FetchFileZone />
            <Suggestions />
          </SuggestionsContextProvider>
        </EditorContextProvider>
      </div>
    </main>
  </div>
);

export default App;
