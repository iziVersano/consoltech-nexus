export function domReady(cb: () => void) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb, { once: true });
  } else {
    cb();
  }
}

export function safeAppendChild(container: Element | null, element: Node) {
  if (container && container instanceof Node && element instanceof Node) {
    container.appendChild(element);
  }
}

export function safeQuerySelector<T extends Element = Element>(
  selector: string,
  context: Document | Element = document
): T | null {
  try {
    return context.querySelector<T>(selector);
  } catch {
    return null;
  }
}