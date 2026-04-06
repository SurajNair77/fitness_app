import pool from '@/lib/db'

export async function queryTargets() {
    const { rows } = await pool.query('SELECT * FROM user_targets WHERE id = 1')
    return rows[0]
}

export async function updateTargetCalories(calories: string) {
    await pool.query('UPDATE user_targets SET target_calories = $1 WHERE id = 1', [calories])
}

export async function updateTargetWorkouts(workouts: string) {
    await pool.query('UPDATE user_targets SET target_workouts_per_week = $1 WHERE id = 1', [workouts])
}
