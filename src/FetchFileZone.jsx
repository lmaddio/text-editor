import React, { PureComponent } from 'react';
// Context
import EditorContext from "./contexts/Editor.context";
// Fetch Component
import Fetch from './fetch';
// Components
import FileZone from "./file-zone";
import getMockText from './text.service';

const Loader = () => (<div>Loading...</div>);

const FileZoneContainer = ({ fetchData : { fetching, error } } ) => {
  if (error) {
    return (<div>{ error }</div>);
  } else if (fetching) {
    return (<Loader />);
  }
  return (
    <FileZone.Wrapper>
      <FileZone.Component />
    </FileZone.Wrapper>
  );
}

class EditorContextConsumer extends PureComponent {
  onSuccess = ({ data }) => {
    const { setContent } = this.props;
    setContent(data);
    return data;
  }

  render() {
    return (
      <Fetch service={getMockText} onSuccess={this.onSuccess} >
        <FileZoneContainer />
      </Fetch>
    );
  }
}

const FetchFileZone = (props) => (
  <EditorContext.Consumer>
    {
      ({ setContent }) => <EditorContextConsumer setContent={setContent} {...props} />
    }
  </EditorContext.Consumer>
);

export default FetchFileZone;
