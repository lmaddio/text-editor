import React from 'react';
import { v4 } from 'uuid';
import { findParentNode, nodeHasTagName } from '../utils/selection';

const PARENT_ID = 'file';

function topParent(node) {
  return node.isSameNode(document.getElementById(PARENT_ID));
}

function checkFormatByTag(tagName) {
  const tag = tagName.toUpperCase();
  return (node) => {
    // Check parents until it finds an element with tagName or the div that contains the whole text
    const element = findParentNode({ childNode: node, validator: nodeHasTagName(tag), topParent });
    return Boolean(element);
  }
}

const stylesButtonsArray = [
  {
    id: v4(),
    label: 'B',
    children: React.createElement('b', null, 'B'),
    formatTag: () => {},
    hasTagStyle: checkFormatByTag('b'),
  },
  {
    id: v4(),
    label: 'I',
    children: React.createElement('i', null, 'I'),
    formatTag: () => {},
    hasTagStyle: checkFormatByTag('i'),
  },
  {
    id: v4(),
    label: 'U',
    children: React.createElement('u', null, 'U'),
    formatTag: () => {},
    hasTagStyle: checkFormatByTag('u'),
  }
];

export default stylesButtonsArray;
