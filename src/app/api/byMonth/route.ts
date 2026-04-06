import{ getWorkoutsByMonth} from '@/service/workouts'
import { getCaloriesByMonth} from '@/service/calories'
import {ValidationError} from '@/lib/apiErrors'
export async function GET(req:Request){
    const {searchParams} = new URL(req.url)
    const startDate= searchParams.get("start")
    const endDate = searchParams.get("end")
    try{
    if(!startDate){
        throw new ValidationError("Missing Start Date parameter")
    }
    if(!endDate){
        throw new ValidationError("Missing End Date parameter")
    }
    const workoutsPerMonth= await getWorkoutsByMonth(startDate, endDate)
    const caloriePerMonth= await getCaloriesByMonth(startDate, endDate)

    return Response.json({"caloriesPerMonth":caloriePerMonth,"workoutsPerMonth":workoutsPerMonth})
}catch(error){
    if(error instanceof ValidationError){
        return Response.json({error: error.message},{status:error.status})
    }
    return Response.json({error:"Server error"},{status:500})
}
    
}