export function closest(node, testFn) {
    const defaultTestFn = (line) => line instanceof HTMLElement;
    let parent = node.parentElement;
    while (parent && !(testFn !== null && testFn !== void 0 ? testFn : defaultTestFn)(parent)) {
        parent = parent.parentElement;
    }
    return parent;
}
