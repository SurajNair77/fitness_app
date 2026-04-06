import { queryConsumedCalories, queryCalorieHistory, insertCalorieEntry, queryCaloriesByMonth, queryCaloriesByDate } from '@/db/calories'

export async function getCompletedCalories(date: string) {
    return await queryConsumedCalories(date)
}

export async function getCalorieHistory() {
    return await queryCalorieHistory()
}

export async function addCalorieEntry(name: string, calories: string) {
    await insertCalorieEntry(name, calories)
}

export async function getCaloriesByMonth(startDate: string, endDate: string) {
    return await queryCaloriesByMonth(startDate, endDate)
}

export async function getCaloriesByDate(date: string) {
    return await queryCaloriesByDate(date)
}
