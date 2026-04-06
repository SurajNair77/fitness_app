"use server"
import { addCalorieEntry } from '@/service/calories'
import { addWorkoutEntry } from '@/service/workouts'
import { revalidatePath } from 'next/cache'

export async function updateValues(category: string, formData: FormData) {
    const name = formData.get("name") as string
    const value = formData.get("value") as string

    if (category === "calories") {
        await addCalorieEntry(name, value)
        revalidatePath("/Calories")
    }
    if (category === "workout") {
        await addWorkoutEntry(name, value)
        revalidatePath("/Workouts")
    }
}