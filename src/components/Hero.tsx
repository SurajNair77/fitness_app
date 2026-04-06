import styles from './hero.module.css'

export default function Hero({title, subtitle}:{title: string , subtitle: string }){
    
    if(!title) return null
    
    return(
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
    )
}