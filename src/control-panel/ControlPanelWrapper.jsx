import React, { PureComponent } from 'react';
import ControlPanelButton from './ControlPanelButton';
import EditorContext from '../contexts/Editor.context';
import buttonsList from './buttonsList';
import './ControlPanel.css';

class ControlPanel extends PureComponent {
  render() {
    const { hasSelection, setContent } = this.props;
    return (
      <div id="control-panel">
        <div id="format-actions">
          {
            buttonsList.map(({ id, ...buttonSettings }) => (
              <ControlPanelButton
                key={id}
                hasSelection={hasSelection}
                setContent={setContent}
                {...buttonSettings}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

const ControlPanelWrapper = ({ ...props }) => (
  <EditorContext.Consumer>
    {
      ({ hasSelection, setContent }) => (
        <ControlPanel
          {...props}
          setContent={setContent}
          hasSelection={hasSelection}
        />
      )
    }
  </EditorContext.Consumer>
);

export default ControlPanelWrapper;
