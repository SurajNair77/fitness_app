import {Category} from '@/types/Category'
import {getCalorieHistory} from '@/service/calories'
import {getWorkoutHistory} from '@/service/workouts'

type Styles = { [key: string]: string }

export default async function History({category, styles}:{category:Category, styles: Styles}){

    let tableData= []
    let header1 = ""
    let header2 = ""
    let header3= ""
    let table = null

    if(category==="calories"){
        tableData= await getCalorieHistory()
        header1="Food Name"
        header2="Calories"
        header3=""
        table = tableData.map((item,index)=>{
        return(
        <tr key={index}>
            <td>
                {item.food_name}
            </td>
            <td>
                {item.calories}
            </td>
        </tr>
    )})
    }

    if(category==="workout"){
        tableData= await getWorkoutHistory()
        header1="Workout Name"
        header2="Times done"
        header3=""
        table = tableData.map((item,index)=>{
        return(
        <tr key={index}>
            <td>
                {item.workout_name}
            </td>
            <td>
                {item.completed}
            </td>
        </tr>
    )})
    }

    

    return(
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            {header1}
                        </th>
                        <th>
                            {header2}
                        </th>
                        {header3&& <th>{header3}</th>}  
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
        </div>
    )
}