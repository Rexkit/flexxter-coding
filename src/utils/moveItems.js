/**
 * Move elements from their parents to the end of the body
 *
 * @param {string} tagName
 * @returns {Promise<string>}
 */
export const moveItems = (tagName) => {
  return new Promise((resolve, reject) => {
    if (!tagName) reject("fail");

    const elements = [...document.getElementsByTagName(tagName)];
    if (elements.length === 0) reject("fail");

    for (let i = 0; i < elements.length; i++) {
      const node = elements[i];
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }

    document.body.append(...elements);
    resolve("success");
  });
};
