import React from 'react';
import PropTypes from 'prop-types';
import './FileZone.css';

const FileZoneStyleWrapper = ({ children }) => (
  <div id='fileZone'>
    { children }
  </div>
);

FileZoneStyleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FileZoneStyleWrapper;
