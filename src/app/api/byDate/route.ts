import {ValidationError} from "@/lib/apiErrors"
import{getCaloriesByDate} from "@/service/calories"
import{getWorkoutsByDate} from "@/service/workouts"

export async function GET(req:Request){
    const{searchParams}= new URL(req.url)
    const date = searchParams.get("date")
    try{
        if(!date){
            throw new ValidationError("date parameter missing")
        }
        const parsd = new Date(date)
        if(isNaN(parsd.getTime())){
            throw new ValidationError("date format Wrong")
        }
    const [caloriesByDate,workoutsByDate] = await Promise.all(
        [getCaloriesByDate(date),
         getWorkoutsByDate(date)]
    )

    return Response.json({"caloriesByDate":caloriesByDate,"workoutsByDate":workoutsByDate})
}catch(error){
    if(error instanceof ValidationError){
        return Response.json({"error":error.message},{status:error.status})
    }
    return Response.json({error:"Server error"},{status:500})
} 
}