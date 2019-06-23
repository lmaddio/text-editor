import React from 'react';
import { v4 } from 'uuid';

const stylesButtonsArray = [
  {
    id: v4(),
    label: 'B',
    children: React.createElement('b', null, 'B'),
    formatTag: () => {},
    hasTagStyle: () => false,
  },
  {
    id: v4(),
    label: 'I',
    children: React.createElement('i', null, 'I'),
    formatTag: () => {},
    hasTagStyle: () => false,
  },
  {
    id: v4(),
    label: 'U',
    children: React.createElement('u', null, 'U'),
    formatTag: () => {},
    hasTagStyle: () => false,
  }
];

export default stylesButtonsArray;
