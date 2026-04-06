"use client"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { getMonthData, type MonthData } from "@/actions/getMonthData"
import styles from "@/feature/calendar/calendar.module.css"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay()
}

function formatDate(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export default function CalendarGrid({ initialData, initialYear, initialMonth }: {
    initialData: MonthData
    initialYear: number
    initialMonth: number
}) {
    const now = new Date()
    const [year, setYear] = useState(initialYear)
    const [month, setMonth] = useState(initialMonth)
    const [data, setData] = useState<MonthData>(initialData)
    const [loading, setLoading] = useState(false)

    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const today = now.getDate()
    const isCurrentMonth = year === now.getFullYear() && month === now.getMonth()

    const monthName = new Date(year, month).toLocaleString("default", {
        month: "long",
        year: "numeric",
    })

    const fetchData = useCallback(async (y: number, m: number) => {
        setLoading(true)
        const result = await getMonthData(y, m)
        setData(result)
        setLoading(false)
    }, [])

    function prev() {
        const newMonth = month === 0 ? 11 : month - 1
        const newYear = month === 0 ? year - 1 : year
        setYear(newYear)
        setMonth(newMonth)
    }

    function next() {
        const newMonth = month === 11 ? 0 : month + 1
        const newYear = month === 11 ? year + 1 : year
        setYear(newYear)
        setMonth(newMonth)
    }

    useEffect(() => {
        if (year === initialYear && month === initialMonth) return
        fetchData(year, month)
    }, [year, month, initialYear, initialMonth, fetchData])

    const blanks = Array.from({ length: firstDay }, (_, i) => (
        <div key={`b-${i}`} className={styles.empty} />
    ))

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        const isToday = isCurrentMonth && day === today
        const dateKey = formatDate(year, month, day)
        const dayData = data[dateKey]

        return (
            <Link key={day} href={`/Calender/${dateKey}`} className={isToday ? styles.today : styles.cell}>
                <span className={styles.dayNumber}>{day}</span>
                {dayData && (
                    <div className={styles.dayInfo}>
                        {dayData.calories > 0 && (
                            <span className={styles.calorieBadge}>
                                {dayData.calories} cal
                            </span>
                        )}
                        {dayData.workouts > 0 && (
                            <span className={styles.workoutBadge}>
                                {dayData.workouts} wkt
                            </span>
                        )}
                    </div>
                )}
            </Link>
        )
    })

    return (
        <>
            <div className={styles.nav}>
                <button onClick={prev} className={styles.navButton}>&larr;</button>
                <span className={styles.monthLabel}>{monthName}</span>
                <button onClick={next} className={styles.navButton}>&rarr;</button>
            </div>
            {loading && <p className={styles.loading}>Loading...</p>}
            <div className={styles.calendar}>
                <div className={styles.grid}>
                    {DAYS.map(d => (
                        <div key={d} className={styles.dayHeader}>{d}</div>
                    ))}
                    {blanks}
                    {days}
                </div>
            </div>
        </>
    )
}
