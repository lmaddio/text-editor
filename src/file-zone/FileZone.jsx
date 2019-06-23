import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileZone extends Component {
  constructor(props) {
    super(props);
    this.innerDiv = React.createRef();
    this.unsupportedFeature = this.unsupportedFeature.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const element = this.innerDiv && this.innerDiv.current;
    const { content = '' } = nextProps;
    return !element || (content !== (element.innerHTML || ''));
  }

  componentDidMount() {
    const element = this.innerDiv && this.innerDiv.current;
    if (element) {
      element.innerHTML = this.props.content;
    }
  }

  componentDidUpdate() {
    const element = this.innerDiv && this.innerDiv.current;

    if (element && this.props.content !== element.innerHTML) {
      element.innerHTML = this.props.content;
    }
  }

  unsupportedFeature(event) {
    event.preventDefault();
    alert('This functionality is not available right now');
  }

  render() {
    const { content, onMouseUp, onKeyUp } = this.props;
    return (
      <div id="file"
        ref={this.innerDiv}
        suppressContentEditableWarning={true}
        contentEditable={true}
        onKeyUp={onKeyUp}
        onMouseUp={onMouseUp}
        onPaste={this.unsupportedFeature}
        onCut={this.unsupportedFeature}
        onCompositionEnd={this.unsupportedFeature}
        onCompositionStart={this.unsupportedFeature}
        onDragEnd={this.unsupportedFeature}
        onDragEnter={this.unsupportedFeature}
        onDragLeave={this.unsupportedFeature}
        onDragOver={this.unsupportedFeature}
        onDragStart={this.unsupportedFeature}
        onDrop={this.unsupportedFeature}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}

FileZone.propTypes = {
  content: PropTypes.string,
  onMouseUp: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
};

FileZone.defaultProps = {
  content: '',
};

export default FileZone;
