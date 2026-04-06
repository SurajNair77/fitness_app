import {getWorkoutHistory} from '@/service/workouts'
export async function GET(){
const result = await getWorkoutHistory()
return Response.json(result)
}