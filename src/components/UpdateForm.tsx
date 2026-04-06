"use client"
import {useState} from "react"
import {updateValues} from "@/actions/updateValues"
import {Category} from '@/types/Category'

type Styles = { [key: string]: string }

const config={
    workout : {label1:"Enter Workout done",label2:"Enter number of workouts"},
    calories: {label1:"Enter Food consumed",label2:"Enter Calories for the food"}
}

export default function UpdateForm({category, styles}:{category:Category, styles: Styles}){

    const[value1,setValue1]=useState("")
    const[value2,setValue2]=useState("")
    const labels = config[category]

    return(
        <div className={styles.container}>
            <form action={updateValues.bind(null,category)} onSubmit={()=>{setValue1(""),setValue2("")}} className={styles.form}>
                <div className={styles.fieldGroup}>
                    <span className={styles.label}>{labels.label1}</span>
                    <input name="name" value={value1} onChange={(e)=>setValue1(e.target.value)} className={styles.input}/>
                </div>
                <div className={styles.fieldGroup}>
                    <span className={styles.label}>{labels.label2}</span>
                    <input name="value" value={value2} onChange={(e)=>setValue2(e.target.value)} className={styles.input}/>
                </div>
                <button className={styles.button}>Submit</button>
            </form>  
        </div>
    )
}