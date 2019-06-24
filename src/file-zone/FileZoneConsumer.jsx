import React from 'react';
import EditorContext from '../contexts/Editor.context';
import SuggestionsContext from '../contexts/Suggestions.context';
import FileZone from './FileZone';

const WORD_SEPARATOR = ' ';

const FileZoneWrapper = ({
  selection, setSelection, cleanSelection, setContent, setWord, cleanWord, children, ...props
}) => {

  const onMouseUp = () => {
    const selection = window.getSelection();
    const text = selection.toString() || '';
    if (text.trim(WORD_SEPARATOR) && text.split(WORD_SEPARATOR).length === 1) {
      setSelection();
      setWord(text);
    } else {
      cleanSelection();
      cleanWord();
    }
  }

  const onKeyUp = (event) => {
    const innerHTML = event.currentTarget.innerHTML;
    if (props.content !== innerHTML) {
      setContent(innerHTML);
    }
  }

  return (
    <FileZone onMouseUp={onMouseUp} onKeyUp={onKeyUp} {...props} />
  );
}

const FileZoneConsumer = (props) => (
  <SuggestionsContext.Consumer>
    {
      ({ setWord, cleanWord }) => (
        <EditorContext.Consumer>
          {
            ({ selection, setSelection, cleanSelection, setContent, content }) => (
              <FileZoneWrapper
                {...props}
                setWord={setWord}
                cleanWord={cleanWord}
                cleanSelection={cleanSelection}
                setContent={setContent}
                content={content}
                selection={selection}
                setSelection={setSelection}
              />
            )
          }
        </EditorContext.Consumer>
      )
    }
  </SuggestionsContext.Consumer>
);

export default FileZoneConsumer;
