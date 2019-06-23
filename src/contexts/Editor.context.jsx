import React, { Component } from 'react';

const EditorContext = React.createContext();

export class EditorContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      hasSelection: false,
    };
    this.setContent = this.setContent.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.cleanSelection = this.cleanSelection.bind(this);
  }

  setContent(content) {
    this.setState({ content });
  }

  setSelection() {
    this.setState({ hasSelection: true });
  }

  cleanSelection() {
    this.setState({ hasSelection: false });
  }

  render() {
    const {
      setContent,
      setSelection,
      cleanSelection,
    } = this;
    const { hasSelection, content } = this.state;
    return (
      <EditorContext.Provider
        value={{
          setContent,
          setSelection,
          cleanSelection,
          hasSelection,
          content,
        }}
      >
        {this.props.children}
      </EditorContext.Provider>
    );
  }
}

export default EditorContext;
