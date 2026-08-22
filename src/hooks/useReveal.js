import { useEffect, useRef, useState } from 'react'

// IntersectionObserver-based scroll reveal. Returns a ref to attach.
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shown) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [shown])

  return [ref, shown]
}
