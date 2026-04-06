import { queryCompletedWorkouts, queryWorkoutHistory, insertWorkoutEntry, queryWorkoutsByMonth, queryWorkoutsByDate } from '@/db/workouts'

export async function getCompletedWorkouts(date: string) {
    return await queryCompletedWorkouts(date)
}

export async function getWorkoutHistory() {
    return await queryWorkoutHistory()
}

export async function addWorkoutEntry(name: string, completed: string) {
    await insertWorkoutEntry(name, completed)
}

export async function getWorkoutsByMonth(startDate: string, endDate: string) {
    return await queryWorkoutsByMonth(startDate, endDate)
}

export async function getWorkoutsByDate(date: string) {
    return await queryWorkoutsByDate(date)
}
