import { ValidationError } from "@/lib/apiErrors"
import { addWorkoutEntry } from "@/service/workouts"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, completed } = body

        if (!name) {
            throw new ValidationError("name is required")
        }
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new ValidationError("name must be a non-empty string")
        }
        if (name.length > 100) {
            throw new ValidationError("name must be less than 100 characters")
        }
        if (!completed && completed !== 0) {
            throw new ValidationError("completed is required")
        }
        if (isNaN(Number(completed))) {
            throw new ValidationError("completed must be a number")
        }
        if (Number(completed) < 0 || Number(completed) > 1000) {
            throw new ValidationError("completed must be between 0 and 1000")
        }

        await addWorkoutEntry(name.trim(), completed)
        return Response.json({ success: true, message: "Workout entry added" }, { status: 201 })

    } catch (error) {
        if (error instanceof ValidationError) {
            return Response.json({ error: error.message }, { status: error.status })
        }
        return Response.json({ error: "Server error" }, { status: 500 })
    }
}
