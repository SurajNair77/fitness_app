import Placeholder from '@/components/sitecore/Placeholder'
import layout from '@/mock/dashboard-layout.json'
import styles from '@/feature/dashboard/dashboard.module.css'
import { getTargets } from '@/service/targets'
import { getCompletedCalories } from '@/service/calories'
import { getCompletedWorkouts } from '@/service/workouts'

export default async function DashboardSitecore() {
    const date = new Date().toISOString().split('T')[0]

    // Fetch all data upfront
    const targets = await getTargets()
    const completedCalories = await getCompletedCalories(date)
    const completedWorkouts = await getCompletedWorkouts(date)

    // Build data map based on cardType
    const dataMap: Record<string, { target: number; completed: number }> = {
        calories: { target: targets.target_calories, completed: completedCalories },
        workouts: { target: targets.target_workouts_per_week, completed: completedWorkouts }
    }

    // Enrich Sitecore components with DB data
    const components = layout.sitecore.route.placeholders['jss-main'].map(item => {
        if (item.componentName === 'DonutCard' && item.fields.cardType) {
            const cardType = item.fields.cardType.value as string
            const data = dataMap[cardType]
            return {
                ...item,
                fields: {
                    ...item.fields,
                    target: { value: data?.target ?? 0 },
                    completed: { value: data?.completed ?? 0 }
                }
            }
        }
        return item
    })

    return (
        <div className={styles.page}>
            <h2 className={styles.heading}>
                {layout.sitecore.route.fields.pageTitle.value}
            </h2>
            <div className={styles.donutGrid}>
                <Placeholder components={components as any} />
            </div>
        </div>
    )
}
