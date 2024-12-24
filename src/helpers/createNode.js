export const createNode = (nodeType, options) => {
    const node = document.createElement(nodeType);
    if (options) {
        node.className = options.className || '';
        node.id = options.id || '';
        node.innerText = options.innerText || '';
    }
    return node;
}
