import React from 'react';
import { v4 } from 'uuid';
import { findParentNode, nodeHasTagName, applyTag } from '../utils/selection';

const PARENT_ID = 'file';

function topParent(node) {
  return node.isSameNode(document.getElementById(PARENT_ID));
}

function formatMethodByTagName(tagName) {
  const tag = tagName.toLowerCase();
  return (selection, hasStyle) => {
    const topParentNode = document.getElementById(PARENT_ID);
    if (!hasStyle) {
      return applyTag(selection, tag, topParentNode);
    }
    return topParentNode.innerHTML;
  }
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
    formatTag: formatMethodByTagName('b'),
    hasTagStyle: checkFormatByTag('b'),
  },
  {
    id: v4(),
    label: 'I',
    children: React.createElement('i', null, 'I'),
    formatTag: formatMethodByTagName('i'),
    hasTagStyle: checkFormatByTag('i'),
  },
  {
    id: v4(),
    label: 'U',
    children: React.createElement('u', null, 'U'),
    formatTag: formatMethodByTagName('u'),
    hasTagStyle: checkFormatByTag('u'),
  }
];

export default stylesButtonsArray;
