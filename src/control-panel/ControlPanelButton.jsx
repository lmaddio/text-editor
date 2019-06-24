import React, { Component } from 'react';
import Button from '../button';

class ControlPanelButton extends Component {
  static getDerivedStateFromProps({ hasTagStyle, hasSelection }) {
    if (hasSelection) {
      const { anchorNode } = window.getSelection();
      return { hasStyle: hasTagStyle(anchorNode) };
    }
    return { hasStyle: false };
  }

  constructor(props) {
    super(props);
    this.state = { hasStyle: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    const { formatTag, setContent } = this.props;
    const newContent = formatTag(window.getSelection(), this.state.hasStyle);
    setContent(newContent);
  }

  render() {
    const {
      setContent, hasSelection, formatTag, hasTagStyle, cleanSelection,
      ...restProps,
    } = this.props;
    const className = this.state.hasStyle ? 'applied-button' : '';
    return (
      <Button
        {...restProps}
        className={className}
        disabled={!hasSelection}
        onClick={this.onClick}
      />
    );
  }
}

export default ControlPanelButton;