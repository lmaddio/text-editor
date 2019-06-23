import React from 'react';
// Context
import { EditorContextProvider } from './contexts/Editor.context';
// Components
import ControlPanel from './control-panel';
import FileZone from "./file-zone/FileZone";
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
          <FileZone />
        </EditorContextProvider>
      </div>
    </main>
  </div>
);

export default App;
