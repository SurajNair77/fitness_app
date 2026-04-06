import{getCalorieHistory} from '@/service/calories'
export async function GET(){
    const result = await getCalorieHistory()
    return Response.json(result)
}



