import styles from '@/feature/calendar/dayDetail.module.css'
import Link from 'next/link'

export default function NotFound(){
    return (
                <div className={styles.page}>
                    <p className={styles.empty}>Invalid date format.</p>
                    <Link href="/Calender" className={styles.backLink}>&larr; Back to Calendar</Link>
                </div>
            )
}