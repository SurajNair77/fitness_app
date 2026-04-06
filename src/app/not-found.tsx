import Link from 'next/link'
import styles from '@/app/home.module.css'
import button from '@/feature/calorieTracker/updateForm.module.css'
export default function NotFound(){
    return(
        <>
        <div className={styles.page}>
        <div className={styles.heroSection}>
           <h1>404</h1>
            <h3>Page not Found</h3>
            <Link href="/" className={button.button} style={{alignSelf: 'center'}}>
                Back To Home
            </Link>  
        </div>
        </div>
        
        </>
    )
}