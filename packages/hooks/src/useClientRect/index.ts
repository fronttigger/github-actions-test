import { useState, useCallback } from 'react'

/**
 * element의 getBoundingClientRect()값을 다룰 수 있는 훅
 * @returns clientRect, onClientRect
 */
function useClientRect() {
  const [clientRect, setClientRect] = useState<DOMRect | null>(null)

  const onClientRect = useCallback((node: HTMLElement | null): void => {
    if (node != null) {
      setClientRect(node.getBoundingClientRect())
    }
  }, [])

  return {
    clientRect,
    onClientRect,
  }
}

export default useClientRect
