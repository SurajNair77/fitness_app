import pool from '@/lib/db'

export async function queryConsumedCalories(date: string) {
    const { rows } = await pool.query('SELECT * FROM daily_log WHERE day = $1', [date])
    return rows[0]?.consumed_calories ?? 0
}

export async function queryCalorieHistory() {
    const { rows } = await pool.query('SELECT * FROM calorie_tracker WHERE day = CURRENT_DATE')
    return rows
}

export async function insertCalorieEntry(name: string, calories: string) {
    await pool.query('INSERT INTO calorie_tracker (food_name, calories) VALUES($1, $2)', [name, calories])
}

export async function queryCaloriesByMonth(startDate: string, endDate: string) {
    const { rows } = await pool.query(
        `SELECT day::text, COALESCE(SUM(calories), 0) AS total_calories
         FROM calorie_tracker
         WHERE day >= $1::date AND day <= $2::date
         GROUP BY day
         ORDER BY day`,
        [startDate, endDate]
    )
    return rows as { day: string; total_calories: number }[]
}

export async function queryCaloriesByDate(date: string) {
    const { rows } = await pool.query(
        'SELECT food_name, calories FROM calorie_tracker WHERE day = $1::date ORDER BY created_at',
        [date]
    )
    return rows as { food_name: string; calories: number }[]
}
