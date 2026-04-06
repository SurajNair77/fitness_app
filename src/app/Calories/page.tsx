import TargetDisplay from '@/components/TargetDisplay'
import UpdateForm from '@/components/UpdateForm'
import History from '@/components/History'
import pageStyles from '@/feature/calorieTracker/calorieTracker.module.css'
import targetStyles from '@/feature/calorieTracker/targetDisplay.module.css'
import formStyles from '@/feature/calorieTracker/updateForm.module.css'
import historyStyles from '@/feature/calorieTracker/history.module.css'


export default function CalorieCounter(){

    return(
        <div className={pageStyles.page}>
            <div className={pageStyles.section}>
                <TargetDisplay category="calories" styles={targetStyles}/>
            </div>
            <div className={pageStyles.section}>
                <UpdateForm category="calories" styles={formStyles}/>
            </div>
            <div className={pageStyles.section}>
                <History category="calories" styles={historyStyles}/>
            </div>
        </div>
    )
}