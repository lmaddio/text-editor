import React from 'react';
import EditorContext from '../contexts/Editor.context';
import FileZone from './FileZone';

const WORD_SEPARATOR = ' ';

const FileZoneWrapper = ({ setSelection, cleanSelection, setContent, ...props }) => {

  const onMouseUp = () => {
    const selection = window.getSelection();
    const text = selection.toString() || '';
    if (text.trim(WORD_SEPARATOR) && text.split(WORD_SEPARATOR).length === 1) {
      setSelection();
    } else {
      cleanSelection();
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
  <EditorContext.Consumer>
    {
      ({ setSelection, cleanSelection, setContent, content }) => (
        <FileZoneWrapper
          {...props}
          setSelection={setSelection}
          cleanSelection={cleanSelection}
          setContent={setContent}
          content={content}
        />
      )
    }
  </EditorContext.Consumer>
);

export default FileZoneConsumer;
