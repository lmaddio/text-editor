export function findParentNode({ childNode, validator, topParent }) {
  try {
    let node = childNode;
    while (node) {
      if (topParent && topParent(node)) {
        return null;
      } else if (validator(node)) {
        return node;
      }
      node = node.parentNode;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export function nodeHasTagName(tagName) {
  return toValidNode => toValidNode && toValidNode.tagName === tagName;
}


function applyTagToTextNode(node, offset, selectedText, tagName) {
  const textFromNode = node.textContent;
  const newTag = document.createElement(tagName);
  newTag.innerHTML = selectedText;

  const nodesToInsert = [];
  if (textFromNode.length === selectedText.length) { // Only Child
    nodesToInsert.push(newTag);
  } else if (offset === 0) { // First child
    nodesToInsert.push(newTag);
    const newText = textFromNode.substring(selectedText.length);
    nodesToInsert.push(document.createTextNode(newText));
  } else if (offset + selectedText.length === textFromNode.length) { // Middle child with 2 children
    const newText = textFromNode.substring(0, offset);
    nodesToInsert.push(document.createTextNode(newText));
    nodesToInsert.push(newTag);
  } else { // Middle child with 3 children
    // First text node
    let newText = textFromNode.substring(0, offset);
    nodesToInsert.push(document.createTextNode(newText));
    // Second new Tag
    nodesToInsert.push(newTag);
    // Third text node
    newText = textFromNode.substring(offset + selectedText.length);
    nodesToInsert.push(document.createTextNode(newText));
  }
  return nodesToInsert;
}

export function applyTag(selection, tagName, topParentNode) {
  const { anchorNode, anchorOffset, focusOffset } = selection;
  const selectedText = selection.toString();
  // Order by offset to prevent left-2-right or right-2-left
  const startOffset = anchorOffset < focusOffset ? anchorOffset : focusOffset;
  const anchorParentNode = anchorNode.parentNode;
  if (anchorNode.nodeType === Node.TEXT_NODE) {
    const nodesToInsert = applyTagToTextNode(anchorNode, startOffset, selectedText, tagName);
    nodesToInsert.forEach(newNode => anchorParentNode.insertBefore(newNode, anchorNode));
    anchorParentNode.removeChild(anchorNode);
  }
  return topParentNode.innerHTML;
}