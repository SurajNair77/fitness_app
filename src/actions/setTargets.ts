"use server"
import { setTargetCalories, setTargetWorkouts } from '@/service/targets'
import { revalidatePath } from 'next/cache'

export async function setTargets(formData: FormData) {
    const calories = formData.get("calories")
    const workout = formData.get("workout")

    if (calories) {
        await setTargetCalories(calories as string)
    }
    if (workout) {
        await setTargetWorkouts(workout as string)
    }

    revalidatePath('/Dashboard')
}

