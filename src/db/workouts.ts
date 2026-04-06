import pool from '@/lib/db'

export async function queryCompletedWorkouts(date: string) {
    const { rows } = await pool.query(
        `SELECT COALESCE(SUM(done_workouts), 0) AS total
         FROM daily_log
         WHERE day >= date_trunc('week', $1::date)`,
        [date]
    )
    return rows[0]?.total ?? 0
}

export async function queryWorkoutHistory() {
    const { rows } = await pool.query(
        `SELECT workout_name, completed
         FROM workout_tracker
         WHERE day = CURRENT_DATE`
    )
    return rows
}

export async function insertWorkoutEntry(name: string, completed: string) {
    await pool.query('INSERT INTO workout_tracker (workout_name, completed) VALUES($1, $2)', [name, completed])
}

export async function queryWorkoutsByMonth(startDate: string, endDate: string) {
    const { rows } = await pool.query(
        `SELECT day::text, COALESCE(SUM(completed), 0) AS total_workouts
         FROM workout_tracker
         WHERE day >= $1::date AND day <= $2::date
         GROUP BY day
         ORDER BY day`,
        [startDate, endDate]
    )
    return rows as { day: string; total_workouts: number }[]
}

export async function queryWorkoutsByDate(date: string) {
    const { rows } = await pool.query(
        'SELECT workout_name, completed FROM workout_tracker WHERE day = $1::date ORDER BY created_at',
        [date]
    )
    return rows as { workout_name: string; completed: number }[]
}
