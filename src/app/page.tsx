import Hero from '@/components/Hero'
import styles from './home.module.css'




export default function Home(){

  const props ={
    title: "Fitness",
    subtitle : "App"
  }
  return(
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <Hero {...props}/>
      </div>
    </div>
    
  )
}