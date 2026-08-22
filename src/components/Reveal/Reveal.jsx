import { useReveal } from '../../hooks/useReveal.js'

// Wraps children and animates them into view on scroll.
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, img = false, ...rest }) {
  const [ref, shown] = useReveal()
  const cls = `${img ? 'reveal-img' : 'reveal'} ${shown ? 'in' : ''} ${className}`
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined
  return (
    <Tag ref={ref} className={cls} style={style} {...rest}>
      {children}
    </Tag>
  )
}
