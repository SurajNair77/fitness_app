import {Category} from '@/types/Category'
import {getTargets} from '@/service/targets'
import {setTargets} from '@/actions/setTargets'

type Styles = { [key: string]: string }

const config ={
    workout:{label1:"Target Workouts per Week",key:"target_workouts_per_week",label2:"To change the target workouts per week enter below"},
    calories:{label1:"Target Calories per Day", key:"target_calories",label2:"To change the target calories per day enter below"}
}



export default async function TargetDisplay({category, styles}:{category:Category, styles: Styles}){
    
    const{label1,key,label2}=config[category]
    const target = await getTargets()
    
    return(
        <div className={styles.container}>
            <h3 className={styles.label}>{label1}</h3>
            <h3 className={styles.value}>{target[key]}</h3>
            <span className={styles.hint}>{label2}</span>
            <form action={setTargets} className={styles.form}>
                <input type="number" name={category} className={styles.input}/>
                <button className={styles.button}>Submit</button>
            </form>  
        </div>
    )
}