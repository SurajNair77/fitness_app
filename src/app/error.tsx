"use client"
import styles from '@/app/home.module.css'
import button from '@/feature/calorieTracker/updateForm.module.css'

export default function Error({
    error,
    reset
}:{
    error: Error & {digest?:string}
    reset: () => void
}) {
    return(
        <div className={styles.heroSection}>
            <h1>Something Went Wrong</h1>
            <button className={button.button} style={{alignSelf:'center'}}onClick={()=>reset()}>Try Again</button>
        </div>
    )
}