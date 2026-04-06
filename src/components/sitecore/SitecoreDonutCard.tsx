import styles from '@/feature/dashboard/dashboard.module.css'
import donutStyles from '@/feature/dashboard/donutCard.module.css'

interface SitecoreField {
    value: string | number
}

interface DonutCardFields {
    cardLabel: SitecoreField
    cardType: SitecoreField
    cardColor?: SitecoreField
    target: SitecoreField
    completed: SitecoreField
}

export default function SitecoreDonutCard({ fields }: { fields: DonutCardFields }) {
    const target = Number(fields.target.value)
    const completed = Number(fields.completed.value)
    const label = String(fields.cardLabel.value)
    const color = fields.cardColor?.value as string || '#ef4444'

    // visual sizing
    const size = 120
    const stroke = 12
    const r = (size - stroke) / 2

    // geometry
    const C = 2 * Math.PI * r
    const p = Math.min(completed / target, 1)
    const offset = C - C * p

    return (
        <div className={styles.donutCard}>
            <div className={donutStyles.wrapper}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    role="img"
                    aria-label={`${label} ${completed} of ${target}`}
                    className={donutStyles.svg}>
                    <g transform={`translate(${size / 2}, ${size / 2})`}>
                        <circle r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
                        <circle
                            r={r}
                            fill="none"
                            stroke={color}
                            strokeWidth={stroke}
                            strokeDasharray={`${C} ${C}`}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            transform="rotate(-90)"
                        />
                    </g>
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fontSize={14}
                        className={donutStyles.centerText}>
                        {completed}/{target}
                    </text>
                </svg>
            </div>
            <span className={styles.cardLabel}>{label}</span>
        </div>
    )
}
