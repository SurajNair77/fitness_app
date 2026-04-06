"use server"
import { getCaloriesByMonth } from "@/service/calories"
import { getWorkoutsByMonth } from "@/service/workouts"

export type DayData = {
    calories: number
    workouts: number
}

export type MonthData = Record<string, DayData>

export async function getMonthData(year: number, month: number): Promise<MonthData> {
    const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`
    const lastDay = new Date(year, month + 1, 0).getDate()
    const endDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`

    const [calorieRows, workoutRows] = await Promise.all([
        getCaloriesByMonth(startDate, endDate),
        getWorkoutsByMonth(startDate, endDate),
    ])

    const result: MonthData = {}

    for (const row of calorieRows) {
        result[row.day] = { calories: Number(row.total_calories), workouts: 0 }
    }

    for (const row of workoutRows) {
        if (result[row.day]) {
            result[row.day].workouts = Number(row.total_workouts)
        } else {
            result[row.day] = { calories: 0, workouts: Number(row.total_workouts) }
        }
    }

    return result
}
