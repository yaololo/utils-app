import { useRef, useEffect } from 'react'

const useRenderOnce = (callback: () => void) => {
  const shouldRender = useRef(false)

  useEffect(() => {
    if (!shouldRender.current) {
      callback()
      shouldRender.current = true
    }
  }, [shouldRender])
}

export default useRenderOnce
