import styles from './donutCard.module.css'

export default function DonutCard({target,completed}:{target:number,completed:number}) {
  // data
  const max = target // maximum calories
  const eaten = completed // hardcoded current calories

  // visual sizing
  const size = 120 // svg width/height
  const stroke = 12 // ring thickness
  const r = (size - stroke) / 2 // radius used for the circles

  // geometry
  const C = 2 * Math.PI * r // circumference
  const p = Math.min(eaten / max, 1) // progress fraction clamped to 1
  const offset = C - C * p // stroke-dashoffset to reveal progress

  return (
    <div className={styles.wrapper}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`Calories ${eaten} of ${max}`}
        className={styles.svg}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {/* background ring */}
          <circle r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
          {/* progress ring (starts at top with rotate -90) */}
          <circle
            r={r}
            fill="none"
            stroke="#ef4444"
            strokeWidth={stroke}
            strokeDasharray={`${C} ${C}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90)"
          />
        </g>

        {/* center text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={14}
          className={styles.centerText}>
          {eaten}/{max}
        </text>
      </svg>

    </div>
  )
}
