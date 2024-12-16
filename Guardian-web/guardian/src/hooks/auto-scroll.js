import { useEffect, useRef } from 'react'

export function useAutoScroll(dep) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }

    scrollToBottom()
  }, [dep])

  return scrollRef
}

