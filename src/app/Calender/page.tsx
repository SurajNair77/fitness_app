import styles from "@/feature/calendar/calendar.module.css"
import CalendarGrid from "@/feature/calendar/CalendarGrid"
import { getMonthData } from "@/actions/getMonthData"

export default async function CalendarPage() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const initialData = await getMonthData(year, month)

    return (
        <div className={styles.page}>
            <h2 className={styles.heading}>Calendar</h2>
            <CalendarGrid
                initialData={initialData}
                initialYear={year}
                initialMonth={month}
            />
        </div>
    )
}
