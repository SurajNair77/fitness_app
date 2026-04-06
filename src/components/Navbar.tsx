import styles from '@/feature/navbar/navbar.module.css'
import Link from 'next/link'
export default function Navbar(){
    return(
        <nav className={styles.nav}>
            <Link href="/" className={styles.brand}>FitnessApp</Link>
            <ul className={styles.navbar}>
                <li className={styles.navItem}>
                    <Link href="/Dashboard" className={styles.navLink}>Dashboard</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/Calender" className={styles.navLink}>Calender</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/Workouts" className={styles.navLink}>Workout Tracker</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/Calories" className={styles.navLink}>Calorie Tracker</Link>
                </li>
            </ul>
        </nav>
    )
}