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