import TargetDisplay from '@/components/TargetDisplay'
import UpdateForm from '@/components/UpdateForm'
import History from '@/components/History'
import pageStyles from '@/feature/workoutTracker/workoutTracker.module.css'
import targetStyles from '@/feature/workoutTracker/targetDisplay.module.css'
import formStyles from '@/feature/workoutTracker/updateForm.module.css'
import historyStyles from '@/feature/workoutTracker/history.module.css'


export default function WorkoutCounter(){
    return(
        <div className={pageStyles.page}>
            <div className={pageStyles.section}>
                <TargetDisplay category="workout" styles={targetStyles}/>
            </div>
            <div className={pageStyles.section}>
                <UpdateForm category="workout" styles={formStyles}/>
            </div>
            <div className={pageStyles.section}>
                <History category="workout" styles={historyStyles}/>
            </div>
        </div>
    )
}