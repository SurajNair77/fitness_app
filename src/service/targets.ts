import { queryTargets, updateTargetCalories, updateTargetWorkouts } from '@/db/targets'

export async function getTargets() {
    return await queryTargets()
}

export async function setTargetCalories(calories: string) {
    await updateTargetCalories(calories)
}

export async function setTargetWorkouts(workouts: string) {
    await updateTargetWorkouts(workouts)
}
