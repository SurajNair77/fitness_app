import Link from 'next/link'
import {notFound} from 'next/navigation'
import { getCaloriesByDate } from '@/service/calories'
import { getWorkoutsByDate } from '@/service/workouts'
import styles from '@/feature/calendar/dayDetail.module.css'

export default async function DayDetailPage({ params }: { params: Promise<{ date: string }> }) {
    const { date } = await params

    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        notFound()
    }

    const [calories, workouts] = await Promise.all([
        getCaloriesByDate(date),
        getWorkoutsByDate(date),
    ])

    const totalCalories = calories.reduce((sum, item) => sum + Number(item.calories), 0)
    const totalWorkouts = workouts.reduce((sum, w) => sum + Number(w.completed), 0)

    const displayDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <Link href="/Calender" className={styles.backLink}>&larr; Back</Link>
                <h2 className={styles.heading}>{displayDate}</h2>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    Food &amp; Calories
                    {totalCalories > 0 && (
                        <span className={styles.calorieBadge}>{totalCalories} cal total</span>
                    )}
                </h3>
                {calories.length === 0 ? (
                    <p className={styles.empty}>No food entries for this day.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Calories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calories.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.food_name}</td>
                                    <td>{item.calories}</td>
                                </tr>
                            ))}
                            <tr className={styles.totalRow}>
                                <td>Total</td>
                                <td>{totalCalories}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    Workouts
                    {totalWorkouts > 0 && (
                        <span className={styles.workoutBadge}>{totalWorkouts} done</span>
                    )}
                </h3>
                {workouts.length === 0 ? (
                    <p className={styles.empty}>No workouts for this day.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Workout Name</th>
                                <th>Times Done</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workouts.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.workout_name}</td>
                                    <td>{item.completed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
