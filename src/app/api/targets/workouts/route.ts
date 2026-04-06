import { ValidationError } from "@/lib/apiErrors"
import { setTargetWorkouts } from "@/service/targets"

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { workouts } = body

        if (!workouts && workouts !== 0) {
            throw new ValidationError("workouts is required")
        }
        if (isNaN(Number(workouts))) {
            throw new ValidationError("workouts must be a number")
        }
        if (Number(workouts) < 0 || Number(workouts) > 100) {
            throw new ValidationError("workouts must be between 0 and 100")
        }

        await setTargetWorkouts(workouts)
        return Response.json({ success: true, message: "Workout target updated" })

    } catch (error) {
        if (error instanceof ValidationError) {
            return Response.json({ error: error.message }, { status: error.status })
        }
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
