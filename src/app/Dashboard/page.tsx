import DonutCard from '@/feature/dashboard/donutCard'
import styles from '@/feature/dashboard/dashboard.module.css'
import { getTargets } from '@/service/targets'
import { getCompletedCalories } from '@/service/calories'
import { getCompletedWorkouts } from '@/service/workouts'
export default async function Dashboard(){

    const date = new Date().toISOString().split('T')[0]

    const target = await getTargets()
    const completedCalories = await getCompletedCalories(date)
    const completedWorkouts = await getCompletedWorkouts(date)

    const calorieProps={
        target: target.target_calories,
        completed: completedCalories
    }
    const workoutProps={
        target: target.target_workouts_per_week,
        completed : completedWorkouts
    }

    return(
        <div className={styles.page}>
            <h2 className={styles.heading}>Dashboard</h2>
            <div className={styles.donutGrid}>
                <div className={styles.donutCard}>
                    <DonutCard {...calorieProps}/>
                    <span className={styles.cardLabel}>Calories</span>
                </div>

                <div className={styles.donutCard}>
                    <DonutCard {...workoutProps}/>
                    <span className={styles.cardLabel}>Workouts</span>
                </div>
            </div>
        </div>
    )
}