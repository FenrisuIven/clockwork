export const createNode = (nodeType, options) => {
    const node = document.createElement(nodeType);
    if (options) {
        node.className = options.className || '';
        node.id = options.id || '';
        node.innerText = options.innerText || '';
        
        options.children?.forEach(child => {
            if (child instanceof Node) {
                node.appendChild(child)
            }
        });
    }
    return node;
}
