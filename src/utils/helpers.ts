export type TestFunction = (node: Node | HTMLElement) => boolean
export function closest(node: Node, testFn?: TestFunction) {
  const defaultTestFn: TestFunction = (line) => line instanceof HTMLElement

  let parent = node.parentElement
  while (parent && !(testFn ?? defaultTestFn)(parent)) {
    parent = parent.parentElement
  }

  return parent
}
