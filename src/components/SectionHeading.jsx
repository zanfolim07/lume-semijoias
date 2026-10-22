import { useReveal } from '../hooks/useReveal'

export default function SectionHeading({ id, eyebrow, title, text, action }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="section-heading reveal-group">
      <div style={{ '--i': 0 }}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id} className="section-heading__title">
          {title}
        </h2>
      </div>
      {text && (
        <p className="section-heading__text" style={{ '--i': 1 }}>
          {text}
        </p>
      )}
      {action && <div style={{ '--i': 1 }}>{action}</div>}
    </div>
  )
}
